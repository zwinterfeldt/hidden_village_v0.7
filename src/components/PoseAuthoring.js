import Background from "./Background";
import Button from "./Button";
import Pose from "./Pose";
import { useState } from "react";
import { MainBox, StartBox, IntermediateBox, EndBox } from "./PoseAuthoringBoxes";
import { Graphics, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { green } from "../utils/colors";

const PoseAuthoring = (props) => {
    const { height, width, poseData, columnDimensions, rowDimensions } = props;
    const playerColumn = props.columnDimensions(3);
    const [poseSimilarity, setPoseSimilarity] = useState([]);

    return (
      <>
        <Background height={height} width={width} />
        <Text
          text={"Pose Sequence Editor"}
          x={width * 0.5}
          y={height * 0.05}
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
          text={"Start Pose"}
          x={width * 0.19}
          y={height * 0.29}
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
          x={width * 0.19}
          y={height * 0.59}
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
          x={width * 0.19}
          y={height * 0.89}
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
        <MainBox height={height * 0.65} width={width * 1.5} />
        <StartBox height={height * 0.35} width={width * 0.25} />
        <IntermediateBox height={height * 1.35} width={width * 0.25} />
        <EndBox height={height * 2.35} width={width * 0.25} />
        <Pose
          poseData={props.poseData}
          colAttr={playerColumn}
          similarityScores={poseSimilarity}
        />
      </>
    );
  };
  
  export default PoseAuthoring;