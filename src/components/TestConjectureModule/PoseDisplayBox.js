import { Container, Graphics, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import React from "react";
import { black, yellow, green, white, red } from "../../utils/colors";
import Pose from "../Pose";

export const PoseBox = (props) => {
    // Props:
    // - width: Width of the container
    // - height: Height of the container
    // - x: X-coordinate for positioning
    // - y: Y-coordinate for positioning
    // - text: Text content to be displayed
    // - pose: pose data in JSON format
    // - tolerence: Tolerance value to be displayed
    // - simularity scores for seeing if the play is matching the pose

    const rectangleX = props.width * 0.05 * props.x;
    const rectangleY = props.height * 0.05 * props.y;
    const rectangleWidth = props.width * 0.6; // Adjust the width as needed,    maintain aspect ratio => windows.devicepixelratio
    const rectangleHeight = props.height * 1.5; // Adjust the height as needed

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

    return (
        <Container>
            <Graphics draw={drawRectangle} />
            {/* <Graphics draw={drawTextBox} /> */}
            <Text
                text={props.text}
                x={props.width * 0.55}
                y={props.height * 0.3}
                style={
                new TextStyle({
                    align: "center",
                    fontFamily: "Arial",
                    fontSize: props.width * 0.02,
                    fontWeight: 800,
                    fill: [green],
                    letterSpacing: 0,
                })
                }
                anchor={0.5}
            />
            {/* Pose is displayed when pose data is submitted */}
            {props.pose !== null && (
            <Pose
                poseData={JSON.parse(props.pose)}
                colAttr={{
                x: (rectangleX + (rectangleWidth - (rectangleWidth * 1)) ),
                y: (rectangleY + (rectangleHeight - (rectangleHeight * 1)) ),
                width: rectangleWidth * 1,
                height: rectangleWidth * .8,
                }}
                similarityScores={props.similarityScores}
            />
            )}
            {/* Display tolerance when entered */}
            {props.tolerance !== null && (
            <Text
            text={`Tolerance: ${props.tolerance}`}
            x={props.width * .55}
            y={props.height * 1.7}
            style={
                new TextStyle({
                    align: "center",
                    fontFamily: "Arial",
                    fontSize: props.width * .02,
                    fontWeight: 800,
                    fill: [black],
                    letterSpacing: 0,
                })
            }
            anchor={0.5}
            />
            )}
        </Container>
        );
}