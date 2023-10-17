const admin = require('firebase-admin');
const serviceAccount = require('path to Firebase Admin SDK'); // you will need to change this to the path of your downloaded firebase SDK
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK with service account configuration and databaseURL
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'URL' // this databaseURL will need to be set to the current project URL
});

// Reference to your Firebase Realtime Database
const db = admin.database();
const ref = db.ref('/Experimental_Data'); // Adjust to match the correct realtime database path
  
// This function parses the poseData and seperates it into the leftHandLandmarks, rightHandLandmarks, faceLandmarks, and poseLandmarks
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

// this will fetch the data from the Firebase Realtime Database
ref.once('value', (snapshot) => {
  const data = snapshot.val();
  
  // If the Firebase Database is empty log the error below
  if (!data) {
    console.error('No data found in the database.');
    process.exit(1);
  } else {
    // If the data is successfully retrieved log that it has been retrieved
    console.log('Data retrieved from the database:', data);

    // Initialize array for the csv data
    const dataArray = [];

    // Iterate through each object in the data 
    Object.keys(data).forEach((objectId) => {
      const objectData = data[objectId];

      // Parse and format the pose data
      const parsedPoseData = parsePoseData(objectData.poseData);

      const formattedData = {
        objectId: objectId,
        conjectureId: objectData.conjectureId !== undefined ? objectData.conjectureId : '',
        frameRate: objectData.frameRate || '',
        leftHandLandmarks: parsedPoseData.leftHandLandmarks.map(landmark => `[X:${landmark.x};Y:${landmark.y};Z:${landmark.z}]`).join(', '),
        rightHandLandmarks: parsedPoseData.rightHandLandmarks.map(landmark => `[X:${landmark.x};Y:${landmark.y};Z:${landmark.z}]`).join(', '),
        faceLandmarks: parsedPoseData.faceLandmarks.map(landmark => `[X:${landmark.x};Y:${landmark.y};Z:${landmark.z}]`).join(', '),
        poseLandmarks: parsedPoseData.poseLandmarks.map(landmark => `[X:${landmark.x};Y:${landmark.y};Z:${landmark.z};visibility:${landmark.visibility}]`).join(', '),
        timeStamp: objectData.timestamp || '',
        userId: objectData.userId || '',
        conjectureId: objectData.conjectureId !== undefined ? objectData.conjectureId : 'null',
        frameRate: objectData.frameRate || 'null',
        leftHandLandmarks: parsedPoseData.leftHandLandmarks.length > 0 ? parsedPoseData.leftHandLandmarks.map(landmark => `[X:${landmark.x};Y:${landmark.y};Z:${landmark.z}]`).join(', ') : 'null',
        rightHandLandmarks: parsedPoseData.rightHandLandmarks.length > 0 ? parsedPoseData.rightHandLandmarks.map(landmark => `[X:${landmark.x};Y:${landmark.y};Z:${landmark.z}]`).join(', ') : 'null',
        faceLandmarks: parsedPoseData.faceLandmarks.length > 0 ? parsedPoseData.faceLandmarks.map(landmark => `[X:${landmark.x};Y:${landmark.y};Z:${landmark.z}]`).join(', ') : 'null',
        poseLandmarks: parsedPoseData.poseLandmarks.length > 0 ? parsedPoseData.poseLandmarks.map(landmark => `[X:${landmark.x};Y:${landmark.y};Z:${landmark.z};visibility:${landmark.visibility}]`).join(', ') : 'null',
        timeStamp: objectData.timestamp || 'null',
        userId: objectData.userId || 'null',
      };

      // Push formatted data into the dataArray created before 
      dataArray.push(formattedData);
    });

    // log the dataArray
    console.log('Data Array:', dataArray);

    // format the filenames to include date and time of export
    const csvFileName = `exported-csv-data-${new Date().toISOString().replace(/:/g, '-')}.csv`;
    const jsonFileName = `exported-json-data-${new Date().toISOString().replace(/:/g, '-')}.json`;
    
    // Find the path to the 'Downloads' folder in the user's home directory
    const downloadsFolder = path.join(require('os').homedir(), 'Downloads');

    // Construct the full path to the JSON and CSV files in the 'Downloads' folder.
    const jsonFilePath = path.join(downloadsFolder, jsonFileName);
    const csvFilePath = path.join(downloadsFolder, csvFileName);

    //Write the JSON file to the JSON file created in the correct path
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));

    // Create CSV writer to export data to CSV file
    const csvWriter = createCsvWriter({
      path: csvFilePath, // this is where you specify the name of the csv file
      header: [
        { id: 'objectId', title: 'objectId' },
        { id: 'conjectureId', title: 'conjectureId' },
        { id: 'frameRate', title: 'frameRate' },
        { id: 'leftHandLandmarks', title: 'leftHandLandmarks' },
        { id: 'rightHandLandmarks', title: 'rightHandLandmarks' },
        { id: 'faceLandmarks', title: 'faceLandmarks' },
        { id: 'poseLandmarks', title: 'poseLandmarks' },
        { id: 'timeStamp', title: 'timeStamp' },
        { id: 'userId', title: 'userId' },
      ],
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
