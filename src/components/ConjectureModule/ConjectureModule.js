import Background from "../Background";
import { green, blue, white, pink, orange } from "../../utils/colors";
import { NameBox } from "./ConjectureModuleBoxes";
import Button from "../Button";

const ConjectureModule = (props) => {
    const { height, width, poseData, columnDimensions, rowDimensions, editCallback } = props;

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
      </>
    );
  };
  
  export default ConjectureModule;
