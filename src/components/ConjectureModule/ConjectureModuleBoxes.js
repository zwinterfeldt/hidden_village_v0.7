import { Graphics, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { yellow, blue, green, white, red, black } from "../../utils/colors";
import InputBox from "../InputBox";

export const NameBox = (props) => {
  const { height, width } = props;
  // Creates a popup in which the user can enter a name for their conjecture
  function nameBoxInput() {
    const existingName = localStorage.getItem('Conjecture Name');
    const newConjectureName = prompt("Please Enter Your Conjecture Name", existingName);
    
    if (newConjectureName !== null) {
      localStorage.setItem('Conjecture Name', newConjectureName);
    }
  }
    return (
        <>
        {/* multiChoice1 InputBox */}
        <InputBox
          height={height * .19}
          width={width * 2}
          x={width * 0.134}
          y={height * 0.55}
          color={white}
          fontSize={width * 0.014}
          fontColor={black}
          text={
            localStorage.getItem('Conjecture Name').slice(0, 100) +
            (localStorage.getItem('Conjecture Name').length > 100 ? '...' : '')
          }
          fontWeight={800}
          outlineColor={black}
          callback={nameBoxInput} // Implement Popup
        />
        {/* multiChoice2 InputBox */}
        <InputBox
          height={height * .19}
          width={width * 2}
          y={height * 0.64}
          color={white}
          fontSize={width * 0.014}
          fontColor={black}
          text={
            localStorage.getItem('Conjecture Name').slice(0, 100) +
            (localStorage.getItem('Conjecture Name').length > 100 ? '...' : '')
          }
          fontWeight={800}
          outlineColor={black}
          callback={nameBoxInput} // Implement Popup
        />
        {/* multiChoice3 InputBox */}
        <InputBox
          height={height * .19}
          width={width * 2}
          x={width * 0.134}
          y={height * 0.73}
          color={white}
          fontSize={width * 0.014}
          fontColor={black}
          text={
            localStorage.getItem('Conjecture Name').slice(0, 100) +
            (localStorage.getItem('Conjecture Name').length > 100 ? '...' : '')
          }
          fontWeight={800}
          outlineColor={black}
          callback={nameBoxInput} // Implement Popup
        />
        {/* multiChoice4 InputBox */}
        <InputBox
          height={height * .19}
          width={width * 2}
          x={width * 0.134}
          y={height * 0.82}
          color={white}
          fontSize={width * 0.014}
          fontColor={black}
          text={
            localStorage.getItem('Conjecture Name').slice(0, 100) +
            (localStorage.getItem('Conjecture Name').length > 100 ? '...' : '')
          }
          fontWeight={800}
          outlineColor={black}
          callback={nameBoxInput} // Implement Popup
        />
        
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
        y={props.height * 0.13}
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
          height={height * 0.13}
          width={width * 1.05}
          x={width * 0.134}
          y={height * 0.105}
          color={white}
          fontSize={width * 0.014}
          fontColor={black}
          text={
            localStorage.getItem('Conjecture Name').slice(0, 100) +
            (localStorage.getItem('Conjecture Name').length > 100 ? '...' : '')
          }
          fontWeight={800}
          outlineColor={black}
          callback={nameBoxInput} // Implement Popup
        />

        <Text
        text={"AUTHOR:"}
        x={props.width * 0.6}
        y={props.height * 0.13}
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
        y={props.height * 0.52}
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
    const existingPin = localStorage.getItem('PIN');
    let pin = prompt("Please Enter Your PIN", existingPin);

    if (!isNaN(pin) && pin !== null) {
      localStorage.setItem('PIN', pin);
    } else if (pin !== null) {
      alert('PIN must be numeric');
    }
  }

  return (
      <>
      <Text
      text={"PIN:"}
      x={props.width * 0.797}
      y={props.height * 0.13}
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
        y={height * 0.11}
        color={white}
        fontSize={width * 0.015}
        fontColor={black}
        text={
          localStorage.getItem('PIN') || '' // Show existing PIN if available
        }
        fontWeight={800}
        callback={pinBoxInput} // Implement Popup
      />
      </>
  )
}

export const ConjectureBox = (props) => {
  const { height, width } = props;

  // Function to handle conjecture input
  function conjectureBoxInput() {
    const existingConjecture = localStorage.getItem('Conjecture');
    const newConjecture = prompt("Please Enter Your Conjecture", existingConjecture);

    if (newConjecture !== null) {
      localStorage.setItem('Conjecture', newConjecture);
    }
  }

  return (
    <>
      {/* ConjectureBox InputBox */}
      <InputBox
        height={height * 0.30}
        width={width * 2.1645}
        x={width * 0.072}
        y={height * 0.1755}
        color={white}
        fontSize={width * 0.015}
        fontColor={black}
        text={
          localStorage.getItem('Conjecture')?.slice(0, 200) +
          (localStorage.getItem('Conjecture')?.length > 200 ? '...' : '')
        }
        fontWeight={800}
        callback={conjectureBoxInput} // Implement Popup for conjecture input
      />
    </>
  )
}

export const KeywordsBox = (props) => {
  const { height, width } = props;

  // Function to handle keywords input
  function keywordsBoxInput() {
    const existingKeywords = localStorage.getItem('Keywords');
    const newKeywords = prompt("Please Enter Keywords (comma-separated)", existingKeywords);

    if (newKeywords !== null) {
      localStorage.setItem('Keywords', newKeywords);
    }
  }

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
        y={height * 0.301}
        color={white}
        fontSize={width * 0.015}
        fontColor={black}
        text={
          localStorage.getItem('Keywords')?.slice(0, 100) +
          (localStorage.getItem('Keywords')?.length > 100 ? '...' : '')
        }
        fontWeight={800}
        outlineColor={black}
        callback={keywordsBoxInput} // Implement Popup for keywords input
      />
    </>
  )
}