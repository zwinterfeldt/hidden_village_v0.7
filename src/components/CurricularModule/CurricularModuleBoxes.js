import React, { useState, useEffect } from 'react';
import { Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { white, black } from "../../utils/colors";
import InputBox from "../InputBox";
import { getConjectureList,getConjectureDataByAuthorID } from "../../firebase/database";
import { blue } from "../../utils/colors";

// Handler functions
function handleCurricularName(key) {
  const existingValue = localStorage.getItem(key);
  const newValue = prompt("Please name your Game:", existingValue);
  if (newValue !== null) {
    localStorage.setItem(key, newValue);
  }
}

function handleCurricularKeywords(key) {
  const existingValue = localStorage.getItem(key);
  const newValue = prompt("Keywords make your research easier:", existingValue);
  if (newValue !== null) {
    localStorage.setItem(key, newValue);
  }
}

function handleCurricularAuthorID(key) {
  const existingValue = localStorage.getItem(key);
  const newValue = prompt("Please add an Author name:", existingValue);
  if (newValue !== null) {
    localStorage.setItem(key, newValue);
  }
}

function handlePinInput(key) {
  let pin = prompt("Enter a code PIN", localStorage.getItem(key));
  if (pin && !isNaN(pin)) {
    localStorage.setItem(key, pin);
  } else if (pin !== null) {
    alert("PIN must be numeric.");
  }
}

// Function to create input boxes for curricular content
function createInputBox(charLimit, scaleFactor, widthMultiplier, xMultiplier, yMultiplier, textKey, totalWidth, totalHeight, callback) {
  const text = localStorage.getItem(textKey)?.slice(0, charLimit) +
               (localStorage.getItem(textKey)?.length > charLimit ? '...' : '');

  const height = totalHeight * scaleFactor;
  const width = totalWidth * widthMultiplier;
  const x = totalWidth * xMultiplier;
  const y = totalHeight * yMultiplier;

  return (
    <InputBox
      key={textKey}
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

function createTextElement(text, xMultiplier, yMultiplier, fontSizeMultiplier, totalWidth, totalHeight) {
  return (
    <Text
      key={text}
      text={text}
      x={totalWidth * xMultiplier}
      y={totalHeight * yMultiplier}
      style={
        new TextStyle({
          align: "left",
          fontFamily: "Arial",
          fontSize: totalWidth * fontSizeMultiplier,
          fontWeight: "bold",
          fill: [blue],
        })
      }
    />
  );
}

export const CurricularContentEditor = (props) => {
  const { height, width } = props;

  return (
    <>
      {createInputBox(60, 0.10, 0.55, 0.123+ 0.10, 0.136-.030, 'CurricularName', width, height, handleCurricularName)}
      {createInputBox(180, 0.10, 1, 0.210, 0.17, 'CurricularKeywords', width, height, handleCurricularKeywords)}
      {createInputBox(220, 0.10, .8, 0.46+ 0.09, 0.136-.030, 'CurricularAuthorID', width, height, handleCurricularAuthorID)}
      {createInputBox(4, 0.10, .3, 0.730, 0.175, 'CurricularPIN', width, height, handlePinInput)}

      {createTextElement("Game Editor", 0.43, 0.030, 0.025, width, height)}
      {createTextElement("Keywords:", 0.110, 0.17, 0.018, width, height)}
      {createTextElement("Pin:", 0.690, 0.17, 0.018, width, height)}
      {createTextElement("Author:", 0.480, 0.105, 0.018, width, height)}
      {createTextElement("Game Name:",0.110, 0.100, 0.018, width, height)}
    </>
  );
};