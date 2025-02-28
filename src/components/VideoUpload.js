import { initializeApp } from "firebase/app";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, update } from "firebase/database";

// Firebase config
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
  };

// Initialize Firebase (ensure this only happens once in your app)
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

/**
 * Generates a video file name using the format:
 * Date_ParticipantID_GameID_Level_Event.mp4
 * @param {string} date - e.g., "012925"
 * @param {string} participantId - e.g., "001"
 * @param {string} gameId - e.g., "TryAngles"
 * @param {string} level - e.g., "01"
 * @param {string} eventName - e.g., "Insight"
 * @returns {string} The generated video file name.
 */
export function generateVideoFileName(date, participantId, gameId, level, eventName) {
  return `${date}_${participantId}_${gameId}_${level}_${eventName}.mp4`;
}

/**
 * Uploads a video blob to Firebase Storage and updates the database.
 * @param {Blob} videoBlob - The video file blob to upload.
 * @param {object} metadata - An object containing metadata:
 *   { date, participantId, gameId, level, eventName, levelId }
 */
export async function uploadVideo(videoBlob, metadata) {
  const { date, participantId, gameId, level, eventName, levelId } = metadata;
  const videoName = generateVideoFileName(date, participantId, gameId, level, eventName);
  const videoStorageRef = storageRef(storage, `videos/${videoName}`);

  try {
    // Upload the video blob to Firebase Storage
    const snapshot = await uploadBytes(videoStorageRef, videoBlob, { contentType: "video/mp4" });
    console.log("Upload successful:", snapshot);

    // Optionally, get the download URL if you need to share or display the video later
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("Video available at:", downloadURL);

    // Update your database (e.g., under a specific level record) with the video file name
    await update(dbRef(database, `levels/${levelId}`), { video: videoName });
    console.log("Database updated with video file name:", videoName);
  } catch (error) {
    console.error("Error uploading video or updating database:", error);
  }
}
