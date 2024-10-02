import React from 'react'
import { Container, Text, Graphics } from '@inlet/react-pixi';
import { powderBlue, skyBlue, cornflowerBlue, green, neonGreen, black, blue, white, pink, orange, red, transparent, turquoise } from "../../utils/colors";
import RectButton from "../RectButton";
import { useCallback } from "react";


const DataMenu = (props) => {
  const {
    menuWidth,
    menuHeight,
    x,
    y,
    trigger
  } = props;


  const draw = useCallback(
    (g) => {
      g.clear();
      g.beginFill(cornflowerBlue);
      g.drawRect(x, y, menuWidth, menuHeight);
      g.endFill();
    },
    [menuWidth, menuHeight, x, y]
  );

  if (trigger) {
    return (
    <Container>
      <Graphics
        draw={draw}
      >
        <RectButton
          height={menuHeight * 0.13}
          width={menuWidth * 0.26}
          x={menuWidth * 0.58}
          y={menuHeight * 0.93}
          color={neonGreen}
          fontSize={menuWidth * 0.014}
          fontColor={white}
          text={"TEST"}
          fontWeight={800}
          callback={ () =>{

          }}/>
      </Graphics>
    </Container>
  )
  } else {
    return <Container/>;
  }
}

export default DataMenu