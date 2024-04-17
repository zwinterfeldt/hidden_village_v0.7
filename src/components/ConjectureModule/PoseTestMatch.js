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
import { set } from "firebase/database";
import  PoseMatching  from "../PoseMatching";


const PoseTestMatch = (props) => {
  const { height, width, columnDimensions, conjectureCallback, poseData} = props;
  const [poses, setPoses] = useState(null);

  useEffect(() => {
    startPose = JSON.parse(localStorage.getItem("start.json"))
    intermediatePose = JSON.parse(localStorage.getItem("intermediate.json"))
    endPose = JSON.parse(localStorage.getItem("end.json"))
    startTolerance = parseInt(localStorage.getItem("Start Tolerance"))
    intermediateTolerance = parseInt(localStorage.getItem("Intermediate Tolerance"))
    endTolerance = parseInt(localStorage.getItem("End Tolerance"))
    startPose["tolerance"] = startTolerance
    intermediatePose["tolerance"] = intermediateTolerance;
    endPose["tolerance"] = endTolerance;
    
    console.log(startPose, intermediatePose, endPose)
    setPoses([startPose, intermediatePose, endPose])
}, []);

return(
  <> 
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
          callback={conjectureCallback}
      />

      

  </>
  );



};

export default PoseTestMatch;