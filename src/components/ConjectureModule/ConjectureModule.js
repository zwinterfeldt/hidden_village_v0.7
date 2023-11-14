import Background from "../Background";
import { green, blue, white, pink, orange, red } from "../../utils/colors";
import Button from "../Button";
import RectButton from "../RectButton";
import { NameBox } from "./ConjectureModuleBoxes";

const ConjectureModule = (props) => {
    const { height, width, poseData, columnDimensions, rowDimensions, editCallback, mainCallback } = props;

    return (
      <>
        <Background height={height} width={width} />
        <NameBox height={height} width={width} />
        <Button
          height={height * 0.2}
          width={width * 0.1}
          x={width * 0.15}
          y={height * 0.50}
          color={blue}
          fontSize={24}
          fontColor={white}
          text={"Pose Authoring"}
          fontWeight={800}
          callback={editCallback}
        />
        <RectButton
          height={height * 0.15}
          width={width * 0.20}
          x={width * 0.65}
          y={height * 0.83}
          color={green}
          fontSize={width * 0.02}
          fontColor={white}
          text={"Save"}
          fontWeight={800}
          callback={null} // Implement Save feature
        />
        <RectButton
          height={height * 0.15}
          width={width * 0.20}
          x={width * 0.77}
          y={height * 0.83}
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
