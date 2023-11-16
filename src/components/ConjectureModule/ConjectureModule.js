import Background from "../Background";
import { green, blue, white, pink, orange, red } from "../../utils/colors";
import Button from "../Button";
import RectButton from "../RectButton";
import { ConjectureBox, KeywordsBox, NameBox, PINBox } from "./ConjectureModuleBoxes";

const ConjectureModule = (props) => {
  const { height, width, poseData, columnDimensions, rowDimensions, editCallback, mainCallback } = props;
    return (
      <>
        <Background height={height * 1.1} width={width} />
        <NameBox height={height} width={width} />
        <PINBox height={height} width={width} />
        <ConjectureBox height={height} width={width} />
        <KeywordsBox height={height} width={width} />
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
          height={height * 0.15}
          width={width * 0.25}
          x={width * 0.65}
          y={height * 0.9}
          color={green}
          fontSize={width * 0.02}
          fontColor={white}
          text={"Save Draft"}
          fontWeight={800}
          callback={null} // Implement Save feature
        />
        {/* Cancel Button */}
        <RectButton
          height={height * 0.15}
          width={width * 0.25}
          x={width * 0.80}
          y={height * 0.9}
          color={red}
          fontSize={width * 0.02}
          fontColor={white}
          text={"Cancel"}
          fontWeight={800}
          callback={mainCallback} // Exit Back To Home
        />
      </>
    );
  };
  
  export default ConjectureModule;
