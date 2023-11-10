import { Graphics, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { yellow, blue, green, white, red } from "../../utils/colors";

export const NameBox = (props) => {
    const { height, width } = props;
    return (
        <>
        <Text
        text={"Conjecture Editor"}
        x={props.width * 0.5}
        y={props.height * 0.05}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Futura",
            fontSize: 40,
            fontWeight: 800,
            fill: [blue],
            letterSpacing: 0,
          })
        }
        anchor={0.5}
        />
        <Text
        text={"NAME:"}
        x={props.width * 0.7}
        y={props.height * 0.15}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Futura",
            fontSize: 30,
            fontWeight: 800,
            fill: [blue],
            letterSpacing: 0,
          })
        }
        anchor={0.5}
        />
        <Text
        text={"AUTHOR:"}
        x={props.width * 0.9}
        y={props.height * 0.15}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Futura",
            fontSize: 30,
            fontWeight: 800,
            fill: [blue],
            letterSpacing: 0,
          })
        }
        anchor={0.5}
        />
        <Text
        text={"PIN:"}
        x={props.width * 0.11}
        y={props.height * 0.15}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Futura",
            fontSize: 30,
            fontWeight: 800,
            fill: [blue],
            letterSpacing: 0,
          })
        }
        anchor={0.5}
        />
        <Text
        text={"KEYWORDS:"}
        x={props.width * 0.13}
        y={props.height * 0.30}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Futura",
            fontSize: 30,
            fontWeight: 800,
            fill: [blue],
            letterSpacing: 0,
          })
        }
        anchor={0.5}
        />
        <Text
        text={"CURRENT M-CLIP:"}
        x={props.width * 0.30}
        y={props.height * 0.15}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Futura",
            fontSize: 30,
            fontWeight: 800,
            fill: [blue],
            letterSpacing: 0,
          })
        }
        anchor={0.5}
        />
        <Text
        text={"MULTIPLE CHOICE"}
        x={props.width * 0.50}
        y={props.height * 0.15}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Futura",
            fontSize: 30,
            fontWeight: 800,
            fill: [blue],
            letterSpacing: 0,
          })
        }
        anchor={0.5}
        />
        </>
    )
}