import Background from "../Background";
import Pose from "../Pose";
import { useState } from "react";
import { MainBox, StartBox, IntermediateBox, EndBox } from "./PoseAuthoringBoxes";
import { Graphics, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { black, green, blue, white, pink, orange } from "../../utils/colors";
import RectButton from "../RectButton";
import { useMachine } from "@xstate/react";
import { PoseAuthMachine } from "../../machines/poseauthMachine";

const PoseAuthoring = (props) => {
    const { height, width, poseData, columnDimensions, rowDimensions, mainCallback } = props;
    const playerColumn = props.columnDimensions(3);
    const [poseSimilarity, setPoseSimilarity] = useState([]);
    const [state, send] = useMachine(PoseAuthMachine);

    return (
      <>
        <Background height={height} width={width} />
        <MainBox height={height} width={width} />
        
        <StartBox height={height} width={width} boxState={state.value} />
        <RectButton
          // Start Pose button
          height={height * 0.05}  
          width={width * 0.10}    
          x={width * 0.25}  // width * 0.25
          y={height * .19}
          color={white}
          fontSize={width * 0.014}  //  Dynamically modify font size based on screen width
          fontColor={black}
          text={"EDIT"}
          fontWeight={800}
          callback={() => send("START")}
        />
        <RectButton
          // Start Pose button
          height={height * 0.05}  
          width={width * 0.10}    
          x={width * 0.25}
          y={height * 0.33}
          color={white}
          fontSize={width * 0.014}  //  Dynamically modify font size based on screen width
          fontColor={black}
          text={"TOL%"}
          fontWeight={800}
          callback={null}
        />

        <IntermediateBox height={height} width={width} boxState={state.value} />
        <RectButton
          height={height * 0.05}
          width={width * 0.10}
          x={width * 0.25}
          y={height * 0.43}
          color={white}
          fontSize={width * 0.014}  //  Dynamically modify font size based on screen width
          fontColor={black}
          text={"EDIT"}
          fontWeight={800}
          callback={() => send("INTERMEDIATE")}
        />
        <RectButton
          height={height * 0.05}
          width={width * 0.10}
          x={width * 0.25}
          y={height * 0.57}
          color={white}
          fontSize={width * 0.014}  //  Dynamically modify font size based on screen width
          fontColor={black}
          text={"TOL%"}
          fontWeight={800}
          callback={null}
        />

        <EndBox height={height} width={width} boxState={state.value} />
        <RectButton
          height={height * 0.05}
          width={width * 0.10}
          x={width * 0.25}
          y={height * 0.67}
          color={white}
          fontSize={width * 0.014}  //  Dynamically modify font size based on screen width
          fontColor={black}
          text={"EDIT"}
          fontWeight={800}
          callback={() => send("END")}
        />
        <RectButton
          height={height * 0.05}
          width={width * 0.10}
          x={width * 0.25}
          y={height * 0.81}
          color={white}
          fontSize={width * 0.014}  //  Dynamically modify font size based on screen width
          fontColor={black}
          text={"TOL%"}
          fontWeight={800}
          callback={null}
        />

        <Pose
          poseData={props.poseData}
          colAttr={playerColumn}
          similarityScores={poseSimilarity}
        />
        <RectButton
          height={height * 0.12}
          width={width * 0.20}
          x={width * 0.41}
          y={height * 0.83}
          color={white}
          fontSize={width * 0.021}  //  Dynamically modify font size based on screen width
          fontColor={pink}
          text={"Capture"}
          fontWeight={800}
          callback={null} // Implement Pose-Capturing
        />
        <RectButton
          height={height * 0.12}
          width={width * 0.20}
          x={width * 0.52}
          y={height * 0.83}
          color={white}
          fontSize={width * 0.021}  //  Dynamically modify font size based on screen width
          fontColor={green}
          text={"Save"}
          fontWeight={800}
          callback={null} // Implement Save Feature
        />
        <RectButton
          height={height * 0.12}
          width={width * 0.20}
          x={width * 0.67}
          y={height * 0.83}
          color={white}
          fontSize={width * 0.021}  //  Dynamically modify font size based on screen width
          fontColor={blue}
          text={"Done"}
          fontWeight={800}
          callback={props.mainCallback} // Implement Exit To Main Menu
        />
        <RectButton
          height={height * 0.12}
          width={width * 0.20}
          x={width * 0.78}
          y={height * 0.83}
          color={white}
          fontSize={width * 0.021}  //  Dynamically modify font size based on screen width
          fontColor={orange}
          text={"Reset"}
          fontWeight={800}
          callback={null} // Implement Reset??
        />
      </>
    );
};

export default PoseAuthoring;
