import { writeToDatabasePoseAuth } from "../../firebase/database";

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
      writeToDatabasePoseAuth(startPose, 'StartPose');
   }
   // If 'intermediate.json' exists in localStorage, retrieve data and push to Firebase.
   if (localStorage.getItem('intermediate.json') !== null) {
      const startPose = localStorage.getItem('intermediate.json');
      writeToDatabasePoseAuth(startPose, 'IntermediatePose');
   }
   // If 'end.json' exists in localStorage, retrieve data and push to Firebase.
   if (localStorage.getItem('end.json') !== null) {
      const startPose = localStorage.getItem('end.json');
      writeToDatabasePoseAuth(startPose, 'EndPose');
   }

   // Clear localStorage after being saved.
   localStorage.clear();
}

// removes all poses stored in localStorage.
export function resetConjecture() {
   localStorage.clear();
}
