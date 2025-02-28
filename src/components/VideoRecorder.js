import { useEffect, useRef, useState } from 'react';
import { useMachine } from "@xstate/react";
import LevelPlayMachine from "./LevelPlayModule/LevelPlayMachine";
import { getUserNameFromDatabase } from '../firebase/userDatabase';
import { getCurricularDataByUUID } from '../firebase/database';
import { storage } from '../firebase/init';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const VideoRecorder = ({ phase, curricularID, gameID }) => {
  const [currentPhase, setCurrentPhase] = useState(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const streamRef = useRef(null);
  const [state, send] = useMachine(LevelPlayMachine);

  // Get the camera stream from the existing video element (defined in index.html)
  useEffect(() => {
    const inputVideo = document.getElementsByClassName("input-video")[0];
    if (!inputVideo) {
      console.error("Input video element not found");
      return;
    }
    // Poll until the input video has a stream (assigned by MediaPipe)
    const checkStream = setInterval(() => {
      if (inputVideo.srcObject) {
        clearInterval(checkStream);
        // Clone the stream so our recording is independent of MediaPipe processing
        streamRef.current = inputVideo.srcObject.clone();
        // If a phase is already set, start recording immediately
        if (phase) {
          startRecording();
          setCurrentPhase(phase);
        }
      }
    }, 500);

    return () => {
      clearInterval(checkStream);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // When the phase prop changes, stop the current recording (if any) and start a new one
  useEffect(() => {
    if (phase !== currentPhase) {
      // Stop current recording if one is active
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      // Start new recording if the new phase is defined
      if (phase) {
        // Allow a small delay for the previous recorder to finish
        setTimeout(() => {
          startRecording();
          setCurrentPhase(phase);
        }, 500);
      } else {
        setCurrentPhase(null);
      }
    }
  }, [phase, currentPhase]);

  // Get game name from gameID
  const getGameName = async () => {
    try {
      const gameData = await getCurricularDataByUUID(gameID);
      if (gameData) {
        // Extract the first key in the returned object
        const gameKey = Object.keys(gameData)[0];
        return gameData[gameKey].CurricularName; 
      }
      return 'UnknownGame';
    } catch (error) {
      console.error('Error getting game name:', error);
      return 'UnknownGame';
    }
  };

  // Get level name from curricularID
  const getLevelName = async () => {
    try {
      const levelData = await getCurricularDataByUUID(curricularID);
      if (levelData) {
        // Extract the first key in the returned object
        const levelKey = Object.keys(levelData)[0];
        return levelData[levelKey].CurricularName;
      }
      return 'UnknownLevel';
    } catch (error) {
      console.error('Error getting level name:', error);
      return 'UnknownLevel';
    }
  };

  // Format the event type (Insight, Intuition, etc.)
  const formatEventType = (eventType) => {
    return eventType.charAt(0).toUpperCase() + eventType.slice(1);
  };

  // Upload the video to Firebase Storage
  const uploadVideo = async (blob, filename) => {
    try {
      const videoRef = ref(storage, `videos/${filename}`);
      await uploadBytes(videoRef, blob);
      const downloadURL = await getDownloadURL(videoRef);
      console.log('Video uploaded successfully:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading video:', error);
      return null;
    }
  };

  const startRecording = () => {
    recordedChunksRef.current = [];
    if (!streamRef.current) return;
    
    try {
      const options = { mimeType: 'video/webm; codecs=vp9' };
      mediaRecorderRef.current = new MediaRecorder(streamRef.current, options);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      // Stop the recording, get metadata, and upload the video
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        
        try {
          // Get all the necessary data for the filename
          const currentDate = new Date();
          
          // Format for date is incorrect
          const formattedDate = `${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}${currentDate
            .getDate()
            .toString()
            .padStart(2, "0")}${currentDate.getFullYear().toString().slice(-2)}`;
            
          const username = await getUserNameFromDatabase();

          //Rename variable
          const participantID = username ? username.padStart(3, '0') : '000'; // Ensure 3 digits
          
          // Not working
          const gameNameResult = await getGameName();
          const gameNameFormatted = gameNameResult.replace(/\s+/g, ''); // Remove spaces

          // Also does not work
          const levelNameResult = await getLevelName();
          const levelNumber = levelNameResult ? '01' : '00'; // Could extract a number if available
          
          // Works
          const eventType = formatEventType(currentPhase || 'unknown');
          
          // Create the filename in the format: Date_ParticpantID_GameID_Level_Event.mp4
          // Change this to an mp4 if applicable, do some research on this
          const filename = `${formattedDate}_${participantID}_${gameNameFormatted}_${levelNumber}_${eventType}.webm`;
          
          console.log('Generated filename:', filename);
          
          // Upload the video with the generated filename
          await uploadVideo(blob, filename);
          
        } catch (error) {
          console.error('Error generating filename or uploading video:', error);
          // Fallback filename if something goes wrong
          const fallbackFilename = `video_${new Date().getTime()}.webm`;
          await uploadVideo(blob, fallbackFilename);
        }
      };
      
      mediaRecorderRef.current.start();
    } catch (e) {
      console.error("Error creating MediaRecorder", e);
    }
  };

  // This component does not render any UI
  return null;
};

export default VideoRecorder;