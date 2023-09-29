import { Container, Graphics } from "@inlet/react-pixi";
import React from "react";
import { red } from "../utils/colors";

const MainBox = (props) => {
  // Calculate the position and dimensions of the rectangle
  const rectangleX = props.width * 0.3;
  const rectangleY = props.height * 0.3;
  const rectangleWidth = 200; // Adjust the width as needed
  const rectangleHeight = 100; // Adjust the height as needed

  // Create a drawing function for the rectangle
  const drawRectangle = (g) => {
    g.clear();
    g.lineStyle(4, red, 1); // Outline color (red) and thickness (4)

    // Use g.moveTo and g.lineTo to draw the rectangle outline
    g.moveTo(rectangleX, rectangleY);
    g.lineTo(rectangleX + rectangleWidth, rectangleY);
    g.lineTo(rectangleX + rectangleWidth, rectangleY + rectangleHeight);
    g.lineTo(rectangleX, rectangleY + rectangleHeight);
    g.lineTo(rectangleX, rectangleY); // Close the path by returning to the starting point
  };

  return (
    <Container>
      <Graphics draw={drawRectangle} />
    </Container>
  );
};

export default MainBox;
