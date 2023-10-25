const admin = require('firebase-admin');
const serviceAccount = require('Path To Firebase SDK'); // Change this to your Firebase SDK path
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK with service account configuration and databaseURL
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'URL' // Set this to your Firebase project URL
});

// Reference to your Firebase Realtime Database
const db = admin.database();
const ref = db.ref('/Experimental_Data'); // Adjust to match the correct realtime database path

// This function parses the poseData and separates it into the leftHandLandmarks, rightHandLandmarks, faceLandmarks, and poseLandmarks
function parsePoseData(poseData) {
    try {
        const parsedData = JSON.parse(poseData);
        return {
            leftHandLandmarks: parsedData.leftHandLandmarks || [],
            rightHandLandmarks: parsedData.rightHandLandmarks || [],
            faceLandmarks: parsedData.faceLandmarks || [],
            poseLandmarks: parsedData.poseLandmarks || [],
        };
    } 
    // if there is an error log the error and return empty arrays
    catch (error) {
        console.error('Error parsing poseData:', error);
        return {
            leftHandLandmarks: [],
            rightHandLandmarks: [],
            faceLandmarks: [],
            poseLandmarks: [],
        };
    }
}

// Fucntion to populate the data to its respective header array
function populateLandmarkData(formattedData, prefix, landmarks, count) {
  for (let i = 0; i < landmarks.length; i++) {
      formattedData[`${prefix}_X_${i + 1}`] = landmarks[i].x || 'null';
      formattedData[`${prefix}_Y_${i + 1}`] = landmarks[i].y || 'null';
      formattedData[`${prefix}_Z_${i + 1}`] = landmarks[i].z || 'null';
      
      // Check if the landmarks have a visibility parameter
      if (landmarks[i].visibility) {
          formattedData[`${prefix}_Visibility_${i + 1}`] = landmarks[i].visibility;
      } else {
          formattedData[`${prefix}_Visibility_${i + 1}`] = 'null';
      }
  }

  // Set all data to 'null' if there is no data in firebase 
  if (landmarks.length === 0) {
      for (let i = 0; i < count; i++) {
          formattedData[`${prefix}_X_${i + 1}`] = 'null';
          formattedData[`${prefix}_Y_${i + 1}`] = 'null';
          formattedData[`${prefix}_Z_${i + 1}`] = 'null';
          formattedData[`${prefix}_Visibility_${i + 1}`] = 'null';
      }
  }
}

// Initialize variables to store maximum landmark size
let maxLeftHandLandmarkCount = 0;
let maxRightHandLandmarkCount = 0;
let maxFaceLandmarkCount = 0;
let maxPoseLandmarkCount = 0;

// this will fetch the data from the Firebase Realtime Database
ref.once('value', (snapshot) => {
    const data = snapshot.val(); 

     // If the Firebase Database is empty log the error below
    if (!data) {
        console.error('No data found in the database.');
        process.exit(1);
    }
    else {
        // Iterate through the data to find the maximum landmark counts
        Object.keys(data).forEach((objectId) => {
            const objectData = data[objectId];
            const parsedPoseData = parsePoseData(objectData.poseData);

            // Update the maximum landmark counts to their respective lengths
            maxLeftHandLandmarkCount = Math.max(maxLeftHandLandmarkCount, parsedPoseData.leftHandLandmarks.length);
            maxRightHandLandmarkCount = Math.max(maxRightHandLandmarkCount, parsedPoseData.rightHandLandmarks.length);
            maxFaceLandmarkCount = Math.max(maxFaceLandmarkCount, parsedPoseData.faceLandmarks.length);
            maxPoseLandmarkCount = Math.max(maxPoseLandmarkCount, parsedPoseData.poseLandmarks.length);
        });

        // create headers using healper function
        const leftHandHeaders = generateLandmarkHeaders('lefthandlandmark', maxLeftHandLandmarkCount);
        const rightHandHeaders = generateLandmarkHeaders('righthandlandmark', maxRightHandLandmarkCount);
        const faceLandmarkHeaders = generateLandmarkHeaders('facelandmark', maxFaceLandmarkCount);
        const poseLandmarkHeaders = generateLandmarkHeaders('poselandmark', maxPoseLandmarkCount);

        function generateLandmarkHeaders(prefix, landmarkCount) {
          const headers = [];
      
          for (let i = 1; i <= landmarkCount; i++) {
              headers.push(
                  `${prefix}_X_${i}`,
                  `${prefix}_Y_${i}`,
                  `${prefix}_Z_${i}`
              );
      
              //Include visibility header only for "poselandmark" since the others dont include this paramater
              if (prefix === "poselandmark") {
                  headers.push(`${prefix}_Visibility_${i}`);
              }
          }
      
          return headers;
        }

        // Initialize array for the csv data
        const dataArray = [];

        // Iterate through each object in the data 
        Object.keys(data).forEach((objectId) => {
            const objectData = data[objectId];
            // Parse the pose data
            const parsedPoseData = parsePoseData(objectData.poseData);

            // format non-landmark data
            const formattedData = {
                objectId: objectId,
                conjectureId: objectData.conjectureId !== undefined ? objectData.conjectureId : 'null',
                frameRate: objectData.frameRate || 'null',
                timeStamp: objectData.timestamp || 'null',
                userId: objectData.userId || 'null',
            };

            //Populate the data for leftHandLandmarks, rightHandLandmarks, faceLandmarks, and poseLandmarks
            populateLandmarkData(formattedData, 'lefthandlandmark', parsedPoseData.leftHandLandmarks, maxLeftHandLandmarkCount);
            populateLandmarkData(formattedData, 'righthandlandmark', parsedPoseData.rightHandLandmarks, maxRightHandLandmarkCount);
            populateLandmarkData(formattedData, 'facelandmark', parsedPoseData.faceLandmarks, maxFaceLandmarkCount);
            populateLandmarkData(formattedData, 'poselandmark', parsedPoseData.poseLandmarks, maxPoseLandmarkCount);

            // Push formatted data into the dataArray created before 
            dataArray.push(formattedData);
        });

        // Define the CSV headers
        const csvHeaders = [
            { id: 'objectId', title: 'objectId' },
            { id: 'conjectureId', title: 'conjectureId' },
            { id: 'frameRate', title: 'frameRate' },
            { id: 'timeStamp', title: 'timeStamp' },
            { id: 'userId', title: 'userId' },
            ...leftHandHeaders.map(header => ({ id: header, title: header })),
            ...rightHandHeaders.map(header => ({ id: header, title: header })),
            ...faceLandmarkHeaders.map(header => ({ id: header, title: header })),
            ...poseLandmarkHeaders.map(header => ({ id: header, title: header })),
        ];

        // Format the filenames to include date and time of export
        const csvFileName = `exported-csv-data-${new Date().toISOString().replace(/:/g, '-')}.csv`;
        const jsonFileName = `exported-json-data-${new Date().toISOString().replace(/:/g, '-')}.json`;

        // Find the path to the 'Downloads' folder in the user's home directory
        const downloadsFolder = path.join(require('os').homedir(), 'Downloads');

        // Construct the full path to the JSON and CSV files in the 'Downloads' folder
        const jsonFilePath = path.join(downloadsFolder, jsonFileName);
        const csvFilePath = path.join(downloadsFolder, csvFileName);

        // Write the JSON file to the JSON file created in the correct path
        fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));

        // Create CSV writer to export data to CSV file
        const csvWriter = createCsvWriter({
            path: csvFilePath,
            header: csvHeaders,
        });

        // Write the dataArray to the csv file
        csvWriter.writeRecords(dataArray)
            .then(() => {
              // log that the data has been exported correctly and exit process
                console.log('Data exported to CSV and JSON');
                process.exit(0);
            })
            .catch((error) => {
              // If there is an error log the error and exit the process
                console.error('Error writing CSV and JSON:', error);
                process.exit(1);
            });
    }
});