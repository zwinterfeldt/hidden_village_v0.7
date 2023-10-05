import Background from "./Background";
import Pose from "./Pose";
import { useState } from "react";
import { MainBox, StartBox, IntermediateBox, EndBox } from "./PoseAuthoringBoxes";
import { Graphics, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { green, blue } from "../utils/colors";
import RectButton from "./RectButton";

const PoseAuthoring = (props) => {
    const { height, width, poseData, columnDimensions, rowDimensions, mainCallBack } = props;
    const playerColumn = props.columnDimensions(3);
    const [poseSimilarity, setPoseSimilarity] = useState([]);

    return (
      <>
        <Background height={screen.availHeight} width={screen.availWidth} />
        <Text
          text={"Pose Sequence Editor"}
          x={screen.availWidth * 0.5}
          y={screen.availHeight * 0.05}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Futura",
              fontSize: 50,
              fontWeight: 800,
              fill: [green],
              letterSpacing: 0,
            })
          }
          anchor={0.5}
        />
          <Text
          text={"Conjecture: This is a sample text"}
          x={screen.availWidth * 0.5}
          y={screen.availHeight * 0.12}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Futura",
              fontSize: 30,
              fontWeight: 800,
              fill: [green],
              letterSpacing: 0,
            })
          }
          anchor={0.5}
        />
        <Text
          text={"Start Pose"}
          x={screen.availWidth * 0.195}
          y={screen.availHeight * 0.39}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Futura",
              fontSize: 30,
              fontWeight: 800,
              fill: [green],
              letterSpacing: -1,
            })
          }
          anchor={0.5}
        />
        <Text
          text={"Intermediate Pose"}
          x={screen.availWidth * 0.195}
          y={screen.availHeight * 0.63}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Futura",
              fontSize: 30,
              fontWeight: 800,
              fill: [green],
              letterSpacing: -1,
            })
          }
          anchor={0.5}
        />
        <Text
          text={"End Pose"}
          x={screen.availWidth * 0.195}
          y={screen.availHeight * 0.87}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Futura",
              fontSize: 30,
              fontWeight: 800,
              fill: [green],
              letterSpacing: -1,
            })
          }
          anchor={0.5}
        />
        <MainBox height={screen.availHeight} width={screen.availWidth} />
        <StartBox height={screen.availHeight} width={screen.availWidth} />
        <IntermediateBox height={screen.availHeight} width={screen.availWidth} />
        <EndBox height={screen.availHeight} width={screen.availWidth} />
        <Pose
          poseData={props.poseData}
          colAttr={playerColumn}
          similarityScores={poseSimilarity}
        />
        <RectButton
        height={height * 0.12}
        width={width * 0.15}
        x={screen.availWidth * 0.5}
        y={screen.availHeight * 0.7}
        color={green}
        fontSize={24}
        fontColor={blue}
        text={"Capture"}
        fontWeight={800}
        callback={null} // Implement Pose-Capturing
      />
        <RectButton
        height={height * 0.12}
        width={width * 0.15}
        x={screen.availWidth * 0.6}
        y={screen.availHeight * 0.7}
        color={green}
        fontSize={24}
        fontColor={blue}
        text={"Save"}
        fontWeight={800}
        callback={null} // Implement Save Feature
      />
        <RectButton
        height={height * 0.12}
        width={width * 0.15}
        x={screen.availWidth * 0.7}
        y={screen.availHeight * 0.7}
        color={green}
        fontSize={24}
        fontColor={blue}
        text={"Done"}
        fontWeight={800}
        callback={mainCallBack} // Implement Exit To Main Menu
      />
        <RectButton
        height={height * 0.12}
        width={width * 0.15}
        x={screen.availWidth * 0.8}
        y={screen.availHeight * 0.7}
        color={green}
        fontSize={24}
        fontColor={blue}
        text={"Reset"}
        fontWeight={800}
        callback={null} // Implement Pose-Capturing
      />
      </>
    );
  };
  
  export default PoseAuthoring;
