import Background from "./Background";
import Button from "./Button";
import MainBox from "./PoseAuthoringBoxes";
import { Graphics, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { yellow, blue, green } from "../utils/colors";

const PoseAuthoring = (props) => {
    const { height, width } = props;
    return (
      <>
        <Background height={height} width={width} />
        <Text
          text={"Pose Creation"}
          x={width * 0.5}
          y={height * 0.1}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Futura",
              fontSize: 50,
              fontWeight: 800,
              fill: [green],
              letterSpacing: -5,
            })
          }
          anchor={0.5}
        />
        <MainBox height={height} width={width} />
      </>
    );
  };
  
  export default PoseAuthoring;