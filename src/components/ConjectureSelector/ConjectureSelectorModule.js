import React, { useState, useEffect } from 'react';
import Background from "../Background";
import { blue, white, red, neonGreen,green } from "../../utils/colors";
import RectButton from "../RectButton";
import { getConjectureList } from "../../firebase/database";
import { ConjectureSelectorBoxes } from "./ConjectureSelectorModuleBoxes";
import { useMachine } from "@xstate/react";
import { CurricularContentEditorMachine } from "../../machines/curricularEditorMachine";
import {Curriculum} from "../CurricularModule/CurricularModule";
import {currentConjecture} from "../ConjectureModule/ConjectureModule"



const CurricularModule = (props) => {
  
  const { height, width, conjectureCallback, curricularCallback} = props;
  const [conjectureList, setConjectureList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);


  const [state, send] = useMachine(CurricularContentEditorMachine);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getConjectureList();
        setConjectureList(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //use to get a fixed number of conjectures per page and to navigate between the pages
  const conjecturesPerPage = 7;
  const totalPages = Math.ceil(conjectureList.length / conjecturesPerPage);

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
  const startIndex = currentPage * conjecturesPerPage;
  const currentConjectures = conjectureList.slice(startIndex, startIndex + conjecturesPerPage);

  const drawConjectureList = (xMultiplier, yMultiplier, fontSizeMultiplier, totalWidth, totalHeight) => {
    return (
      <>
        {currentConjectures.map((conjecture, index) => (
          <RectButton
            key={index}
            height={totalHeight /2 * yMultiplier}
            width={totalWidth * 0.8}
            x={totalWidth * (xMultiplier-0.08)}
            y={totalHeight * index * 4 * fontSizeMultiplier + totalHeight * yMultiplier}
            color={white}
            fontSize={totalWidth * fontSizeMultiplier/1.3}
            fontColor={blue}
            text={conjecture["Text Boxes"]["Author Name"]}
            fontWeight="bold"
            callback = {() => {
              currentConjecture.setConjecture(conjecture);
              conjectureCallback(conjecture);
            }}
          />
        ))}

        {currentConjectures.map((conjecture, index) => (
          <RectButton
            key={'author' + index}
            height={totalHeight / 2 * yMultiplier}
            width={totalWidth * 0.6}
            x={totalWidth * (xMultiplier + 0.25)}
            y={totalHeight * index * 4 * fontSizeMultiplier + totalHeight * yMultiplier}
            color={white}
            fontSize={totalWidth * fontSizeMultiplier / 1.3} 
            fontColor={blue}
            text={conjecture["Text Boxes"]["Conjecture Name"]}
            fontWeight="bold"
            callback = {() => {
              currentConjecture.setConjecture(conjecture);
              conjectureCallback(conjecture);
            }}
          />
        
        ))}

        {currentConjectures.map((conjecture, index) => (
          <RectButton
            key={'keywords' + index}
            height={totalHeight / 2 * yMultiplier}
            width={totalWidth * 0.8}
            x={totalWidth * (xMultiplier +0.50)} 
            y={totalHeight * index * 4 * fontSizeMultiplier + totalHeight * yMultiplier} 
            color={white}
            fontSize={totalWidth * fontSizeMultiplier / 1.3}
            fontColor={blue}
            text={conjecture["Text Boxes"]["Conjecture Keywords"]}
            fontWeight="bold"
            callback = {() => {
              currentConjecture.setConjecture(conjecture);
              conjectureCallback(conjecture);
            }}
          />
        ))}

        
        {currentConjectures.map((conjecture, index) => (
          <RectButton
            key={index}
            height={0.01}
            width={0.01}
            x={totalWidth * xMultiplier - totalWidth * xMultiplier *0.8}
            y={totalHeight * index * 4 * fontSizeMultiplier + totalHeight * yMultiplier + totalHeight * yMultiplier *0.1 }
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
        ))}
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
        callback={curricularCallback}
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

      <ConjectureSelectorBoxes height={height} width={width} />
      {drawConjectureList(0.15, 0.3, 0.018, width, height, conjectureCallback, curricularCallback)}
    </>
  );
};


export default CurricularModule; 