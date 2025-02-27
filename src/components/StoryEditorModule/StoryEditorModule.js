// AKA Game module
import React, {useState} from 'react';
import Background from "../Background";
import { blue, white, red, green, indigo, hotPink, purple } from "../../utils/colors";
import Button from "../Button"
import RectButton from "../RectButton";
import { writeToDatabaseCurricular, writeToDatabaseCurricularDraft, getConjectureDataByUUID } from "../../firebase/database";
import { useMachine } from "@xstate/react";
import { setAddtoCurricular } from '../ConjectureSelector/ConjectureSelectorModule';
import { StoryEditorContentEditor } from "./StoryEditorModuleBoxes";
import Settings from '../Settings'; // Import the Settings component
import { idToSprite } from "../Chapter"; //Import list of sprites





// stores a list of conjectures
export const Curriculum = {
  CurrentConjectures: [],
  CurrentUUID: null, // null if using new game. Same UUID from database if editing existing game.

  addConjecture(conjecture) { // add the entire conjecture object to a list
    this.CurrentConjectures.push(conjecture);
  },

  getCurrentConjectures() { // return the game (list of conjectures)
    return this.CurrentConjectures;
  },

  getConjecturebyIndex(index) { // return a specific conjecture
    return this.CurrentConjectures[index];
  },

  getCurrentUUID(){ //return the UUID if editing an existing game
    if(this.CurrentUUID != null && this.CurrentUUID != ""){
      return this.CurrentUUID;
    }
    else{
      return null;
    }
  },

  setCurrentUUID(newUUID){
    this.CurrentUUID = newUUID;
  },

  moveConjectureUpByIndex(index){ // swaps 2 elements so the index rises up the list
    if(index > 0) {
      const temp = this.CurrentConjectures[index - 1];
      this.CurrentConjectures[index - 1] = this.CurrentConjectures[index];
      this.CurrentConjectures[index] = temp;
    }
  },

  moveConjectureDownByIndex(index){ // swaps 2 elements so the index falls down the list
    if(index < this.CurrentConjectures.length - 1){
      const temp = this.CurrentConjectures[index + 1];
      this.CurrentConjectures[index + 1] = this.CurrentConjectures[index];
      this.CurrentConjectures[index] = temp;
    }
  },

  removeConjectureByIndex(index){ // remove a particular conjecture based on its index in the list
    this.CurrentConjectures.splice(index, 1);;
  },

  async setCurricularEditor(curricular){ // fill in curriculum data
    this.CurrentConjectures = []; // remove previous list of levels
    if(curricular["ConjectureUUIDs"]){ // only fill in existing values
      for(i=0; i < curricular["ConjectureUUIDs"].length; i++){
        conjectureList = await getConjectureDataByUUID(curricular["ConjectureUUIDs"][i]); //getConjectureDataByUUID returns a list
        conjecture = conjectureList[curricular["ConjectureUUIDs"][i]]; // get the specific conjecture from that list
        this.CurrentConjectures.push(conjecture);
      }
    }
      localStorage.setItem('CurricularName', curricular["CurricularName"]);
      localStorage.setItem('CurricularAuthor', curricular["CurricularAuthor"]);
      localStorage.setItem('CurricularKeywords', curricular["CurricularKeywords"]);
      if(curricular["CurricularPIN"] != "undefined" && curricular["CurricularPIN"] != null){
        localStorage.setItem('CurricularPIN', curricular["CurricularPIN"]);
      }
  },

  clearCurriculum(){
    this.CurrentConjectures = []; // remove previous list of levels
    this.setCurrentUUID(null); // remove UUID
  },
};

const StoryEditorModule = (props) => {
  const { height, width, mainCallback, conjectureSelectCallback, conjectureCallback } = props;
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  // Stores dialogues
  const [dialogues, setDialogues] = useState([]);

  //Add a new dialogue
  const handleAddDialogue = () => {
    const newText = prompt("Enter dialogue text:");
    if (newText && newText.trim() !== "") {
      //Example defaults for character, type, etc.
      const newDialogue = {
        text: newText,
        character: "player",
        type: "Intro"
      };
      setDialogues([...dialogues, newDialogue]);
    }
  };

  //Remove a dialogue by index
  const handleRemoveDialogue = (index) => {
    const updated = [...dialogues];
    updated.splice(index, 1);
    setDialogues(updated);
  };

  //Edit a dialogue's text
  const handleEditDialogue = (index) => {
    const updatedText = prompt("Edit dialogue:", dialogues[index].text);
    if (updatedText !== null) {
      const updated = [...dialogues];
      updated[index].text = updatedText;
      setDialogues(updated);
    }
  };

  //Toggle Intro/Outro
  const handleChangeType = (index, newType) => {
    const updated = [...dialogues];
    updated[index].type = updated[index].type === "Intro" ? "Outro" : "Intro";
    setDialogues(updated);
  }

  //Moves narrative up
  const handleMoveup = (index) => {
    if (index > 0) {
      const updated = [...dialogues];
      // Swap this item with the one above
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      setDialogues(updated);
    }
  };

  //Moves narrative down
  const handleMoveDown = (index) => {
    if (index < dialogues.length - 1) {
      const updated = [... dialogues];
      // Swap this item with the one below
      [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
      setDialogues(updated);
    }
  };

  const handleChangeCharacter = (index, newCharacter) => {
    const updated = [...dialogues];
    updated[index].character = newCharacter;
    setDialogues(updated);
  }



  // Reset Function
  const resetCurricularValues = () => {
    localStorage.removeItem('CurricularName');
    localStorage.removeItem('CurricularAuthor');
    localStorage.removeItem('CurricularKeywords');
    localStorage.removeItem('CurricularPIN');
    Curriculum.clearCurriculum();
  };

  // Reset Function
  const enhancedMainCallback = () => {
    resetCurricularValues(); // Reset values before going back
    mainCallback(); //use the callbackfunction
  };

  // Publish function that includes reset
  async function publishAndReset(currentUUID)  {
      promise = await writeToDatabaseCurricular(currentUUID);
      if (promise != undefined){ // promise is undefined if the game cannot be published
        resetCurricularValues();
        Curriculum.CurrentConjectures = [];
      }
  };

  return (
    <>
      {/* Render the main page content only when the Settings menu is NOT open */}
      {!showSettingsMenu && (
        <>
          <Background height={height * 1.1} width={width} />

          {/* Render StoryEditorContentEditor */}
          <StoryEditorContentEditor height={height} width={width} dialogues={dialogues} onAddDialogue={handleAddDialogue} onMoveUp={handleMoveup} 
                                    onRemoveDialogue={handleRemoveDialogue} onEditDialogue={handleEditDialogue} onChangeType={handleChangeType}
                                    onMoveDown={handleMoveDown} idToSprite={idToSprite} onChangeCharacter={handleChangeCharacter} />

          {/* Buttons */}
          <RectButton
            height={height * 0.13}
            width={width * 0.26}
            x={width * 0.85}
            y={height * 0.93}
            color={red}
            fontSize={width * 0.013}
            fontColor={white}
            text={"BACK"}
            fontWeight={800}
            callback={mainCallback}
          />
          <RectButton
            height={height * 0.13}
            width={width * 0.45}
            x={width * 0.06}
            y={height * 0.93}
            color={indigo}
            fontSize={width * 0.014}
            fontColor={white}
            text={"ADD CHAPTER"}
            fontWeight={800}
            callback={() => setAddtoCurricular(true)}
          />
          <RectButton
            height={height * 0.13}
            width={width * 0.45}
            x={width * 0.3}
            y={height * 0.93}
            color={green}
            fontSize={width * 0.013}
            fontColor={white}
            text={"ADD DIALOGUE"}
            fontWeight={800}
            callback={handleAddDialogue}
          />
        </>
      )}

      {/* Render the Settings menu */}
      {showSettingsMenu && (
        <Settings
          width={width * 0.6}
          height={height * 0.6}
          x={width * 0.18}
          y={height * 0.17}
          onClose={() => setShowSettingsMenu(false)} // Close Settings menu
        />
      )}
    </>
  );
};

export default StoryEditorModule;