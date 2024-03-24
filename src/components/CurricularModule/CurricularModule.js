// AKA Game module
import React from 'react';
import Background from "../Background";
import { blue, white, red, green } from "../../utils/colors";
import Button from "../Button";
import RectButton from "../RectButton";
import { writeToDatabaseCurricular, writeToDatabaseCurricularDraft } from "../../firebase/database";
import { CurricularContentEditor } from "../CurricularModule/CurricularModuleBoxes";
import { useMachine } from "@xstate/react";
import { CurricularContentEditorMachine } from "../../machines/curricularEditorMachine";
import { curricularSelect, setCurricularSelect } from '../ConjectureSelector/ConjectureSelectorModule';


// stores a list of conjectures
export const Curriculum = {
  CurrentConjectures: [],

  addConjecture(conjecture) { // add the entire conjecture object to a list
    this.CurrentConjectures.push(conjecture);
  },

  getCurrentConjectures() { // return the game (list of conjectures)
    return this.CurrentConjectures;
  },

  getConjecturebyIndex(index) { // return a specific conjecture
    return this.CurrentConjectures[index];
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
    this.CurrentConjectures.pop(index);
  }
};

const CurricularModule = (props) => {
  const { height, width, mainCallback, conjectureSelectCallback } = props;
  const [state, send] = useMachine(CurricularContentEditorMachine);

  // Reset Function
  const resetCurricularValues = () => {
    localStorage.removeItem('CurricularName');
    localStorage.removeItem('CurricularAuthor');
    localStorage.removeItem('CurricularKeywords');
    localStorage.removeItem('CurricularPIN');
  };

  // Reset Function
  const enhancedMainCallback = () => {
    resetCurricularValues(); // Reset values before going back
    mainCallback(); //use the callbackfunction
  };

    // Publish function that includes reset
    const publishAndReset = () => {
      if(writeToDatabaseCurricularDraft()){
        resetCurricularValues();
        Curriculum.CurrentConjectures = [];
      }
    };

  return (
    <>
      <Background height={height * 1.1} width={width} />
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
        callback={enhancedMainCallback} //this will reset everything once you leave the page
      />

      <RectButton
        height={height * 0.13}
        width={width * 0.26}
        x={width * 0.15}
        y={height * 0.93}
        color={blue}
        fontSize={width * 0.014}
        fontColor={white}
        text={"PREVIOUS"}
        fontWeight={800}
        callback = {null}
      />

      <RectButton
        height={height * 0.13}
        width={width * 0.26}
        x={width * 0.35}
        y={height * 0.93}
        color={blue}
        fontSize={width * 0.014}
        fontColor={white}
        text={"NEXT"}
        fontWeight={800}
        callback={null}
      />

      <RectButton
        height={height * 0.13}
        width={width * 0.45}
        x={width *0.15}
        y={height *0.93}
        color={blue}
        fontSize={width * 0.014}
        fontColor={white}
        text={"+Add Conjecture"}
        fontWeight={800}
        callback={() => {
          setCurricularSelect(true); //conjecture selector is being accessed from the curricular module
          conjectureSelectCallback();
        }}
      />

      <RectButton
        height={height * 0.13}
        width={width * 0.26}
        x={width * 0.55}
        y={height * 0.93}
        color={green}
        fontSize={width * 0.013}
        fontColor={white}
        text={"SAVE DRAFT"}
        fontWeight={800}
        callback={ () => writeToDatabaseCurricularDraft() }
      />
      <RectButton
        height={height * 0.13}
        width={width * 0.26}
        x={width * 0.73}
        y={height * 0.93}
        color={blue}
        fontSize={width * 0.015}
        fontColor={white}
        text={"PUBLISH"}
        fontWeight={800}
        callback={publishAndReset} // Enhanced to include reset
      />
      <CurricularContentEditor height={height} width={width} />
    </>
  );
};

export default CurricularModule;