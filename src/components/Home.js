import Background from "./Background";
import Button from "./Button";
import { Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { yellow, blue, green, white, red } from "../utils/colors";

const Home = (props) => {
  const { height, width, startCallback, editCallback, conjectureCallback, logoutCallback, testCallback } = props;
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
        height={height * 0.205}
        width={width * 0.105}
        x={width * 0.15}
        y={height * 0.75}
        color={green}
        fontSize={18}
        fontColor={white}
        text={"Test"}
        fontWeight={800}
        callback={testCallback}
      />
      <Button
        height={height * 0.205}
        width={width * 0.105}
        x={width * 0.85}
        y={height * 0.105}
        color={red}
        fontSize={18}
        fontColor={white}
        text={"Conjecture Editor"}
        fontWeight={800}
        callback={conjectureCallback}
      />
      <Button
        height={height * 0.2}
        width={width * 0.1}
        x={width * 0.15}
        y={height * 0.1}
        color={red}
        fontSize={24}
        fontColor={white}
        text={"Log Out"}
        fontWeight={800}
        callback={logoutCallback}
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
