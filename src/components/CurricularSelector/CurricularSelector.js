import React, { useState, useEffect } from 'react';
import Background from "../Background";
import { blue, white, red, neonGreen,green, black } from "../../utils/colors";
import RectButton from "../RectButton";
import { getCurricularList } from "../../firebase/database";
import { CurricularSelectorBoxes } from "./CurricularSelectorModuleBoxes";
import { useMachine } from "@xstate/react";
import { CurricularContentEditorMachine } from "../../machines/curricularEditorMachine";
import {Curriculum} from "../CurricularModule/CurricularModule";
import { getConjectureDataByUUID } from "../../firebase/database";

export function handlePIN(curricular, message = "Please Enter the PIN."){ // this function is meant to be used as an if statement (ex: if(handlePIN){...} )
  const existingPIN = curricular["PIN"];
  const enteredPIN = prompt(message);

  if(existingPIN == "" || enteredPIN == existingPIN){ // PIN is successful
    return true;
  }
  else if(enteredPIN != null && enteredPIN != ""){ // recursively try to have the user enter a PIN when it is incorrect
    return handlePIN(curricular, message = "Incorrect PIN, please try again.");
  }
  return false; // do nothing if cancel is clicked
}

const CurricularSelectModule = (props) => {
  
  const { height, width, conjectureCallback, backCallback, curricularCallback} = props;
  const [curricularList, setCurricularList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [state, send] = useMachine(CurricularContentEditorMachine);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCurricularList();
        setCurricularList(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //use to get a fixed number of conjectures per page and to navigate between the pages
  const curricularPerPage = 7;
  const totalPages = Math.ceil(curricularList.length / curricularPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // use to determine the subset of conjectures to display based on the current page
  const startIndex = currentPage * curricularPerPage;
  const currentCurriculars = curricularList.slice(startIndex, startIndex + curricularPerPage);

  // draw the buttons that show the author name, name of conjecture, and keywords, and the add conjecture button
  const drawCurricularList = (xMultiplier, yMultiplier, fontSizeMultiplier, totalWidth, totalHeight) => {
    return (
      <>
        {currentCurriculars.map((curricular, index) => (
          <RectButton
            key={index}
            height={totalHeight /2 * yMultiplier}
            width={totalWidth * 0.8}
            x={totalWidth * (xMultiplier-0.08)}
            y={totalHeight * index * 4 * fontSizeMultiplier + totalHeight * yMultiplier * 0.75}
            color={white}
            fontSize={totalWidth * fontSizeMultiplier/1.3}
            fontColor={blue}
            text={curricular}
            fontWeight="bold"
            callback = {() => {
            //   if(handlePIN(conjecture)){
            //     currentConjecture.setConjecture(conjecture);
            //     conjectureCallback(conjecture);
            //   }
            console.log(curricular);
            }}
          />
        ))}

        {/* {currentCurriculars.map((conjecture, index) => (
          <RectButton
            key={'author' + index}
            height={totalHeight / 2 * yMultiplier}
            width={totalWidth * 0.6}
            x={totalWidth * (xMultiplier + 0.25)}
            y={totalHeight * index * 4 * fontSizeMultiplier + totalHeight * yMultiplier * 0.75}
            color={white}
            fontSize={totalWidth * fontSizeMultiplier / 1.3} 
            fontColor={blue}
            text={conjecture["Text Boxes"]["Conjecture Name"]}
            fontWeight="bold"
            callback = {() => {
              if(handlePIN(conjecture)){
                currentConjecture.setConjecture(conjecture);
                conjectureCallback(conjecture);
              }
            }}
          />
        
        ))}

        {currentCurriculars.map((conjecture, index) => (
          <RectButton
            key={'keywords' + index}
            height={totalHeight / 2 * yMultiplier}
            width={totalWidth * 0.8}
            x={totalWidth * (xMultiplier +0.5)} 
            y={totalHeight * index * 4 * fontSizeMultiplier + totalHeight * yMultiplier * 0.75} 
            color={white}
            fontSize={totalWidth * fontSizeMultiplier / 1.3}
            fontColor={blue}
            text={conjecture["Text Boxes"]["Conjecture Keywords"]}
            fontWeight="bold"
            callback = {() => {
              if(handlePIN(conjecture)){
                currentConjecture.setConjecture(conjecture);
                conjectureCallback(conjecture);
              }
            }}
          />
        ))} */}

        {/* only show these in the curricular editor (disabled when just editing conjecture) */}
        {/* {conjectureSelect ? (
          currentCurriculars.map((conjecture, index) => (
            <RectButton
              key={index}
              height={0.01}
              width={0.01}
              x={totalWidth * xMultiplier - totalWidth * xMultiplier *0.7}
              y={totalHeight * index * 4 * fontSizeMultiplier + totalHeight * yMultiplier - totalHeight * yMultiplier *0.15 }
              color={white}
              fontSize={totalWidth * fontSizeMultiplier * 2}
              fontColor={neonGreen}
              text={"+"}
              fontWeight="bold"
              callback = {() => {
                  Curriculum.addConjecture(conjecture);
                  curricularCallback();
              }}
            />
          )))
          // show whether the conjectures are drafts or finals in the level editor
          :(currentCurriculars.map((conjecture, index) => (
            <RectButton
              key={index}
              height={totalHeight / 2 * yMultiplier}
              width={totalWidth * (xMultiplier * 0.85 )}
              x={totalWidth * xMultiplier - totalWidth * xMultiplier * 0.95}
              y={totalHeight * index * 4 * fontSizeMultiplier + totalHeight * yMultiplier * 0.75 }
              color={white}
              fontSize={totalWidth * fontSizeMultiplier / 1.3}
              fontColor={blue}
              text={conjecture["isFinal"] ? "X" : " "}
              fontWeight="bold"
              callback = {() => {
                if(handlePIN(conjecture)){
                  currentConjecture.setConjecture(conjecture);
                  conjectureCallback(conjecture);
                }
              }}
            />
          ))
            
          )  
        } */}
      </>
    );
  };

  return (
    <>
      <Background height={height * 1.1} width={width} />

      <RectButton
        height={height * 0.13}
        width={width * 0.26}
        x={width * 0.15}
        y={height * 0.93}
        color={blue}
        fontSize={width * 0.014}
        fontColor={white}
        text={"PREVIOUS"}
        fontWeight={800}
        callback={prevPage}
      />

      <RectButton
        height={height * 0.13}
        width={width * 0.26}
        x={width * 0.56}
        y={height * 0.93}
        color={blue}
        fontSize={width * 0.014}
        fontColor={white}
        text={"NEXT"}
        fontWeight={800}
        callback={nextPage}
      />

      <RectButton
        height={height * 0.13}
        width={width * 0.26}
        x={width * 0.80}
        y={height * 0.93}
        color={red}
        fontSize={width * 0.015}
        fontColor={white}
        text={"BACK"}
        fontWeight={800}
        callback={backCallback}
      />
      <RectButton
        height={height * 0.13}
        width={width * 0.26}
        x={width * 0.68}
        y={height * 0.93}
        color={green}
        fontSize={width * 0.014}
        fontColor={white}
        text={"OK"}
        fontWeight={800}
        callback={null}
      />

      <CurricularSelectorBoxes height={height} width={width} />
      {drawCurricularList(0.15, 0.3, 0.018, width, height, conjectureCallback, backCallback, curricularCallback)}
    </>
  );
};


export default CurricularSelectModule; 