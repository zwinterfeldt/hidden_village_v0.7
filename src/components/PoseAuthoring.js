import Background from "./Background";
import Pose from "./Pose";
import { useState } from "react";
import { MainBox, StartBox, IntermediateBox, EndBox } from "./PoseAuthoringBoxes";
import { Graphics, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { green, blue, white, pink, orange } from "../utils/colors";
import RectButton from "./RectButton";

const PoseAuthoring = (props) => {
    const { height, width, poseData, columnDimensions, rowDimensions, mainCallBack } = props;
    const playerColumn = props.columnDimensions(3);
    const [poseSimilarity, setPoseSimilarity] = useState([]);

    return (
      <>
        <Background height={height} width={width} />
        <MainBox height={height} width={width} />
        <StartBox height={height} width={width} />
        <IntermediateBox height={height} width={width} />
        <EndBox height={height} width={width} />
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
        fontSize={24}
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
        fontSize={24}
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
        fontSize={24}
        fontColor={blue}
        text={"Done"}
        fontWeight={800}
        callback={mainCallBack} // Implement Exit To Main Menu
      />
        <RectButton
        height={height * 0.12}
        width={width * 0.20}
        x={width * 0.78}
        y={height * 0.83}
        color={white}
        fontSize={24}
        fontColor={orange}
        text={"Reset"}
        fontWeight={800}
        callback={null} // Implement Pose-Capturing
      />
      </>
    );
  };
  
  export default PoseAuthoring;
