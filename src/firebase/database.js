// Firebase Init
import { ref, push, getDatabase, set, query, equalTo, get, orderByChild, orderByKey } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Curriculum } from "../components/CurricularModule/CurricularModule";


// Import the uuid library
const { v4: uuidv4 } = require('uuid');

const db = getDatabase();

// User Id functionality will be added in a different PR
let userId;

// Session Id for each new user session
let sessionId;

// Conjecture ID
let curricularId;

// Get the Firebase authentication instance
const auth = getAuth();

// Listen for changes to the authentication state
// and update the userId variable accordingly
onAuthStateChanged(auth, (user) => {
  userId = user.uid;
  sessionId = Math.floor(Math.random() * 9999999999999);
});

// Define data keys for the text inputs of conjectures
export const keysToPush = [
  "Conjecture Name",
  "Author Name",
  "PIN",
  "Conjecture Keywords",
  "Conjecture Description",
  "Multiple Choice 1",
  "Multiple Choice 2",
  "Multiple Choice 3",
  "Multiple Choice 4",
  "Correct Answer",
];

// text boxes for the curricular editor
export const curricularTextBoxes = [ 
  "CurricularName", // if these are renamed, keep the order the same
  "CurricularAuthor", 
  "CurricularKeywords",
  "CurricularPIN",
]

// Export a function named writeToDatabase
export const writeToDatabase = async (poseData, conjectureId, frameRate) => {
  // Create a new date object to get a timestamp
  const dateObj = new Date();
  const timestamp = dateObj.toISOString();

  // Create a reference to the Firebase Realtime Database
  const dbRef = ref(db, "/Experimental_Data");

  // Create an object to send to the database
  // This object includes the userId, poseData, conjectureId, frameRate, and timestamp and
  const dataToSend = {
    userId,
    poseData: JSON.stringify(poseData),
    conjectureId,
    frameRate,
    timestamp,
  };

  // Push the data to the database using the dbRef reference
  const promise = push(dbRef, dataToSend);

  // Return the promise that push() returns
  return promise;
};

export const writeToDatabasePoseAuth = async (poseData, state, tolerance) => {
  // Create a new date object to get a timestamp
  const dateObj = new Date();
  const timestamp = dateObj.toISOString();

  // Create a reference to the Firebase Realtime Database
  const dbRef = ref(db, "/PoseAuthoring");

  // Create an object to send to the database
  // This object includes the userId, poseData, conjectureId, frameRate, and timestamp
  const dataToSend = {
    userId,
    poseData,
    timestamp,
    state,
    tolerance,
  };

  // Push the data to the database using the dbRef reference
  const promise = push(dbRef, dataToSend);

  // Return the promise that push() returns
  return promise;
};

export const writeToDatabaseConjecture = async (existingUUID) => {
  // Create a new date object to get a timestamp
  const dateObj = new Date();
  const timestamp = dateObj.toISOString();
  let conjectureID;

  // define the UUID based on whether it exists already or not
  if(existingUUID == null){
    conjectureID = uuidv4();
  }
  else{
    conjectureID = existingUUID;
  }
  

  // Initialize empty object to store the data inside
  const dataToPush = {};

  // Fetch values from local storage for each key inside keysToPush 
  const isAnyKeyNullOrUndefined = keysToPush.some((key) => {
    const value = localStorage.getItem(key);
    return value === null || value === undefined || value.trim() === '';
  });

  // if any text values are not there alert message and exit
  if (isAnyKeyNullOrUndefined) {
    return alert("One or more text values are empty. Cannot publish conjecture to database."), false;
  }

  // Check if any of the pose data is null before proceeding
  const startJson = localStorage.getItem('start.json');
  const intermediateJson = localStorage.getItem('intermediate.json');
  const endJson = localStorage.getItem('end.json');

  if (
    startJson !== null && startJson !== undefined &&
    intermediateJson !== null && intermediateJson !== undefined &&
    endJson !== null && endJson !== undefined
  ) {
    // create pose objects
    const startPoseData = await createPoseObjects(startJson, 'StartPose', localStorage.getItem('Start Tolerance'));
    const intermediatePoseData = await createPoseObjects(intermediateJson, 'IntermediatePose', localStorage.getItem('Intermediate Tolerance'));
    const endPoseData = await createPoseObjects(endJson, 'EndPose', localStorage.getItem('End Tolerance'));

    // Define the database path
    const conjecturePath = `Level/${conjectureID}`;

    // Fetch values from local storage for each key inside keysToPush 
    await Promise.all(keysToPush.map(async (key) => {
      const value = localStorage.getItem(key);

      // Check if the value is not null, undefined, or an empty string
      if (value !== null && value !== undefined && value.trim() !== '') {
        // uses helper function to create text objects
        Object.assign(dataToPush, await createTextObjects(key, value));
      }
    }));


    // searrcxh words
    const searchWordsToPush = {
      "Author Name": dataToPush["Author Name"],
      "Conjecture Description": dataToPush["Conjecture Description"],
      "Conjecture Keywords": dataToPush["Conjecture Keywords"],
      "Conjecture Name": dataToPush["Conjecture Name"]
    };
    console.log(searchWordsToPush)

    // Extracting values from searchWordsToPush object
    const searchWordsValues = Object.values(searchWordsToPush);
    // Concatenating search words into a single lowercase string
    const concatenatedSearchWords = searchWordsValues.join(" ").toLowerCase();

    // Splitting the concatenated string into individual words
    const wordsArray = concatenatedSearchWords.split(" ");

    // Initializing an empty object to store search words
    const searchWordsToPushToDatabase = {};

    // Loop through the words array and set each word as a key in the searchWordsToPushToDatabase object with the word itself as its value
    wordsArray.forEach(word => {
      if (word !== undefined) {
        searchWordsToPushToDatabase[word] = word;
      }
    });

    console.log(searchWordsToPushToDatabase)

    // creates promises to push all of the data to the database 
    // uses set to overwrite the random firebaseKeys with easier to read key names
    const promises = [
      set(ref(db, `${conjecturePath}/Time`), timestamp),
      set(ref(db, `${conjecturePath}/AuthorID`), userId),
      set(ref(db, `${conjecturePath}/UUID`),conjectureID),
      set(ref(db, `${conjecturePath}/PIN`), localStorage.getItem("PIN")),
      set(ref(db, `${conjecturePath}/Start Pose`), startPoseData),
      set(ref(db, `${conjecturePath}/Intermediate Pose`), intermediatePoseData),
      set(ref(db, `${conjecturePath}/End Pose`), endPoseData),
      set(ref(db, `${conjecturePath}/Text Boxes`), dataToPush),
      set(ref(db, `${conjecturePath}/isFinal`), true),
      set(ref(db,`${conjecturePath}/Search Words`), searchWordsToPushToDatabase)
    ];

    return promises && alert("Conjecture successfully published to database.");
  } else {
    return alert("One or more poses are missing. Cannot publish conjecture to database."), false;
  }
};

// save a draft of the current conjecture so it can be published later
export const writeToDatabaseConjectureDraft = async (existingUUID) => {
  // Create a new date object to get a timestamp
  const dateObj = new Date();
  const timestamp = dateObj.toISOString();
  let conjectureID;

  // define the UUID based on whether it exists already or not
  if(existingUUID == null){
    conjectureID = uuidv4();
  }
  else{
    conjectureID = existingUUID;
  }

  // Initialize empty object to store the data inside
  const dataToPush = {};
  let noName = false;

  // Fetch values from local storage for each key inside KeysToPush 
  await Promise.all(keysToPush.map(async (key) => {
    const value = localStorage.getItem(key);
    Object.assign(dataToPush, await createTextObjects(key, value));

    // If the value is undefined assign the value as undefined in firebase
    if(value == undefined){
      Object.assign(dataToPush, await createTextObjects(key, "undefined"));
      if(key == "Conjecture Name"){
        noName = true;
      }
    }
  }));

  // create pose objects
  const startPoseData = await createPoseObjects(localStorage.getItem('start.json'), 'StartPose', localStorage.getItem('Start Tolerance'));
  const intermediatePoseData = await createPoseObjects(localStorage.getItem('intermediate.json'), 'IntermediatePose', localStorage.getItem('Intermediate Tolerance'));
  const endPoseData = await createPoseObjects(localStorage.getItem('end.json'), 'EndPose', localStorage.getItem('End Tolerance'));

  // if the level isn't named, alert message and exit
  if (noName) {
    return alert("Please name your level before saving a draft."), false;
  }

  // Define the database path
  const conjecturePath = `Level/${conjectureID}`;

  // creates promises to push all of the data to the database 
  // uses set to overwrite the random firebaseKeys with easier to read key names
  const promises = [
    set(ref(db, `${conjecturePath}/Time`), timestamp),
    set(ref(db, `${conjecturePath}/Start Pose`), startPoseData),
    set(ref(db, `${conjecturePath}/Intermediate Pose`), intermediatePoseData),
    set(ref(db, `${conjecturePath}/End Pose`), endPoseData),
    set(ref(db, `${conjecturePath}/Text Boxes`), dataToPush),
    set(ref(db, `${conjecturePath}/UUID`),conjectureID),
    set(ref(db, `${conjecturePath}/isFinal`), false),
  ];

  return promises && alert("Draft saved");
};

// Helper function to create pose objects for the writeToDatabaseConjecture function 
const createPoseObjects = async (poseData, state, tolerance) => {
  const dateObj = new Date();
  const timestamp = dateObj.toISOString();

  const dataToSend = {
    userId,
    poseData,
    timestamp,
    state,
    tolerance,
  };

  // Returns pose data
  return dataToSend;
}

// Helper function to create text objects for the writeToDatabaseConjecture function 
const createTextObjects = async (key, value) => {
  const dataToSend = {
    [key]: value,
  };

  // Returns text data 
  return dataToSend;
}

// Set the initial time of the last alert to the current time
let lastAlertTime = Date.now();

// Define a function to check the status of a set of promises
export const promiseChecker = async (frameRate, promises) => {
  // Set the data loss threshold and check interval in seconds
  const dataLossThresholdInSeconds = 2;
  const checkIntervalInSeconds = 10;

  // Calculate the number of frame packages and the data loss threshold in frames
  const totalFramePackages = checkIntervalInSeconds * frameRate;
  const dataLossThreshold = dataLossThresholdInSeconds * frameRate;

  // Calculate the starting index for the promises to check
  const startIndex = Math.max(promises.length - totalFramePackages - 1, 0);

  // Get the promises to check
  const promisesToCheck = promises.slice(startIndex);

  // Count the number of rejected promises
  const totalRejections = await countRejectedPromises(promisesToCheck);

  // If the number of rejected promises is greater than the data loss threshold, alert the user
  if (totalRejections > dataLossThreshold) {
    // Get the current time
    const currentTime = Date.now();

    // Check if enough time has passed since the last alert
    if (currentTime - lastAlertTime > checkIntervalInSeconds * 1000) {
      // Alert the user
      alert(
        "The program is not sending enough data to the database. Please check the internet connection/connection speed to make sure that it can support data collection for this experiment."
      );

      // Update the last alert time
      lastAlertTime = currentTime;
    }
  } else {
    // If there is no data loss, log a message to the console
    console.log("No data loss detected");
  }
};

// Define a function to count the number of rejected promises
const countRejectedPromises = async (promises) => {
  let rejectedCount = 0;

  // Use Promise.allSettled to check the status of each promise
  await Promise.allSettled(
    promises.map((promise) => {
      return promise
        .then(() => {
          // If the promise is resolved, do nothing
        })
        .catch(() => {
          // If the promise is rejected, increment the rejected count
          rejectedCount++;
        });
    })
  );

  // Return the total number of rejected promises
  return rejectedCount;
};


// save a draft of a collection of conjectures to be published later
export const writeToDatabaseCurricularDraft = async (UUID) => {
  // Create a new date object to get a timestamp
  const dateObj = new Date();
  const timestamp = dateObj.toISOString();

  let CurricularID; // set the UUID based on whether creating new game or editing existing game
  if(UUID == null){
    CurricularID = uuidv4();
  }
  else{
    CurricularID = UUID;
  }

  //get the UUID of each conjecture
  const conjectureList = Curriculum.getCurrentConjectures();
  let conjectures = [];
  for (let i = 0; i < conjectureList.length; i++){
    conjectures.push(conjectureList[i]["UUID"]);
  }

  const dataToPush = {}
  // Fetch values from local storage for each key inside  curricularTextBoxes
  await Promise.all(curricularTextBoxes.map(async (key) => {
    const value = localStorage.getItem(key);
    Object.assign(dataToPush, await createTextObjects(key, value));

    // If the value is undefined assign the value as undefined in firebase
    if(value == undefined){
      Object.assign(dataToPush, await createTextObjects(key, "undefined"));
    }
  }));

  //if no name: alert message and exit
  if (dataToPush.CurricularName == undefined) {
    return alert("Please name the game first.");
  }

  const CurricularPath = `Game/${CurricularID}`;

  // creates promises to push all of the data to the database 
  // uses set to overwrite the random firebaseKeys with easier to read key names
  const promises = [
    set(ref(db, `${CurricularPath}`), dataToPush),
    set(ref(db, `${CurricularPath}/ConjectureUUIDs`), conjectures),
    set(ref(db, `${CurricularPath}/Time`), timestamp),
    set(ref(db, `${CurricularPath}/UUID`), CurricularID),
    set(ref(db, `${CurricularPath}/isFinal`), false),
  ];

  return promises && alert("Game Draft saved");
}


// publish a completed game
export const writeToDatabaseCurricular = async (UUID) => {
  // Create a new date object to get a timestamp
  const dateObj = new Date();
  const timestamp = dateObj.toISOString();

  let CurricularID; // set the UUID based on whether creating new game or editing existing game
  if(UUID == null){
    CurricularID = uuidv4();
  }
  else{
    CurricularID = UUID;
  }

  //get the UUID of each conjecture
  const conjectureList = Curriculum.getCurrentConjectures();
  let conjectures = [];
  for (let i = 0; i < conjectureList.length; i++){
    conjectures.push(conjectureList[i]["UUID"]);
  }

  const dataToPush = {}
  let hasUndefined = false;
  // Fetch values from local storage for each key inside  curricularTextBoxes
  await Promise.all(curricularTextBoxes.map(async (key) => {
    const value = localStorage.getItem(key);
    Object.assign(dataToPush, await createTextObjects(key, value));

    // If the value is undefined assign the value as undefined in firebase
    if(value == undefined){
      Object.assign(dataToPush, await createTextObjects(key, "undefined"));
      hasUndefined = true;
    }
  }));

  // if anything is missing return an alert and exit
  if(hasUndefined){
    //alert("One or more text values are empty. Cannot publish game to database.");
    return alert("One or more text values are empty. Cannot publish game to database.");
  }
  if(conjectureList.length == 0){
    return alert("Please add at least 1 level to your game before publishing.");
  }

  const CurricularPath = `Game/${CurricularID}`;

  // creates promises to push all of the data to the database 
  // uses set to overwrite the random firebaseKeys with easier to read key names
  const promises = [
    set(ref(db, `${CurricularPath}`), dataToPush),
    set(ref(db, `${CurricularPath}/ConjectureUUIDs`), conjectures),
    set(ref(db, `${CurricularPath}/Time`), timestamp),
    set(ref(db, `${CurricularPath}/UUID`), CurricularID),
    set(ref(db, `${CurricularPath}/isFinal`), true),
  ];

  return alert("Game Published"), promises; //returns the promises and alerts that the game has been published
}


// Define a function to retrieve a conjecture based on UUID
export const getConjectureDataByUUID = async (conjectureID) => {
  try {
    // ref the realtime db
    const dbRef = ref(db, 'Level');
    // query to find data with the UUID
    const q = query(dbRef, orderByChild('UUID'), equalTo(conjectureID));
    
    // Execute the query
    const querySnapshot = await get(q);

    // check the snapshot
    if (querySnapshot.exists()) {
      const data = querySnapshot.val();
      return data; // return the data if its good
    } else {
      return null; // This will happen if data not found
    }
  } catch (error) {
    throw error; // this is an actual bad thing
  }
};

// Define a function to retrieve a conjecture based on UUID
export const getCurricularDataByUUID = async (curricularID) => {
  try {
    // ref the realtime db
    const dbRef = ref(db, 'Game');
    // query to find data with the UUID
    const q = query(dbRef, orderByChild('UUID'), equalTo(curricularID));
    
    // Execute the query
    const querySnapshot = await get(q);

    // check the snapshot
    if (querySnapshot.exists()) {
      const data = querySnapshot.val();
      return data; // return the data if its good
    } else {
      return null; // This will happen if data not found
    }
  } catch (error) {
    throw error; // this is an actual bad thing
  }
};

// Define a function to retrieve an array of conjectures based on AuthorID
export const getConjectureDataByAuthorID = async (authorID) => {
  try {
    // ref the realtime db
    const dbRef = ref(db, 'Level');
    // query to find data with the AuthorID
    const q = query(dbRef, orderByChild('AuthorID'), equalTo(authorID));
    
    // Execute the query
    const querySnapshot = await get(q);

    // check the snapshot
    if (querySnapshot.exists()) {
      // get all the conjectures in an array
      const conjectures = [];
      querySnapshot.forEach((conjectureSnapshot) => {
        conjectures.push(conjectureSnapshot.val());
      });
      return conjectures; // return the data if its good
    } else {
      return null; // This will happen if data not found
    }
  } catch (error) {
    throw error; // this is an actual bad thing
  }
};

// Define a function to retrieve an array of conjectures based on PIN
export const getConjectureDataByPIN = async (PIN) => {
  try {
    // ref the realtime db
    const dbRef = ref(db, 'Level');
    // query to find data with the PIN
    const q = query(dbRef, orderByChild('PIN'), equalTo(PIN));
    
    // Execute the query
    const querySnapshot = await get(q);

    // check the snapshot
    if (querySnapshot.exists()) {
      // get all the conjectures in an array
      const conjectures = [];
      querySnapshot.forEach((conjectureSnapshot) => {
        conjectures.push(conjectureSnapshot.val());
      });
      return conjectures; // return the data if its good
    } else {
      return null; // This will happen if data not found
    }
  } catch (error) {
    throw error; // this is an actual bad thing
  }
};

// get a list of all the levels
export const getConjectureList = async (final) => {
  try {
    // ref the realtime db
    const dbRef = ref(db, 'Level');

    // query to find data
    let q;
    if (final){ //return only the final (complete) conjectures
      q = query(dbRef, orderByChild('isFinal'), equalTo(final));
    }
    else{ // return both final conjectures (complete) and drafts of conjectures (incomplete)
      q = query(dbRef, orderByChild('isFinal'));
    }
    
    // Execute the query
    const querySnapshot = await get(q);

    // check the snapshot
    if (querySnapshot.exists()) {
      // get all the conjectures in an array
      const conjectures = [];
      querySnapshot.forEach((conjectureSnapshot) => {
        conjectures.push(conjectureSnapshot.val());
      });
      return conjectures; // return the data if its good
    } else {
      return null; // This will happen if data not found
    }
  } catch (error) {
    throw error; // this is an actual bad thing
  }
};


// get a list of all the games
export const getCurricularList = async (final) => {
  try {
    // ref the realtime db
    const dbRef = ref(db, 'Game');

    // query to find data
    let q;
    if (final){ //return only the final (complete) conjectures
      q = query(dbRef, orderByChild('isFinal'), equalTo(final));
    }
    else{ // return both final conjectures (complete) and drafts of conjectures (incomplete)
      q = query(dbRef, orderByChild('isFinal'));
    }
    
    // Execute the query
    const querySnapshot = await get(q);

    // check the snapshot
    if (querySnapshot.exists()) {
      // get all the conjectures in an array
      const curricular = [];
      querySnapshot.forEach((curricularSnapshot) => {
        curricular.push(curricularSnapshot.val());
      });
      return curricular; // return the data if its good
    } else {
      return null; // This will happen if data not found
    }
  } catch (error) {
    throw error; // this is an actual bad thing
  }
};

export const searchConjecturesByWord = async (searchWord) => {
  try {
    // Reference the realtime db
    const dbRef = ref(db, 'Level');

    // Query to find data
    const q = query(dbRef, orderByChild('Search Words'));

    // Execute the query
    const querySnapshot = await get(q);

    // Array to store matching conjectures
    const matchingConjectures = [];

    // This takes forever..............
    querySnapshot.forEach((snapshot) => {
      // Check if snapshot data contains searchWord as a key
      const searchData = snapshot.val();
      if (searchData && searchData['Search Words'] && searchData['Search Words'][searchWord]) {
        // Found searchWord key in this snapshot
        // Add this snapshot's data to the list of matching conjectures
        matchingConjectures.push(searchData);
      }
    });

    // Return the list of matching conjectures
    return matchingConjectures;
  } catch (error) {
    console.error('Error searching conjectures:', error);
    // Handle error appropriately
    return []; // Return an empty array in case of error
  }
};

// Write in start events to database by passing event type in
export const writeToDatabaseSessionStart = async (event, name) => {
  // Create a new date object to get a timestamp
  const dateObj = new Date();
  const timestamp = dateObj.toISOString();

  const userSession= `_UserSessions/Student/${userId}/Startup`;

  // Check event for startup
  // Push data to the database using promises
  const promises = [
    set(ref(db, `_UserSessions/Student/${userId}/Name`), name),  
    set(ref(db, `${userSession}/${event}/Time`), timestamp),
  ];

    return promises;
};

export const writeToDatabaseGameStart = async () => {
  // Create a new date object to get a timestamp
  const dateObj = new Date();
  const timestamp = dateObj.toISOString();

  // Create a reference to the Firebase Realtime Database
  const userSession = `_UserSessions/Student/${userId}/GameSession`;

  // Create an object to send to the database
  const promises = [
    set(ref(db, `${userSession}/Play`), "Begin"),
    set(ref(db, `${userSession}/Play/Time`), timestamp),
  ];

  // Return the promise that push() returns
  return promises;
};

export const writeToDatabaseGameSelect = async (curricular) => {
  // Create a new date object to get a timestamp
  const dateObj = new Date();
  const timestamp = dateObj.toISOString();

  // Create a reference to the Firebase Realtime Database
  const userSession = `_UserSessions/Student/${userId}/GameSession`;

  // Create an object to send to the database
  const promises = [
    set(ref(db, `${userSession}/GameSelect/Name`), curricular),
    set(ref(db, `${userSession}/GameSelect/Time`), timestamp),
  ];

  // Return the promise that push() returns
  return promises;
};

// Write a new game select into database under gameid>>date>>studentid>>sessionid
export const writeToDatabaseNewSession = async (IdValue, name) => {
  // Create a new date object to get a timestamp
  const dateObj = new Date();
  const timestamp = dateObj.toISOString();
  // Create a readable date ex. Janurary 1, 2023
  const formatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full'
  });
  const readableDate = formatter.format(dateObj);
  // Change conjecture id appropriately
  curricularId = IdValue;

  // Create a reference to the Firebase Realtime Database
  const userSession = `_GameID/${curricularId}/Date/${readableDate}/${userId}`;

  // Create an object to send to the database
  const promises = [
    set(ref(db, `${userSession}/Name`), name),
    set(ref(db, `${userSession}/Session/${sessionId}`), "SessionId"),
    set(ref(db, `${userSession}/Session/${sessionId}/Start`), timestamp),
    set(ref(db, `${userSession}/Session/${sessionId}/DaRep`), 'null'),
    set(ref(db, `${userSession}/Session/${sessionId}/Hints/HintEnabled`), "null"),
    set(ref(db, `${userSession}/Session/${sessionId}/Hints/HintCount`), "null"),
    set(ref(db, `${userSession}/Session/${sessionId}/Hints/HintOrder`), "null"),
    set(ref(db, `${userSession}/Session/${sessionId}/LatinSquareOrder`), "null"),
  ];

  // Return the promise that push() returns
  return promises;
};

export const writeToDatabasePoseStart = async (poseNumber) => {
  // Create a new date object to get a timestamp
  const dateObj = new Date();
  const timestamp = dateObj.toISOString();

  // Readable date format
  const formatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full'
  });
  const readableDate = formatter.format(dateObj);

  // Create a reference to the Firebase Realtime Database
  const userSession = `_GameID/${curricularId}/Date/${readableDate}/${userId}/Session/${sessionId}/Conjecture/ConjectureId/${poseNumber}`;

  // Create an object to send to the database
  const promises = [
    set(ref(db, `${userSession}/Start/Time`), timestamp),
  ];

  // Return the promise that push() returns
  return promises;
};

export const writeToDatabasePoseMatch = async (poseNumber) => {
  // Create a new date object to get a timestamp
  const dateObj = new Date();
  const timestamp = dateObj.toISOString();

  // Readable date format
  const formatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full'
  });
  const readableDate = formatter.format(dateObj);

  // Create a reference to the Firebase Realtime Database
  const userSession = `_GameID/${curricularId}/Date/${readableDate}/${userId}/Session/${sessionId}/Conjecture/ConjectureId/${poseNumber}`;

  // Create an object to send to the database
  const promises = [
    set(ref(db, `${userSession}/Match/Time`), timestamp),
  ];

  // Return the promise that push() returns
  return promises;
};