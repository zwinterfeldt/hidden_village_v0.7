import { writeToDatabasePoseAuth } from "../../firebase/database";
import { Text, Graphics } from '@inlet/react-pixi';

// Function will capture current pose on screen and depending on which box is selected,
// store it in a JSON file with the appropriate name. This function uses localStorage
// to temporarily save the poses, only when the uses 'Save' will the poses be pushed.
export function capturePose(poseData, state) {
    let poseJson;

    // If start box is selected, convert to JSON and store start pose.
    if (state === ('start')) {
        poseJson = JSON.stringify(poseData);
        // Save as 'start.json'
        localStorage.setItem('start.json', poseJson);
        
      // If intermediate box is selected, convert to JSON and store intermediate pose.
      } else if (state === ('intermediate')) {
        poseJson = JSON.stringify(poseData);
        // Save as 'intermediate.json'
        localStorage.setItem('intermediate.json', poseJson);
      
      // If end box is selected, convert to JSON and store end pose.
      } else if (state === ('end')) {
        poseJson = JSON.stringify(poseData);
        // Save as 'end.json'
        localStorage.setItem('end.json', poseJson);
      }

}

// Saves all active poses in localStorage to Firebase and resets localStorage.
export function saveConjecture() {
   // If 'start.json' exists in localStorage, retrieve data and push to Firebase.
   if (localStorage.getItem('start.json') !== null) {
      const startPose = localStorage.getItem('start.json');
      if (localStorage.getItem('Start Tolerance') !== null) {
         writeToDatabasePoseAuth(startPose, 'StartPose', localStorage.getItem('Start Tolerance'));
      }
   }

   // If 'intermediate.json' exists in localStorage, retrieve data and push to Firebase.
   if (localStorage.getItem('intermediate.json') !== null) {
      const intermediatePose = localStorage.getItem('intermediate.json');
      if (localStorage.getItem('Intermediate Tolerance') !== null) {
         writeToDatabasePoseAuth(intermediatePose, 'IntermediatePose', localStorage.getItem('Intermediate Tolerance'));
      }
   }

   // If 'end.json' exists in localStorage, retrieve data and push to Firebase.
   if (localStorage.getItem('end.json') !== null) {
      const endPose = localStorage.getItem('end.json');
      if (localStorage.getItem('End Tolerance') !== null) {
         writeToDatabasePoseAuth(endPose, 'EndPose', localStorage.getItem('End Tolerance'));
      }
   }

   // Clear localStorage after being saved.
   localStorage.clear();
   localStorage.setItem('Start Tolerance', "TOL%")
   localStorage.setItem('Intermediate Tolerance', "TOL%")
   localStorage.setItem('End Tolerance', "TOL%")
}

// removes all poses stored in localStorage.
export function resetConjecture() {
   localStorage.clear();
   localStorage.setItem('Start Tolerance', "TOL%")
   localStorage.setItem('Intermediate Tolerance', "TOL%")
   localStorage.setItem('End Tolerance', "TOL%")
}

// Creates a popup in which the user can enter a tolerance amount for the Start Pose
export function startTolerance() {
   let tolerance = prompt("Please Enter Your Tolerance Amount (0-100%)", "50");
   if (tolerance != null) {
      localStorage.setItem('Start Tolerance', tolerance + "%")
   }
 }

 // Creates a popup in which the user can enter a tolerance amount for the Intermediate Pose
 export function intermediateTolerance() {
   let tolerance = prompt("Please Enter Your Tolerance Amount (0-100%)", "50");
   if (tolerance != null) {
      localStorage.setItem('Intermediate Tolerance', tolerance + "%")
   }
 }

 // Creates a popup in which the user can enter a tolerance amount for the End Pose
 export function endTolerance() {
   let tolerance = prompt("Please Enter Your Tolerance Amount (0-100%)", "50");
   if (tolerance != null) {
      localStorage.setItem('End Tolerance', tolerance + "%")
   }
 }