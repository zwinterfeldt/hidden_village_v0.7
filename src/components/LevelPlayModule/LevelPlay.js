import { useMachine } from "@xstate/react";
import { useCallback, useState, useEffect } from "react";
import ExperimentalTask from "../ExperimentalTask";
import {red, white} from "../../utils/colors"
import LevelPlayMachine from "./LevelPlayMachine";
import ConjecturePoseContainter from "../TestConjectureModule/ConjecturePoseContainer"
import Button from "../Button";
import CursorMode from "../CursorMode";
import { getConjectureDataByUUID } from "../../firebase/database";

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
    backCallback
  } = props;
  const [state, send] = useMachine(LevelPlayMachine);
  const [experimentText, setExperimentText] = useState(
    `Read the following aloud:\n\nFigure it out? \n\n Answer TRUE or FALSE?`
  );
  const [conjectureData, setConjectureData] = useState(null);
  const [poses, setPoses] = useState(null);

  const getTolerance = (poseData) => {  
    const tolerance = poseData['tolerance'] || null;
    if (tolerance != null){
      return parseInt(tolerance.replace('%', ''));
    }
    return null;
  }
  useEffect(() => {
    if(UUID != null){
      const fetchData = async () => {
        try {
          const data = await getConjectureDataByUUID(UUID);
          setConjectureData(data);
        } catch (error) {
          console.error('Error getting data: ', error);
        }
      };
      fetchData();
    }
}, []);

useEffect(() => {
  console.log("conjectureData:", conjectureData);
  if (conjectureData != null) {
    const startPose = JSON.parse(conjectureData[UUID]['Start Pose']['poseData']);
    const intermediatePose = JSON.parse(conjectureData[UUID]['Intermediate Pose']['poseData']);
    const endPose = JSON.parse(conjectureData[UUID]['End Pose']['poseData']);

    const startTolerance = getTolerance(conjectureData[UUID]['Start Pose']);
    const intermediateTolerance = getTolerance(conjectureData[UUID]['Intermediate Pose']);
    const endTolerance = getTolerance(conjectureData[UUID]['End Pose']);

    startPose["tolerance"] = startTolerance;
    intermediatePose["tolerance"] = intermediateTolerance;
    endPose["tolerance"] = endTolerance;

    const arr = [startPose, intermediatePose, endPose];
    setPoses(arr);
  }

}
, [conjectureData]);

  useEffect(() => {
    if (state.value === "intuition") {
      setExperimentText(
        `Read the following ALOUD:\n\n${conjectureData[UUID]['Text Boxes']['Conjecture Description']}\n\n Answer: TRUE or FALSE?`
      );
    } else if (state.value === "insight") {
      setExperimentText(
        `Alright! Explain WHY :\n\n${conjectureData[UUID]['Text Boxes']['Conjecture Description']}\n\n is TRUE or FALSE?`
      );
    }
  }, [state.value]);

  useEffect(() => {
    console.log("UUID prop changed:", UUID);
    console.log(UUID);
}, [UUID]);

  return (
    <>
      {state.value === "poseMatching" && poses != null && (
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
            poses={poses}
          />
        </>
      )}
      {state.value === "intuition" && (
         <ExperimentalTask
         width={width}
         heigh={height}
          prompt={experimentText}
          columnDimensions={columnDimensions}
          poseData={poseData}
          rowDimensions={rowDimensions}
          onComplete={() => send("NEXT")}
          cursorTimer={debugMode ? 1_000 : 10_000}
        /> )}
        {state.value === "insight" && (
        <ExperimentalTask
          prompt={experimentText}
          columnDimensions={columnDimensions}
          poseData={poseData}
          rowDimensions={rowDimensions}
          onComplete={onLevelComplete}
          cursorTimer={debugMode ? 1_000 : 30_000}
        />
      )}
    </>
  );
};

export default LevelPlay;
