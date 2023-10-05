import { Text, Graphics } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { useCallback } from "react";

const RectButton = (props) => {
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
      g.drawRect(x, y, width * 0.4, height * 0.4);
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
            align: "center",
            fontFamily: "Futura",
            fontSize: fontSize,
            fontWeight: fontWeight,
            fill: [fontColor],
            wordWrap: true,
          })
        }
        interactive={true}
        pointerdown={callback}
        x={x * 1.04}
        y={y * 1.02}
        anchor={0.5}
      />
    </>
  );
};

export default RectButton;
