import { Text, Graphics, Container } from "@inlet/react-pixi";
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
    <Container>
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
            wordWrapWidth: buttonWidth, // Setting the word wrap width
          })
        }
        interactive={true}
        pointerdown={callback}
        x={x + buttonWidth / 2} // Centering text in the button
        y={y + height * 0.2} // Adjusting the y-position for text
        anchor={0.5}
      />
    </Container>
  );
};

export default RectButton;
