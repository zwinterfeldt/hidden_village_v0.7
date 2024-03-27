import Background from "../Background";
import { Graphics, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { orange, black, white, darkGray, yellow } from "../../utils/colors";
import Button from "../Button";
import RectButton from "../RectButton";
import { getConjectureDataByUUID } from "../../firebase/database";
import { useCallback } from "react";
import React, { useState, useEffect } from 'react';
import { Container } from "postcss";
import { PoseBox } from "./PoseDisplayBox";
import { set } from "firebase/database";
import  PoseMatching  from "../PoseMatching";

const ConjecturePoseMatch = (props) => {
  const { height, width, columnDimensions, rowDimensions, editCallback, mainCallback, poseData,UUID } = props;
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
    const fetchData = async () => {
    try {
      const data = await getConjectureDataByUUID(UUID);
      setConjectureData(data);
    } catch (error) {
      console.error('Error getting data: ', error);
      // Handle the error appropriately
    }
    };
    

    fetchData();
}, []);

useEffect(() => {
  console.log(conjectureData)
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

return(
  <>
      
      
      {/* )} */}
      {poses != null && (
        <>
          
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
        </>
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