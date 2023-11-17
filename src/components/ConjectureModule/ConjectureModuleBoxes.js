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
      fontWeight={800}
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
  
    return (
      <>
        {createInputBox(220, 0.19, 1.7, 0.134, 0.55, 'Conjecture Name 1', width, height, handleBoxInput)}
        {createInputBox(220, 0.19, 1.7, 0.134, 0.64, 'Conjecture Name 2', width, height, handleBoxInput)}
        {createInputBox(220, 0.19, 1.7, 0.134, 0.73, 'Conjecture Name 3', width, height, handleBoxInput)}
        {createInputBox(220, 0.19, 1.7, 0.134, 0.82, 'Conjecture Name 4', width, height, handleBoxInput)}
        {createInputBox(20, 0.13, 1.05, 0.134, 0.105, 'Name', width, height, handleBoxInput)}
        {/* ... rest of the component ... */}
        {createTextElement("KEYWORDS:", 0.1275, 0.322, 0.018, width, height)}
        {createTextElement("PIN:", 0.797, 0.13, 0.018, width, height)}
        {createTextElement("AUTHOR:", 0.6, 0.13, 0.018, width, height)}
        {createTextElement("CURRENT M-CLIP:", 0.50, 0.37, 0.018, width, height)}
        {createTextElement("MULTIPLE CHOICE", 0.50, 0.52, 0.018, width, height)}
        {createTextElement("Conjecture Editor", 0.5, 0.05, 0.025, width, height)}
        {createTextElement("NAME:", 0.102, 0.13, 0.018, width, height)}

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
          fontFamily: "Arial (Bold)",
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
          localStorage.getItem('Conjecture')?.slice(0, 300) +
          (localStorage.getItem('Conjecture')?.length > 300 ? '...' : '')
        }
        fontWeight={800}
        callback={conjectureBoxInput} // Implement Popup for conjecture input
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

// localStorage.clear();
