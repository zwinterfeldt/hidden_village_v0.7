import { Text, Graphics } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { useCallback } from "react";
import { black } from "../utils/colors";

const InputBox = (props) => {
  const {
    width,
    height,
    x,
    y,
    text,
    color,
    fontSize,
    fontColor,
    fontWeight,
    callback,
  } = props;
  const draw = useCallback(
    (g) => {
      g.clear();
      g.beginFill(color);
      g.drawRect(x, y, width * 0.4, height * 0.4);  // Draws a rectangle
      g.endFill();
    },
    [width]
  );
  return (
    <>
      <Graphics draw={draw} interactive={true} pointerdown={callback} />
      <Text
        text={text}
        style={
          new TextStyle({
            fontFamily: "Futura",
            fontSize: fontSize,
            fontWeight: fontWeight,
            fill: [fontColor],
            wordWrap: false,
          })
        }
        interactive={true}
        pointerdown={callback}
        x={x * 1.42}
        y={y * 1.15}
        anchor={0.5}
      />
    </>
  );
};

export default InputBox;
