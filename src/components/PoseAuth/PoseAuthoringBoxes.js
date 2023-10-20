import { Container, Graphics, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import React from "react";
import { black, yellow, green, white, red } from "../../utils/colors";

export const MainBox = (props) => {
  // Box holding moving user pose that will be used to capture
  // Calculate the position and dimensions of the MainBox
  const rectangleX = props.width * 0.375;
  const rectangleY = props.height * 0.17;
  const rectangleWidth = props.width * 0.52; // Adjust the width as needed
  const rectangleHeight = props.height * 0.65; // Adjust the height as needed

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

  const drawTextBox = (g) => {  // Draws a black box around the buttons
    g.clear();
    g.beginFill(black);
    g.drawRect(props.width * 0.374, props.height * 0.822, props.width * 0.522, props.height * 0.07);  // (x, y, width, height)
    g.endFill();
  };

  return (
    <Container>
      <Graphics draw={drawRectangle} />
      <Graphics draw={drawTextBox} />
      <Text
          text={"Pose Sequence Editor"}
          x={props.width * 0.5}
          y={props.height * 0.05}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Futura",
              fontSize: 50,
              fontWeight: 800,
              fill: [green],
              letterSpacing: 0,
            })
          }
          anchor={0.5}
        />
        <Text
          text={"Conjecture: This is a sample text"}
          x={props.width * 0.5}
          y={props.height * 0.12}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Futura",
              fontSize: 30,
              fontWeight: 800,
              fill: [green],
              letterSpacing: 0,
            })
          }
          anchor={0.5}
        />
    </Container>
  );
};

export const StartBox = (props) => {
  // Box holding starting pose in conjecture
  // Calculate the position and dimensions of the StartBox
  const rectangleX = props.width * 0.1;
  const rectangleY = props.height * 0.17;
  const rectangleWidth = props.width * 0.2; // Adjust the width as needed,    maintain aspect ratio => windows.devicepixelratio
  const rectangleHeight = props.height * 0.2; // Adjust the height as needed

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

  const drawTextBox = (g) => {  // Draws a black box around the text
      g.clear();
      g.beginFill(black);
      g.drawRect(props.width * 0.099, props.height * 0.37, props.width * 0.202, props.height * 0.04);  // (x, y, width, height)
      g.endFill();
    };

    const drawBoxOutline = (g) => {
      g.clear();
      g.lineStyle(7, green);
  
      g.moveTo(rectangleX, rectangleY);
      g.lineTo(rectangleX + rectangleWidth, rectangleY);
      g.lineTo(rectangleX + rectangleWidth, rectangleY + rectangleHeight);
      g.lineTo(rectangleX, rectangleY + rectangleHeight);
      g.lineTo(rectangleX, rectangleY);
    }

  return (
    <Container>
      <Graphics draw={drawRectangle} />
      <Graphics draw={drawTextBox} />
      <Text
          text={"Start Pose"}
          x={props.width * 0.195}
          y={props.height * 0.39}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Futura",
              fontSize: 29,
              fontWeight: 800,
              fill: [green],
              letterSpacing: 0,
            })
          }
          anchor={0.5}
        />
        {props.boxState === "start" && (
        <Graphics draw={drawBoxOutline} />
      )}
    </Container>
  );
};

export const IntermediateBox = (props) => {
  // Box holding intermediate pose in conjecture
  // Calculate the position and dimensions of the IntermediateBox
  const rectangleX = props.width * 0.1;
  const rectangleY = props.height * 0.41;
  const rectangleWidth = props.width * 0.2; // Adjust the width as needed
  const rectangleHeight = props.height * 0.2; // Adjust the height as needed

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

  const drawTextBox = (g) => {  // Draws a black box around the text
    g.clear();
    g.beginFill(black);
    g.drawRect(props.width * 0.099, props.height * 0.61, props.width * 0.202, props.height * 0.04);  // (x, y, width, height)
    g.endFill();
  };

  const drawBoxOutline = (g) => {
    g.clear();
    g.lineStyle(7, green);

    g.moveTo(rectangleX, rectangleY);
    g.lineTo(rectangleX + rectangleWidth, rectangleY);
    g.lineTo(rectangleX + rectangleWidth, rectangleY + rectangleHeight);
    g.lineTo(rectangleX, rectangleY + rectangleHeight);
    g.lineTo(rectangleX, rectangleY);
  }

  return (
    <Container>
      <Graphics draw={drawRectangle} />
      <Graphics draw={drawTextBox} />
      <Text
          text={"Intermediate Pose"}
          x={props.width * 0.195}
          y={props.height * 0.63}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Futura",
              fontSize: 29,
              fontWeight: 800,
              fill: [white],
              letterSpacing: 0,
            })
          }
          anchor={0.5}
        />
        {props.boxState === "intermediate" && (
        <Graphics draw={drawBoxOutline} />
      )}
    </Container>
  );
};

export const EndBox = (props) => {
  // Box holding end pose in conjecture
  // Calculate the position and dimensions of the EndBox
  const rectangleX = props.width * 0.1;
  const rectangleY = props.height * 0.65;
  const rectangleWidth = props.width * 0.2; // Adjust the width as needed
  const rectangleHeight = props.height * 0.2; // Adjust the height as needed

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

  const drawTextBox = (g) => {  // Draws a black box around the text
    g.clear();
    g.beginFill(black);
    g.drawRect(props.width * 0.099, props.height * 0.85, props.width * 0.202, props.height * 0.04);  // (x, y, width, height)
    g.endFill();
  };

  const drawBoxOutline = (g) => {
    g.clear();
    g.lineStyle(7, green);

    g.moveTo(rectangleX, rectangleY);
    g.lineTo(rectangleX + rectangleWidth, rectangleY);
    g.lineTo(rectangleX + rectangleWidth, rectangleY + rectangleHeight);
    g.lineTo(rectangleX, rectangleY + rectangleHeight);
    g.lineTo(rectangleX, rectangleY);
  }

  return (
    <Container>
      <Graphics draw={drawRectangle} />
      <Graphics draw={drawTextBox} />
      <Text
          text={"End Pose"}
          x={props.width * 0.195}
          y={props.height * 0.87}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Futura",
              fontSize: 29,
              fontWeight: 800,
              fill: [red],
              letterSpacing: 0,
            })
          }
          anchor={0.5}
        />
        {props.boxState === "end" && (
        <Graphics draw={drawBoxOutline} />
      )}
    </Container>
  );
};
