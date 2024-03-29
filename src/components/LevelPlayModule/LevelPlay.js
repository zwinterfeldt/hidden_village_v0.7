import { useMachine } from "@xstate/react";
import { useCallback, useState, useEffect } from "react";
import ExperimentalTask from "../ExperimentalTask";
import {red, white} from "../../utils/colors"
import LevelPlayMachine from "./LevelPlayMachine";
import ConjecturePoseContainter from "../TestConjectureModule/ConjecturePoseContainer"
import Button from "../Button";

const LevelPlay = (props) => {
  const {
    columnDimensions,
    poseData,
    rowDimensions,
    debugMode,
    onLevelComplete,
    UUID,
    width,
    height,
    backCallback,
    uuidIDX
  } = props;
  const [state, send] = useMachine(LevelPlayMachine);
  const [experimentText, setExperimentText] = useState(
    `Read the following aloud:\n\nFigure it out? \n\n Answer TRUE or FALSE?`
  );

//   const drawModalBackground = useCallback((g) => {
//     g.beginFill(darkGray, 0.9);
//     g.drawRect(0, 0, window.innerWidth, window.innerHeight);
//     g.endFill();
//     const col1 = columnDimensions(1);
//     g.beginFill(yellow, 1);
//     g.drawRect(col1.x, col1.y, col1.width, col1.height);
//     const col3 = columnDimensions(3);
//     g.drawRect(col3.x, col3.y, col3.width, col3.height);
//     g.endFill();
//   }, []);

  useEffect(() => {
    if (state.value === "intuition") {
      setExperimentText(
        `Read the following ALOUD:\n\nNext\n\n Answer: TRUE or FALSE?`
      );
    } else if (state.value === "insight") {
      setExperimentText(
        `Alright! Explain WHY :\n\n Last step \n\n is TRUE or FALSE?`
      );
    }
    // } else if (state.value === "levelEnd") {
    //     onLevelComplete()
    // }
  }, [state.value]);
  useEffect(() => {
    console.log("UUID prop changed:", UUID);
}, [UUID]);

//   const handleUserKeyPress = useCallback((event) => {
//     const { _, keyCode } = event;
//     // keyCode 78 is n
//     if (keyCode === 78) {
//       send("NEXT");
//     }
//   }, []);

//   useEffect(() => {
//     window.addEventListener("keydown", handleUserKeyPress);
//     return () => {
//       window.removeEventListener("keydown", handleUserKeyPress);
//     };
//   }, [handleUserKeyPress]);

  return (
    <>
      {state.value === "poseMatching" && (
        <>
          <ConjecturePoseContainter
            width={width}
            height={height}
            columnDimensions={columnDimensions}
            rowDimensions={rowDimensions}
            poseData={poseData}
            mainCallback={backCallback}
            UUID={UUID}
            onCompleteCallback={() => {send("NEXT")}}
          />
        </>
      )}
      {state.value === "intuition" && (
        <Button
        width={width * 0.20}
        x={width * 0.5}
        y={height * 0.5}
        color={red}
        fontSize={width * 0.02}
        fontColor={white}
        text={"NEXT"}
        fontWeight={800}
        callback={() => send("NEXT")}
        />)}
        {/* // <ExperimentalTask
        //   prompt={experimentText}
        //   columnDimensions={columnDimensions}
        //   poseData={poseData}
        //   rowDimensions={rowDimensions}
        //   onComplete={() => send("NEXT")}
        //   cursorTimer={debugMode ? 1_000 : 10_000}
        // /> */}
      {state.value === "insight" && (
        <Button
        width={width * 0.20}
        x={width * 0.5}
        y={height * 0.5}
        color={red}
        fontSize={width * 0.02}
        fontColor={white}
        text={"END"}
        fontWeight={800}
        callback={onLevelComplete}
        />)}
        {/* <ExperimentalTask
          prompt={experimentText}
          columnDimensions={columnDimensions}
          poseData={poseData}
          rowDimensions={rowDimensions}
          onComplete={onLevelComplete}
          cursorTimer={debugMode ? 1_000 : 30_000}
        />
      )} */}
    </>
  );
};

export default LevelPlay;
