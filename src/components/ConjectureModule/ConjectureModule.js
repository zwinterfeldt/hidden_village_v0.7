import Background from "../Background";
import { green, neonGreen, blue, white, pink, orange, red, transparent } from "../../utils/colors";
import Button from "../Button";
import RectButton from "../RectButton";
import { ConjectureBox, KeywordsBox, NameBox, PINBox } from "./ConjectureModuleBoxes";
import { EndBox, IntermediateBox, StartBox } from "../PoseAuth/PoseAuthoringBoxes";

const ConjectureModule = (props) => {
  const { height, width, poseData, columnDimensions, rowDimensions, editCallback, mainCallback } = props;
    return (
      <>
        <Background height={height * 1.1} width={width} />
        <NameBox height={height} width={width} />
        <PINBox height={height} width={width} />
        <StartBox height={height * 0.5} width={width * 0.5} x={5} y={4.6} boxState={null} similarityScores={null} inCE={true} />
        <IntermediateBox height={height * 0.5} width={width * 0.5} x={9} y={1.906} boxState={null} similarityScores={null} inCE={true} />
        <EndBox height={height * 0.5} width={width * 0.5} x={13} y={1.2035} boxState={null} similarityScores={null} inCE={true} />
        <Button
          height={height * 0.18}
          width={width * 0.08}
          x={width * 0.12}
          y={height * 0.47}
          color={blue}
          fontSize={24}
          fontColor={white}
          text={"Pose Editor"}
          fontWeight={800}
          callback={editCallback}
        />
        {/* Save Button */}
        <RectButton
          height={height * 0.13}
          width={width * 0.23}
          x={width * 0.65}
          y={height * 0.93}
          color={neonGreen}
          fontSize={width * 0.015}
          fontColor={white}
          text={"Save Draft"}
          fontWeight={800}
          callback={null} // Implement Save feature
        />
        {/* Cancel Button */}
        <RectButton
          height={height * 0.13}
          width={width * 0.23}
          x={width * 0.80}
          y={height * 0.93}
          color={red}
          fontSize={width * 0.015}
          fontColor={white}
          text={"Cancel"}
          fontWeight={800}
          callback={mainCallback} // Exit Back To Home
        />
      </>
    );
  };
  
  export default ConjectureModule;
