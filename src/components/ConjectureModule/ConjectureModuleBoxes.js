import { Graphics, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { yellow, blue, green, white, red, black } from "../../utils/colors";
import InputBox from "../InputBox";

export const NameBox = (props) => {
  const { height, width } = props;
  // Creates a popup in which the user can enter a name for their conjecture
  function nameBoxInput() {
    let conjectureName = prompt("Please Enter Your Conjecture Name");
    localStorage.setItem('Conjecture Name', conjectureName) 
  }
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
            fontSize: props.width * 0.025,
            fontWeight: 800,
            fill: [blue],
            letterSpacing: 0,
          })
        }
        anchor={0.5}
        />
        <Text
        text={"NAME:"}
        x={props.width * 0.102}
        y={props.height * 0.15}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Futura",
            fontSize: props.width * 0.018,
            fontWeight: 800,
            fill: [blue],
            letterSpacing: 0,
          })
        }
        anchor={0.5}
        />
        {/* NameBox InputBox */}
        <InputBox
          height={height * 0.10}
          width={width * 1.05}
          x={width * 0.134}
          y={height * 0.13}
          color={white}
          fontSize={width * 0.015}
          fontColor={black}
          text={localStorage.getItem('Conjecture Name')}
          fontWeight={300}
          outlineColor={black}
          callback={nameBoxInput} // Implement Popup
        />
        <Text
        text={"AUTHOR:"}
        x={props.width * 0.6}
        y={props.height * 0.15}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Futura",
            fontSize: props.width * 0.018,
            fontWeight: 800,
            fill: [blue],
            letterSpacing: 0,
          })
        }
        anchor={0.5}
        />
        <Text
        text={"CURRENT M-CLIP:"}
        x={props.width * 0.50}
        y={props.height * 0.37}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Futura",
            fontSize: props.width * 0.018,
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
        y={props.height * 0.57}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "Futura",
            fontSize: props.width * 0.018,
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

export const PINBox = (props) => {
  const { height, width } = props;
  // Creates a popup in which the user can set a pin for their conjecture
  function pinBoxInput() {
    let pin = prompt("Please Enter Your PIN");
    if (!isNaN(pin)) {
      localStorage.setItem('PIN', pin) }
    else {
      // Implement error message saying that pin must be numeric
    }
  }

  return (
      <>
      <Text
      text={"PIN:"}
      x={props.width * 0.797}
      y={props.height * 0.15}
      style={
        new TextStyle({
          align: "center",
          fontFamily: "Futura",
          fontSize: props.width * 0.018,
          fontWeight: 800,
          fill: [blue],
          letterSpacing: 0,
        })
      }
      anchor={0.5}
      />
        {/* PINBox InputBox */}
        <InputBox
          height={height * 0.10}
          width={width * 0.3}
          x={width * 0.818}
          y={height * 0.13}
          color={white}
          fontSize={width * 0.015}
          fontColor={black}
          text={localStorage.getItem('PIN')}
          fontWeight={300}
          callback={pinBoxInput} // Implement Popup
        />
      </>
  )
}

export const ConjectureBox = (props) => {
  const { height, width } = props;
  return (
      <>
        {/* ConjextureBox InputBox */}
        <InputBox
          height={height * 0.30}
          width={width * 2.1645}
          x={width * 0.072}
          y={height * 0.1755}
          color={white}
          fontSize={width * 0.02}
          fontColor={black}
          text={null}
          fontWeight={800}
          callback={null} // Implement Popup
        />
      </>
  )
}

export const KeywordsBox = (props) => {
  const { height, width } = props;
  return (
      <>
        <Text
          text={"KEYWORDS:"}
          x={props.width * 0.1275}
          y={props.height * 0.322}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Futura",
              fontSize: props.width * 0.018,
              fontWeight: 800,
              fill: [blue],
              letterSpacing: 0,
            })
          }
          anchor={0.5}
        />
        {/* KeywordsBox InputBox */}
        <InputBox
          height={height * 0.10}
          width={width * 1.8815}
          x={width * 0.1855}
          y={props.height * 0.301}
          color={white}
          fontSize={width * 0.02}
          fontColor={black}
          text={null}
          fontWeight={800}
          outlineColor={black}
          callback={null} // Implement Popup
        />
      </>
  )
}