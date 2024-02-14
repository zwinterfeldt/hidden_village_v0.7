import React, { useState, useEffect } from 'react';
import { Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { white, black, red, blue } from "../../utils/colors";
import InputBox from "../InputBox";
import { getConjectureList,getConjectureDataByAuthorID } from "../../firebase/database";


// Handler functions
function handleCurricularName(key) {
  const existingValue = localStorage.getItem(key);
  const newValue = prompt("Please name your curricular content:", existingValue);
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
  const newValue = prompt("Please create an AuthorId:", existingValue);
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
          fill: [black],
        })
      }
    />
  );
}

// function fetchConjectures(){
//     const [result, setResult] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             setResult = await getConjectureList();
//             // setTextValue(result[index]["Text Boxes"]["Conjecture Name"]);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
    
//         fetchData();
//       }, []);

//       return result;
// }

// function oneConjectureName(xMultiplier, yMultiplier, fontSizeMultiplier, totalWidth, totalHeight, index = 2) {
// //   const [textValue, setTextValue] = useState(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const result = await getConjectureList();
// //         setTextValue(result[index]["Text Boxes"]["Conjecture Name"]);
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //       }
// //     };

// //     fetchData();
// //   }, []);

//   conjectures = fetchConjectures();
//   textValue = conjectures[index]["Text Boxes"]["Conjecture Name"];

//   return (
//     <Text
//       key={textValue}
//       text={textValue}
//       x={totalWidth * xMultiplier}
//       y={totalHeight * yMultiplier}
//       style={
//         new TextStyle({
//           align: "left",
//           fontFamily: "Arial",
//           fontSize: totalWidth * fontSizeMultiplier,
//           fontWeight: "bold",
//           fill: [black],
//         })
//       }
//     />
//   );
// }

// function ConjectureList() {
//     const [conjectureList, setConjectureList] = useState([]);
  
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const result = await getConjectureList();
//           setConjectureList(result);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       };
  
//       fetchData();
//     }, []);
  
//     return (conjectureList);
//   }

  // function drawConjectureList(xMultiplier, yMultiplier, fontSizeMultiplier, totalWidth, totalHeight){
  //   const conjectureList = ConjectureList(xMultiplier, yMultiplier, fontSizeMultiplier, totalWidth, totalHeight);
  //   return (
  //     <>
  //       {conjectureList.map((conjecture, index) => (
  //         <Text
  //           key={index}
  //           text={"Conjecture: "+conjecture["Text Boxes"]["Conjecture Name"]}
  //           x={totalWidth * xMultiplier}
  //           y={totalHeight * index * 4 * fontSizeMultiplier + totalHeight * yMultiplier}
  //           style={
  //             new TextStyle({
  //               align: "left",
  //               fontFamily: "Arial",
  //               fontSize: totalWidth * fontSizeMultiplier,
  //               fontWeight: "bold",
  //               fill: [black],
  //             })
  //           }
  //         />
  //       ))}
  //       {}
  //     </>
  //   );
  // }
  
  // function drawConjectureList(xMultiplier, yMultiplier, fontSizeMultiplier, totalWidth, totalHeight) {
  //   const conjectureList = ConjectureList();
  
  //   // const handleConjectureClick = (index) => {
  //   //   // Implement logic based on the clicked conjecture, using the index or any other information
  //   //   console.log("Conjecture at index ${index} clicked!");
  //   // };
  
  //   return (
  //     <>
  //       {conjectureList.map((conjecture, index) => (
  //         <RectButton
  //           key={index}
  //           height={totalHeight /2 * yMultiplier}
  //           width={totalWidth * 2}
  //           x={totalWidth * xMultiplier}
  //           y={totalHeight * index * 4 * fontSizeMultiplier + totalHeight * yMultiplier}
  //           color={white}
  //           fontSize={totalWidth * fontSizeMultiplier}
  //           fontColor={blue}
  //           text={"Conjecture: " +conjecture["Text Boxes"]["Conjecture Name"]}
  //           fontWeight="bold"
  //           // onClick={() => handleConjectureClick(index)}
  //           callback={() => conjectureSelectedCallback(conjecture["Text Boxes"]["Conjecture Name"])}
  //         />
  //       ))}
  //     </>
  //   );
  // }


export const ConjectureSelectorBoxes = (props) => {
  const { height, width } = props;

  return (
    <>
      {createInputBox(60, 0.10, 0.55, 0.123+ 0.13, 0.136-.030, 'CurricularName', width, height, handleCurricularName)}
      {createInputBox(220, 0.10, 1.268, 0.303, 0.17, 'CurricularKeywords', width, height, handleCurricularKeywords)}
      {createInputBox(220, 0.10, .3, 0.46+ 0.105, 0.136-.030, 'CurricularAuthorID', width, height, handleCurricularAuthorID)}
      {createInputBox(4, 0.10, .2, 0.730, 0.105, 'CurricularPIN', width, height, handlePinInput)}

      {createTextElement("Conjecture selector", 0.4, 0.030, 0.025, width, height)}
      {createTextElement("Keywords:", 0.195, 0.17, 0.018, width, height)}
      {createTextElement("Pin:", 0.690, 0.105, 0.018, width, height)}
      {createTextElement("AuthorId:", 0.480, 0.105, 0.018, width, height)}
      {createTextElement("CurricularName:",0.110, 0.100, 0.018, width, height)}
      {/* {drawConjectureList(0.15, 0.3, 0.018, width, height)} */}
    </>
  );
};