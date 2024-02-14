import React, { useState, useEffect } from 'react';
import Background from "../Background";
import { blue, white, red, green } from "../../utils/colors";
import Button from "../Button";
import RectButton from "../RectButton";
import { getConjectureList } from "../../firebase/database";
import { ConjectureSelectorBoxes } from "./ConjectureSelectorModuleBoxes";
import { useMachine } from "@xstate/react";
import { CurricularContentEditorMachine } from "../../machines/curricularEditorMachine";


function ConjectureList() {
  const [conjectureList, setConjectureList] = useState([]);

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

  return (conjectureList);
}

function drawConjectureList(xMultiplier, yMultiplier, fontSizeMultiplier, totalWidth, totalHeight, conjectureCallback) {
  const conjectureList = ConjectureList();

  return (
    <>
      {conjectureList.map((conjecture, index) => (
        <RectButton
          key={index}
          height={totalHeight /2 * yMultiplier}
          width={totalWidth * 2}
          x={totalWidth * xMultiplier}
          y={totalHeight * index * 4 * fontSizeMultiplier + totalHeight * yMultiplier}
          color={white}
          fontSize={totalWidth * fontSizeMultiplier}
          fontColor={blue}
          text={"Conjecture: " + conjecture["Text Boxes"]["Conjecture Name"]}
          fontWeight="bold"
          callback = {conjectureCallback}
        />
      ))}
    </>
  );
}

const CurricularModule = (props) => {
  const { height, width, conjectureCallback, curricularCallback} = props;
  const [state, send] = useMachine(CurricularContentEditorMachine);

  return (
    <>
      <Background height={height * 1.1} width={width} />
      <Button
        height={height * 0.12}
        width={width * 0.095}
        x={width * 0.06}
        y={height * 0.90}
        color={red}
        fontSize={width * 0.015}
        fontColor={white}
        text={"BACK"}
        fontWeight={800}
        callback={curricularCallback} // Exit Back To Home
      />
      <ConjectureSelectorBoxes height={height} width={width} />
      {drawConjectureList(0.15, 0.3, 0.018, width, height, conjectureCallback)}
    </>
  );
};


export default CurricularModule;