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
      g.drawRect(x, y, width * 0.4, height * 0.4);  // Draws a rectangular button
      g.endFill();
    },
    [width]
  );
  return (
    <>
      <Graphics draw={draw} interactive={true} pointerdown={callback} />
      <Text
        text={text}                                 // The text to display
        style={                                     // Define the text's style
          new TextStyle({
            align: "center",                        // Center the text
            fontFamily: "Futura",                   // Set the font family
            fontSize: fontSize,                      // Set the font size
            fontWeight: fontWeight,                  // Set the font weight
            fill: [fontColor],                       // Set the font color
            wordWrap: true,                          // Wrap the text if it exceeds its container
          })
        }
        interactive={true}                          // Make the text interactive (clickable)
        pointerdown={callback}                      // Callback function to be called when the text is clicked
        x={x + 1.04}                           // Center the text horizontally within the button
        y={y + 1.02}                          // Center the text vertically within the button
        anchor={-.01}                                // Set the anchor to the center of the text
      />
    </>
  );
};

export default RectButton;
