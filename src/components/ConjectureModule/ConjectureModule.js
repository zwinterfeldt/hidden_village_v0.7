import Background from "../Background";
import { useState } from "react";
import { Graphics, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { green, blue, white, pink, orange } from "../../utils/colors";
import RectButton from "../RectButton";
import { NameBox } from "./ConjectureModuleBoxes";

const ConjectureModule = (props) => {
    const { height, width, poseData, columnDimensions, rowDimensions, mainCallBack } = props;

    return (
      <>
        <Background height={height} width={width} />
        <NameBox height={height} width={width} />
      </>
    );
  };
  
  export default ConjectureModule;
