import { Container, Graphics } from "@inlet/react-pixi";
import React from "react";
import { black, yellow } from "../utils/colors";

export const MainBox = (props) => {
  // Box holding moving user pose that will be used to capture
  // Calculate the position and dimensions of the MainBox
  const rectangleX = props.width * 0.3;
  const rectangleY = props.height * 0.3;
  const rectangleWidth = 750; // Adjust the width as needed
  const rectangleHeight = 400; // Adjust the height as needed

  // Create a drawing function for the MainBox
  const drawRectangle = (g) => {
    g.clear();
    g.beginFill(yellow);      // Fill MainBox with yellow
    g.lineStyle(4, black, 1); // Outline color (black) and thickness (4)

    // Use g.moveTo and g.lineTo to draw the MainBox outline
    g.moveTo(rectangleX, rectangleY);
    g.lineTo(rectangleX + rectangleWidth, rectangleY);
    g.lineTo(rectangleX + rectangleWidth, rectangleY + rectangleHeight);
    g.lineTo(rectangleX, rectangleY + rectangleHeight);
    g.lineTo(rectangleX, rectangleY); // Close the path by returning to the starting point
    g.endFill();
  };

  return (
    <Container>
      <Graphics draw={drawRectangle} />
    </Container>
  );
};

export const StartBox = (props) => {
  // Box holding starting pose in conjecture
  // Calculate the position and dimensions of the StartBox
  const rectangleX = props.width * 0.3;
  const rectangleY = props.height * 0.3;
  const rectangleWidth = 450; // Adjust the width as needed
  const rectangleHeight = 150; // Adjust the height as needed

  // Create a drawing function for the StartBox
  const drawRectangle = (g) => {
    g.clear();
    g.beginFill(yellow);      // Fill StartBox with yellow
    g.lineStyle(4, black, 1); // Outline color (black) and thickness (4)

    // Use g.moveTo and g.lineTo to draw the StartBox outline
    g.moveTo(rectangleX, rectangleY);
    g.lineTo(rectangleX + rectangleWidth, rectangleY);
    g.lineTo(rectangleX + rectangleWidth, rectangleY + rectangleHeight);
    g.lineTo(rectangleX, rectangleY + rectangleHeight);
    g.lineTo(rectangleX, rectangleY); // Close the path by returning to the starting point
    g.endFill();
  };

  return (
    <Container>
      <Graphics draw={drawRectangle} />
    </Container>
  );
};

export const IntermediateBox = (props) => {
  // Box holding intermediate pose in conjecture
  // Calculate the position and dimensions of the IntermediateBox
  const rectangleX = props.width * 0.3;
  const rectangleY = props.height * 0.3;
  const rectangleWidth = 450; // Adjust the width as needed
  const rectangleHeight = 150; // Adjust the height as needed

  // Create a drawing function for the IntermediateBox
  const drawRectangle = (g) => {
    g.clear();
    g.beginFill(yellow);      // Fill IntermediateBox with yellow
    g.lineStyle(4, black, 1); // Outline color (black) and thickness (4)

    // Use g.moveTo and g.lineTo to draw the IntermediateBox outline
    g.moveTo(rectangleX, rectangleY);
    g.lineTo(rectangleX + rectangleWidth, rectangleY);
    g.lineTo(rectangleX + rectangleWidth, rectangleY + rectangleHeight);
    g.lineTo(rectangleX, rectangleY + rectangleHeight);
    g.lineTo(rectangleX, rectangleY); // Close the path by returning to the starting point
    g.endFill();
  };

  return (
    <Container>
      <Graphics draw={drawRectangle} />
    </Container>
  );
};

export const EndBox = (props) => {
  // Box holding end pose in conjecture
  // Calculate the position and dimensions of the EndBox
  const rectangleX = props.width * 0.3;
  const rectangleY = props.height * 0.3;
  const rectangleWidth = 450; // Adjust the width as needed
  const rectangleHeight = 150; // Adjust the height as needed

  // Create a drawing function for the EndBox
  const drawRectangle = (g) => {
    g.clear();
    g.beginFill(yellow);      // Fill EndBox with yellow
    g.lineStyle(4, black, 1); // Outline color (black) and thickness (4)

    // Use g.moveTo and g.lineTo to draw the EndBox outline
    g.moveTo(rectangleX, rectangleY);
    g.lineTo(rectangleX + rectangleWidth, rectangleY);
    g.lineTo(rectangleX + rectangleWidth, rectangleY + rectangleHeight);
    g.lineTo(rectangleX, rectangleY + rectangleHeight);
    g.lineTo(rectangleX, rectangleY); // Close the path by returning to the starting point
    g.endFill();
  };

  return (
    <Container>
      <Graphics draw={drawRectangle} />
    </Container>
  );
};
