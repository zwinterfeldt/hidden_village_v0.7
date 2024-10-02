import React from 'react'
import { Container, Text, Graphics } from '@inlet/react-pixi';
import { powderBlue, skyBlue, cornflowerBlue, green, neonGreen, black, blue, white, pink, orange, red, transparent, turquoise } from "../../utils/colors";
import RectButton from "../RectButton";
import { useCallback } from "react";
import { TextStyle } from "@pixi/text";


const DataMenu = (props) => {
  const {
    menuWidth,
    menuHeight,
    x,
    y,
    trigger
  } = props;

  const innerRectWidth = menuWidth * 0.94;
  const innerRectHeight = menuHeight * 0.8; 
  const innerRectMargins = (menuWidth - innerRectWidth) / 2;

  const draw = useCallback(
    (g) => {
      g.clear();
      g.beginFill(cornflowerBlue);
      g.drawRect(x, y, menuWidth, menuHeight);
      g.endFill();
      g.beginFill(white);
      g.drawRoundedRect(
        x + innerRectMargins, 
        y + menuHeight - innerRectMargins - innerRectHeight,
        innerRectWidth, 
        innerRectHeight);
      g.endFill();
    },
    [menuHeight, menuWidth, x, y]
  );

  if (trigger) {
    return (
    <Container>
      <Graphics
        draw={draw}
        interactive={true}
      />
      <Text
        text={"DOWNLOAD DATA"}                                 // The text to display
        style={                                     // Define the text's style
          new TextStyle({
            align: "center",                        // Center the text
            fontFamily: "Arial",                   // Set the font family
            fontSize: 20,                     // Set the font size
            fontWeight: 1000,                 // Set the font weight
            fill: [white],                      // Set the font color
          })
        }
        x={x + menuWidth / 2} // Centering text in the button
        y={y + (menuHeight - innerRectMargins - innerRectHeight) / 2}    // Adjusting the y-position for text
        anchor={0.5}
      />
      {/* <RectButton
        height={menuHeight}
        width={menuWidth}
        x={x}
        y={y}
        color={neonGreen}
        fontSize={menuWidth * 0.014}
        fontColor={white}
        text={"TEST"}
        fontWeight={800}
        callback={ () =>{

        }}/> */}
    </Container>
    )
} else {
    return <Container/>;
  }
}

export default DataMenu