import { Text, Graphics } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { useCallback } from "react";

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

  const buttonWidth = width * 0.4;
  const cornerRadius = 10; // Adjust the corner radius as needed

  const draw = useCallback(
    (g) => {
      g.clear();
      g.lineStyle(5, 0x000000, 1); // Setting border to black
      g.beginFill(color);
      g.drawRoundedRect(x, y, buttonWidth, height * 0.4, cornerRadius); // Draws a rounded rectangle with curved corners
      g.endFill();
    },
    [width, height, x, y, color, buttonWidth, cornerRadius]
  );

  return (
    <>
      <Graphics draw={draw} interactive={true} pointerdown={callback} />
      <Text
        text={text}
        style={
          new TextStyle({
            align: "left",
            fontFamily: "Arial",
            fontSize: fontSize,
            fontWeight: fontWeight,
            fill: [fontColor],
            wordWrap: true,
          })
        }
        interactive={true}
        pointerdown={callback}
        x={x + buttonWidth / 2}
        y={y + height * 0.2}
        anchor={0.5}
      />
    </>
  );
};

export default InputBox;
