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

  const buttonWidth = width * 0.4; // Adjust the width scaling if needed

  const draw = useCallback(
    (g) => {
      g.clear();
      g.beginFill(color);
      g.drawRect(x, y, buttonWidth, height * 0.4); // Draws a rectangular button
      g.endFill();
    },
    [width, height, x, y, color, buttonWidth]
  );

  return (
    <>
      <Graphics draw={draw} interactive={true} pointerdown={callback} />
      <Text
        text={text}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Futura",
            fontSize: fontSize,
            fontWeight: fontWeight,
            fill: [fontColor],
            wordWrap: true,
            wordWrapWidth: buttonWidth, // Setting the word wrap width
          })
        }
        interactive={true}
        pointerdown={callback}
        x={x + buttonWidth / 2} // Centering text in the button
        y={y + height * 0.2} // Adjusting the y-position for text
        anchor={0.5}
      />
    </>
  );
};

export default InputBox;
