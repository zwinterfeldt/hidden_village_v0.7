import React from 'react';
import Background from "../Background";
import { blue, white, red, green } from "../../utils/colors";
import Button from "../Button";
import RectButton from "../RectButton";
import { writeToDatabaseConjecture, writeToDatabaseDraft, getConjectureDataByUUID,getConjectureDataByAuthorID, getConjectureDataByPIN, getPoseDataByConjUUID } from "../../firebase/database";
import { CurricularContentEditor } from "../CurricularModule/CurricularModuleBoxes";
import { useMachine } from "@xstate/react";
import { CurricularContentEditorMachine } from "../../machines/curricularEditorMachine";

export const Curriculum = {
  CurrentConjectures: [],

  addConjecture(conjectureUUID) {
    this.CurrentConjectures.push({conjectureUUID});
  },

  getCurrentConjectures() {
    return this.CurrentConjectures;
  },
};

const CurricularModule = (props) => {
  const { height, width, mainCallback, conjectureSelectCallback } = props;
  const [state, send] = useMachine(CurricularContentEditorMachine);
  

  // Reset Function
  const resetCurricularValues = () => {
    localStorage.removeItem('CurricularName');
    localStorage.removeItem('CurricularAuthorID');
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
    writeToDatabaseConjecture(); // publish to database
    resetCurricularValues(); // Reset values after publishing
  };

  return (
    <>
      <Background height={height * 1.1} width={width} />
      <RectButton
        height={height * 0.13}
        width={width * 0.26}
        x={width * 0.71}
        y={height * 0.93}
        color={red}
        fontSize={width * 0.015}
        fontColor={white}
        text={"BACK"}
        fontWeight={800}
        callback={enhancedMainCallback} //this will reset everything once you leave the page
      />

     
      <RectButton
        height={height * 0.13}
        width={width * 0.50}
        x={width *0.58}
        y={height *0.60}
        color={blue}
        fontSize={width * 0.014}
        fontColor={white}
        text={"+Add Conjecture"}
        fontWeight={800}
        callback={conjectureSelectCallback}
      />

      <RectButton
        height={height * 0.13}
        width={width * 0.26}
        x={width * 0.58}
        y={height * 0.93}
        color={green}
        fontSize={width * 0.014}
        fontColor={white}
        text={"SAVE DRAFT"}
        fontWeight={800}
        callback={ () => writeToDatabaseDraft() } // Implement Save feature
      />

      <RectButton
        height={height * 0.13}
        width={width * 0.26}
        x={width * 0.45}
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