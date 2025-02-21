import { useEffect, useRef, useState } from 'react';

const VideoRecorder = ({ phase }) => {
  const [currentPhase, setCurrentPhase] = useState(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const streamRef = useRef(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

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
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        // Automatically trigger a download when the phase ends
        downloadVideo(url, currentPhase);
      };
      mediaRecorderRef.current.start();
    } catch (e) {
      console.error("Error creating MediaRecorder", e);
    }
  };

  const downloadVideo = (url, phaseName) => {
    const a = document.createElement('a');
    // Name the file with the phase name and a timestamp
    const fileName = `${phaseName}_${new Date().toISOString()}.webm`;
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // This component does not render any UI
  return null;
};

export default VideoRecorder;