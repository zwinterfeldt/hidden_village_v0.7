import Background from "../Background";
import { green, neonGreen, black, blue, white, pink, orange, red, transparent, turquoise } from "../../utils/colors";
import Button from "../Button";
import RectButton from "../RectButton";
import InputBox from "../InputBox";
import { ConjectureBox, KeywordsBox, NameBox, PINBox } from "./ConjectureModuleBoxes";
import { EndBox, IntermediateBox, StartBox } from "../PoseAuth/PoseAuthoringBoxes";
import { writeToDatabaseConjecture, writeToDatabaseDraft, getConjectureDataByUUID,getConjectureDataByAuthorID, getConjectureDataByPIN, getPoseDataByConjUUID } from "../../firebase/database";
import { useMachine } from "@xstate/react";
import { ConjectureEditorMachine } from "../../machines/conjectureEditorMachine";

export const currentConjecture = {
  CurrentConjecture: [],

  setConjecture(conjecture) {
    this.CurrentConjecture = conjecture;
  },

  getCurrentConjecture() {
    return this.CurrentConjecture;
  },
}

// fill in local storage using currentConjecture if an existing conjecture is selected
// currentConjecture receives the value when the conjecture is clicked from ConjectureSelectorModule
function setLocalStorage(){ 
  const conjecture = currentConjecture.getCurrentConjecture();
  if (currentConjecture.getCurrentConjecture().length != 0) {
    localStorage.setItem('Author Name' , conjecture['Text Boxes']['Author Name']);
    localStorage.setItem('Conjecture Description' , conjecture['Text Boxes']['Conjecture Description']);
    localStorage.setItem('Conjecture Name' , conjecture['Text Boxes']['Conjecture Name']);
    localStorage.setItem('Conjecture Keywords' , conjecture['Text Boxes']['Conjecture Keywords']);
    localStorage.setItem("Multiple Choice 1", conjecture['Text Boxes']['Multiple Choice 1']),
    localStorage.setItem("Multiple Choice 2", conjecture['Text Boxes']['Multiple Choice 2']),
    localStorage.setItem("Multiple Choice 3", conjecture['Text Boxes']['Multiple Choice 3']),
    localStorage.setItem("Multiple Choice 4", conjecture['Text Boxes']['Multiple Choice 4'])
    localStorage.setItem('PIN' , conjecture['Text Boxes']['PIN']);
    localStorage.setItem('start.json' , conjecture['Start Pose']['poseData']);
    localStorage.setItem('intermediate.json' , conjecture['Intermediate Pose']['poseData']);
    localStorage.setItem('end.json' , conjecture['End Pose']['poseData']);
  }
}

const ConjectureModule = (props) => {
  const { height, width, poseData, columnDimensions, rowDimensions, editCallback, mainCallback } = props;
  const [state, send] = useMachine(ConjectureEditorMachine);
  setLocalStorage();

    return (
      <>
        <Background height={height * 1.1} width={width} />
        <NameBox height={height} width={width} boxState={state.value} />
        <PINBox height={height} width={width} />
        <StartBox height={height * 0.5} width={width * 0.5} x={5} y={4.6} boxState={null} similarityScores={null} inCE={true} />
        <IntermediateBox height={height * 0.5} width={width * 0.5} x={9} y={1.906} boxState={null} similarityScores={null} inCE={true} />
        <EndBox height={height * 0.5} width={width * 0.5} x={13} y={1.2035} boxState={null} similarityScores={null} inCE={true} />
        {/* Button to Pose Editor */}
        <Button
          height={height * 0.12}
          width={width * 0.0950}
          x={width * 0.17}
          y={height * 0.42}
          color={blue}
          fontSize={21}
          fontColor={white}
          text={"POSE EDITOR"}
          fontWeight={800}
          callback={editCallback}
        />
          <Button
            height={height * 0.14}
            width={width * 0.04}
            x={width * 0.10}
            y={height * 0.61}
            color={blue}
            fontSize={40}
            fontColor={white}
            text={"A"}
            fontWeight={800}
            callback={null}
        />
          <Button
            height={height * 0.14}
            width={width * 0.04}
            x={width * 0.10}
            y={height * 0.70}
            color={blue}
            fontSize={40}
            fontColor={white}
            text={"B"}
            fontWeight={800}
            callback={null}
        />
          <Button
            height={height * 0.14}
            width={width * 0.04}
            x={width * 0.10}
            y={height * 0.79}
            color={blue}
            fontSize={40}
            fontColor={white}
            text={"C"}
            fontWeight={800}
            callback={null}
        />
          <Button
            height={height * 0.14}
            width={width * 0.04}
            x={width * 0.10}
            y={height * 0.88}
            color={blue}
            fontSize={40}
            fontColor={white}
            text={"D"}
            fontWeight={800}
            callback={null}
        />
        {/* Save Button */}
        <RectButton
          height={height * 0.13}
          width={width * 0.26}
          x={width * 0.58}
          y={height * 0.93}
          color={neonGreen}
          fontSize={width * 0.014}
          fontColor={white}
          text={"SAVE DRAFT"}
          fontWeight={800}
          callback={ () => writeToDatabaseDraft() } // Implement Save feature
        />
        {/* Cancel Button */}
        <RectButton
          height={height * 0.13}
          width={width * 0.26}
          x={width * 0.71}
          y={height * 0.93}
          color={red}
          fontSize={width * 0.015}
          fontColor={white}
          text={"CANCEL"}
          fontWeight={800}
          callback={mainCallback} // Exit Back To Home
        />
        {/* Publish Button */}
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
          callback={ () => writeToDatabaseConjecture() } // publish to database
        />

        {/* TEST RETRIEVE Button */}
        <RectButton
          height={height * 0.13}
          width={width * 0.26}
          x={width * 0.15}
          y={height * 0.93}
          color={black}
          fontSize={width * 0.015}
          fontColor={white}
          text={"TEST UUID"}
          fontWeight={800}
          callback={() => {
            const targetUUID = "698c9d7d-2d4a-44e4-8ac1-abee27569a6b"; // a UUID I created earlier
            getConjectureDataByUUID(targetUUID)
              .then((conjectureData) => {
                console.log('Conjecture Data:', conjectureData);
              })
              .catch((error) => {
                console.error('Error getting conjecture data: ', error);
              });
          }}
        />
        {/* TEST Author ID Button */}
        <RectButton
          height={height * 0.13}
          width={width * 0.26}
          x={width * 0.05}
          y={height * 0.93}
          color={black}
          fontSize={width * 0.015}
          fontColor={white}
          text={"TEST AuthorID"}
          fontWeight={800}
          callback={() => {
            const userId = "CYONFYmwvXbPT1uLUqkTO2GPtoL2"; // nates user id
            getConjectureDataByAuthorID(userId)
              .then((conjectureData) => {
                console.log('Conjecture Data:', conjectureData);
              })
              .catch((error) => {
                console.error('Error getting conjecture data: ', error);
              });
          }}
        />
        {/* TEST PIN Button */}
        <RectButton
          height={height * 0.13}
          width={width * 0.26}
          x={width * 0.25}
          y={height * 0.93}
          color={black}
          fontSize={width * 0.015}
          fontColor={white}
          text={"TEST PIN"}
          fontWeight={800}
          callback={() => {
            const PIN = "123456789"; // some PIN I created
            getConjectureDataByPIN(PIN)
              .then((conjectureData) => {
                console.log('Conjecture Data:', conjectureData);
              })
              .catch((error) => {
                console.error('Error getting conjecture data: ', error);
              });
          }}
        />


        {/* Back Button */}
        <Button
          height={height * 0.32}
          width={width * 0.07}
          x={width * 0.06}
          y={height * 0.15}
          color={red}
          fontSize={width * 0.015}
          fontColor={white}
          text={"BACK"}
          fontWeight={800}
          callback={mainCallback} // Exit Back To Home
        />
        {/* 'X' Buttons for the mutliple choice boxes */}
        <InputBox
          height={height * 0.14}
          width={width * 0.07}
          x={width * 0.735}
          y={height * 0.58}
          color={white}
          fontSize={width * 0.024}  //  Dynamically modify font size based on screen width
          fontColor={black}
          text={localStorage.getItem("OptionA Checkmark")}
          fontWeight={600}
          callback={() => send("OPTIONA")}
        />
        <InputBox
          height={height * 0.14}
          width={width * 0.07}
          x={width * 0.735}
          y={height * 0.67}
          color={white}
          fontSize={width * 0.024}  //  Dynamically modify font size based on screen width
          fontColor={black}
          text={localStorage.getItem("OptionB Checkmark")}
          fontWeight={600}
          callback={() => send("OPTIONB")}
        />
        <InputBox
          height={height * 0.14}
          width={width * 0.07}
          x={width * 0.735}
          y={height * 0.76}
          color={white}
          fontSize={width * 0.024}  //  Dynamically modify font size based on screen width
          fontColor={black}
          text={localStorage.getItem("OptionC Checkmark")}
          fontWeight={600}
          callback={() => send("OPTIONC")}
        />
        <InputBox
          height={height * 0.14}
          width={width * 0.07}
          x={width * 0.735}
          y={height * 0.85}
          color={white}
          fontSize={width * 0.024}  //  Dynamically modify font size based on screen width
          fontColor={black}
          text={localStorage.getItem("OptionD Checkmark")}
          fontWeight={600}
          callback={() => send("OPTIOND")}
        />
      </>
    );
  };
  
  export default ConjectureModule;
