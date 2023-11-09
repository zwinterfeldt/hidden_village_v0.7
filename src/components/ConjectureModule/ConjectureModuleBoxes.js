import { Graphics, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { blue } from "../../utils/colors"

export const NameBox = (props) => {
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
        </>
    )
}