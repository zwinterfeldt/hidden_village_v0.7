import { Graphics, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { yellow, blue, green, white, red, black } from "../../utils/colors";
import InputBox from "../InputBox";

function createInputBox(charLimit, scaleFactor, widthMultiplier, xMultiplier, yMultiplier, textKey, totalWidth, totalHeight, callback) {
  const text = localStorage.getItem(textKey)?.slice(0, charLimit) +
               (localStorage.getItem(textKey)?.length > charLimit ? '...' : '');

  const height = totalHeight * scaleFactor;
  const width = totalWidth * widthMultiplier;
  const x = totalWidth * xMultiplier;
  const y = totalHeight * yMultiplier;

  return (
    <InputBox
      height={height}
      width={width}
      x={x}
      y={y}
      color={white}
      fontSize={totalWidth * 0.012}
      fontColor={black}
      text={text}
      fontWeight={500}
      outlineColor={black}
      callback={() => callback(textKey)}
    />
  );
}

export const NameBox = (props) => {
  const { height, width } = props;

  function handleBoxInput(key) {
    const existingValue = localStorage.getItem(key);
    const newValue = prompt(`Please Enter Your Value for ${key}`, existingValue);

    if (newValue !== null) {
      localStorage.setItem(key, newValue);
    }
  }

  // Makes sure that on startup, the checkmark boxes start empty
  function intializeCheckmarkBoxes() {
    startup = true
    if (startup === true) {
      startup = false
      localStorage.setItem("OptionA Checkmark", " ")
      localStorage.setItem("OptionB Checkmark", " ")
      localStorage.setItem("OptionC Checkmark", " ")
      localStorage.setItem("OptionD Checkmark", " ")
    }
  }
  
    return (
      <>
        {/* charLimit, scaleFactor, widthMultiplier, xMultiplier, yMultiplier, textKey, totalWidth, totalHeight, callback*/}
        {createInputBox(220, 0.19, 1.595, 0.134, 0.57, 'Multiple Choice 1', width, height, handleBoxInput)}
        {createInputBox(220, 0.19, 1.595, 0.134, 0.66, 'Multiple Choice 2', width, height, handleBoxInput)}
        {createInputBox(220, 0.19, 1.595, 0.134, 0.75, 'Multiple Choice 3', width, height, handleBoxInput)}
        {createInputBox(220, 0.19, 1.595, 0.134, 0.84, 'Multiple Choice 4', width, height, handleBoxInput)}
        {createInputBox(60, 0.10, 0.54, 0.143+ 0.062, 0.136-.050, 'Conjecture Name', width, height, handleBoxInput)}
        {createInputBox(220, 0.10, .3, 0.46+ 0.062, 0.136-.050, 'Author Name', width, height, handleBoxInput)}
        {createInputBox(220, 0.30, 1.595, 0.134, 0.175-.050, 'Conjecture Description', width, height, handleBoxInput)}
        {createInputBox(220, 0.10, 1.268, 0.203 + 0.062, 0.295-.050, 'Conjecture Keywords', width, height, handleBoxInput)}

        {/* text, xMultiplier, yMultiplier, fontSizeMultiplier, totalWidth, totalHeight */}
        {createTextElement("KEYWORDS:", 0.137+ 0.062, 0.315-0.05, 0.018, width, height)}
        {createTextElement("PIN:", 0.605+ 0.062, 0.155-0.05, 0.018, width, height)}
        {createTextElement("AUTHOR:", 0.41+ 0.062, 0.155-0.05, 0.018, width, height)}
        {createTextElement("CURRENT M-CLIP:", 0.45, 0.305, 0.018, width, height)}
        {createTextElement("MULTIPLE CHOICE", 0.45, 0.55, 0.018, width, height)}
        {createTextElement("Curricular Content Editor", 0.45, 0.05, 0.025, width, height)}
        {createTextElement("NAME:", 0.108+ 0.062, 0.155-0.05, 0.018, width, height)}

        {intializeCheckmarkBoxes()}
        {/* If the user clicks multiple choice button A, then only A is marked and the rest are empty */}
        {props.boxState === "optiona" && (
          localStorage.setItem("OptionA Checkmark", " X"),
          localStorage.setItem("OptionB Checkmark", " "),
          localStorage.setItem("OptionC Checkmark", " "),
          localStorage.setItem("OptionD Checkmark", " ")
        )}
        {/* If the user clicks multiple choice button B, then only B is marked and the rest are empty */}
        {props.boxState === "optionb" && (
          localStorage.setItem("OptionA Checkmark", " "),
          localStorage.setItem("OptionB Checkmark", " X"),
          localStorage.setItem("OptionC Checkmark", " "),
          localStorage.setItem("OptionD Checkmark", " ")
        )}
        {/* If the user clicks multiple choice button C, then only C is marked and the rest are empty */}
        {props.boxState === "optionc" && (
          localStorage.setItem("OptionA Checkmark", " "),
          localStorage.setItem("OptionB Checkmark", " "),
          localStorage.setItem("OptionC Checkmark", " X"),
          localStorage.setItem("OptionD Checkmark", " ")
        )}
        {/* If the user clicks multiple choice button D, then only D is marked and the rest are empty */}
        {props.boxState === "optiond" && (
          localStorage.setItem("OptionA Checkmark", " "),
          localStorage.setItem("OptionB Checkmark", " "),
          localStorage.setItem("OptionC Checkmark", " "),
          localStorage.setItem("OptionD Checkmark", " X")
        )}
      </>
    );
  }

function createTextElement(text, xMultiplier, yMultiplier, fontSizeMultiplier, totalWidth, totalHeight) {
  return (
    <Text
      text={text}
      x={totalWidth * xMultiplier}
      y={totalHeight * yMultiplier}
      style={
        new TextStyle({
          align: "left",
          fontFamily: "Arial",
          fontSize: totalWidth * fontSizeMultiplier,
          fontWeight: 800,
          fill: [blue],
          letterSpacing: 0,
        })
      }
      anchor={0.5}
    />
  );
}

export const YourComponent = (props) => {
  return (
    <>
      {createTextElement("KEYWORDS:", 0.1275, 0.322, 0.018, width, height)}
      {createTextElement("PIN:", 0.797, 0.13, 0.018, width, height)}
      {createTextElement("AUTHOR:", 0.6, 0.13, 0.018, width, height)}
      {createTextElement("CURRENT M-CLIP:", 0.50, 0.37, 0.018, width, height)}
      {createTextElement("MULTIPLE CHOICE", 0.50, 0.52, 0.018, width, height)}
      {createTextElement("Conjecture Editor", 0.5, 0.05, 0.025, width, height)}
      {createTextElement("NAME:", 0.102, 0.13, 0.018, width, height)}
      {/* ... other Text elements ... */}
    </>
  );
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
      {/* PINBox InputBox */}
      <InputBox
        height={height * 0.10}
        width={width * 0.2}
        x={width * 0.6910}
        y={height * 0.085}
        color={white}
        fontSize={width * 0.015}
        fontColor={black}
        text={
          localStorage.getItem('PIN') || ' ' // Show existing PIN if available
        }
        fontWeight={300}
        callback={pinBoxInput} // Create Popup
      />
      </>
  )
}
