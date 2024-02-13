import Background from "../Background";
import { Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { orange, black, white } from "../../utils/colors";
import Button from "../Button";
import RectButton from "../RectButton";
import { getConjectureDataByUUID } from "../../firebase/database";

import React, { useState, useEffect } from 'react';
import { Container } from "postcss";
import { PoseBox } from "./PoseDisplayBox";
import { set } from "firebase/database";
import  PoseMatching  from "../PoseMatching";

const getConjectureKeyByConjectureData = (conjectureData) => {
  try {
      let conjectureKey;
      for (const key in conjectureData) {
          if (key.startsWith('Conjecture')) {
              conjectureKey = key;
              break;
          }
      }
      console.log(conjectureKey);

      return conjectureKey;
  } catch (error) {
      throw error;
  }
};  

const ConjecturePoseMatch = (props) => {
  const { height, width, columnDimensions, rowDimensions, editCallback, mainCallback, poseData,UUID } = props;
  const [conjectureData, setConjectureData] = useState(null);
  const [conjectureKey, setConjectureKey] = useState(null);
  const [poses, setPoses] = useState(null);

  const getTolerance = (poseData) => {  
    const tolerance = poseData['tolerance'] || null;
    if (tolerance != null){
      return parseInt(tolerance.replace('%', ''));
    }
    return null;
  }
  useEffect(() => {
    const fetchData = async () => {
    try {
      const data = await getConjectureDataByUUID(UUID);
      const key = getConjectureKeyByConjectureData(data);
      setConjectureData(data);
      setConjectureKey(key);
    } catch (error) {
      console.error('Error getting data: ', error);
      // Handle the error appropriately
    }
    };

    fetchData();
}, []);

useEffect(() => {
  if (conjectureData != null && conjectureKey != null) {
    const startPose = JSON.parse(conjectureData[conjectureKey]['Start Pose']['poseData']);
    const intermediatePose = JSON.parse(conjectureData[conjectureKey]['Intermediate Pose']['poseData']);
    const endPose = JSON.parse(conjectureData[conjectureKey]['End Pose']['poseData']);

    const startTolerance = getTolerance(conjectureData[conjectureKey]['Start Pose']);
    const intermediateTolerance = getTolerance(conjectureData[conjectureKey]['Intermediate Pose']);
    const endTolerance = getTolerance(conjectureData[conjectureKey]['End Pose']);

    startPose["tolerance"] = startTolerance;
    intermediatePose["tolerance"] = intermediateTolerance;
    endPose["tolerance"] = endTolerance;

    const arr = [startPose, intermediatePose, endPose];
    setPoses(arr);
  }

}
, [conjectureData, conjectureKey]);

return(
  <>
      < Background height={height * 1.1} width={width} />
      {/* )} */}
      {poses != null && (
          <PoseMatching
          poseData={poseData}
          posesToMatch={[
            poses,
            poses,
            poses
          ].flat()}
          columnDimensions={columnDimensions}
          onComplete={() => send("NEXT")}
        />
      )}
      {/* Back Button */}
      <RectButton
          height={height * 0.13}
          width={width * 0.26}
          x={width * 0.15}
          y={height * 0.93}
          color={black}
          fontSize={width * 0.015}
          fontColor={white}
          text={"Back Button"}
          fontWeight={800}
          callback={mainCallback}
      />

      

  </>
  );



};

export default ConjecturePoseMatch;