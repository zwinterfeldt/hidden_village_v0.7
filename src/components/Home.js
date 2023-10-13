import Background from "./Background";
import Button from "./Button";
import { Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { yellow, blue, green } from "../utils/colors";

const Home = (props) => {
  const { height, width, startCallback, editCallback } = props;
  return (
    <>
      <Background height={height} width={width} />
      <Button
        height={height * 0.5}
        width={width * 0.33}
        x={width * 0.5}
        y={height * 0.7}
        color={blue}
        fontSize={120}
        fontColor={yellow}
        text={"Start"}
        fontWeight={800}
        callback={startCallback}
      />
      <Button
        height={height * 0.2}
        width={width * 0.1}
        x={width * 0.85}
        y={height * 0.1}
        color={green}
        fontSize={24}
        fontColor={blue}
        text={"Pose Authoring"}
        fontWeight={800}
        callback={editCallback}
      />
      <Text
        text={"Hidden Village"}
        x={width * 0.5}
        y={height * 0.25}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Futura",
            fontSize: 146,
            fontWeight: 800,
            fill: [blue],
            letterSpacing: -5,
          })
        }
        anchor={0.5}
      />
    </>
  );
};

export default Home;
