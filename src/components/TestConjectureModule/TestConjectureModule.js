// USED FOR TESTING THE CONJECTURES THAT WE UPLOAD
import Background from "../Background";
import { Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { green, neonGreen, black, blue, white, pink, orange, red, transparent, turquoise } from "../../utils/colors";
import Button from "../Button";
import RectButton from "../RectButton";
import { getConjectureDataByUUID } from "../../firebase/database";

import React, { useState, useEffect } from 'react';
import { Container } from "postcss";
import { PoseBox } from "./PoseDisplayBox";

// import { TestConjectureMachine } from "../../machines/TestConjectureMachine";



export const getPoseDataByConjectureUUID = async (UUID) => {
    try {
        const conjectureData = await getConjectureDataByUUID(UUID);
        let conjectureKey;

        for (const key in conjectureData) {
            if (key.startsWith('Conjecture')) {
                conjectureKey = key;
                break;
            }
        }
        // get the Start Data
        // get the Intermediate Data
        // get the End Data
        // Get the Conjecture Name???




        return conjectureData[conjectureKey]['Start Pose']['poseData'];
    } catch (error) {
        throw error;
    }
};

// HELPER FUNCTION: return the conjecture key
export const getConjectureKeyByConjectureData = (conjectureData) => {
    try {
        let conjectureKey;
        console.log(conjectureData);
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


const TestConjectureModule = (props) => {
    const { height, width, columnDimensions, rowDimensions, editCallback, mainCallback } = props;
    // const [state, send] = useMachine(TestConjectureMachine);
    const [titleText, setTitleText] = useState("Loading");

    const [startPoseData, setStartPoseData] = useState(null); // this will probably error out
    const [intermediatePoseData, setIntermediatePoseData] = useState(null); // this will probably error out
    const [endPoseData, setEndPoseData] = useState(null); // this will probably error out
    const [currentPoseData, setCurrentPoseData] = useState(null); // 

    const [conjectureData, setConjectureData] = useState(null);
    const [conjectureKey, setConjectureKey] = useState(null);

    // helper functions
    const [poseStates, setPoseStates] = useState(["startPose", "intermediatePose", "endPose"]);
    const [currentPoseStateIndex, setCurrentPoseStateIndex] = useState(0);

    const handleNewPoseButtonClick = () => {
        // current pose
        setCurrentPoseStateIndex((prevIndex) => (prevIndex + 1) % poseStates.length);

        // get the enxt pose state. Jankyyyyy
        const nextPoseState = poseStates[currentPoseStateIndex];

        // Update pose to the next one
        if (nextPoseState === "startPose") {
            setCurrentPoseData(startPoseData);
        } else if (nextPoseState === "intermediatePose") {
            setCurrentPoseData(intermediatePoseData);
        } else if (nextPoseState === "endPose") {
            setCurrentPoseData(endPoseData);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
        const UUID = "15ff9cc4-f39d-4db9-be04-bcad5907f876";

        try {
            const data = await getConjectureDataByUUID(UUID);
            const key = getConjectureKeyByConjectureData(data);
            console.log(data)
            console.log(key)
            setConjectureData(data);
            setConjectureKey(key);
        } catch (error) {
            console.error('Error getting data: ', error);
            // Handle the error appropriately
        }
        };

        fetchData();
    }, []); // ONLY RUNS ONCE WHEN THE OBJECT IS ACTIVATED

    useEffect(() => {
        // Updates the title text of the module
        console.log("Updated Conjecture Data:", conjectureData);
        console.log("Updated Conjecture Key:", conjectureKey);
        if (conjectureKey !== null && conjectureData !== null) {
            // update the title text
            const newText = conjectureData[conjectureKey]["Text Boxes"]["Conjecture Name"];
            setTitleText(newText);

            // update the start pose
            const startPose = conjectureData[conjectureKey]["Start Pose"];
            setStartPoseData(startPose);

            const intermediatePose = conjectureData[conjectureKey]["Intermediate Pose"];
            setIntermediatePoseData(intermediatePose);

            const endPose = conjectureData[conjectureKey]["End Pose"];
            setEndPoseData(endPose);

            setCurrentPoseData(endPose)

        }
    }, [conjectureData, conjectureKey]); // runs only when conjectureData and ConjectureKey are updated

    const [currentPose, setCurrentPose] = useState(null);
    const [currentPoseTolerence, setCurrentPoseTolerance] = useState(null);
    const [currentPoseText, setCurrentPoseText] = useState(null); // used for saying what the pose is? Start..
    useEffect(() => {
        // when current pose is updated
        if (currentPoseData != null) {
            setCurrentPose(currentPoseData["poseData"]);
            setCurrentPoseTolerance(currentPoseData["tolerance"]);
            setCurrentPoseText(currentPoseData["state"]);
        }

    }, [currentPoseData]);


    return(
    <>
        < Background height={height * 1.1} width={width} />
        {/* Only render when Conjecture Data and Key are loaded */}
        {currentPose != null && (
            <PoseBox 
                height={height * 0.5} 
                width={width * 0.5} 
                x={5} 
                y={4.6}
                text={currentPoseText}
                pose={currentPose}
                tolerance={currentPoseTolerence}
                similarityScores={null} // for now because we just want to display the image
            />
        )}
        {/* {conjectureData && conjectureKey && ( */}
        <Text
            text={`Conjecture: ${titleText}`}
            x={width * .12}
            y={height * 0.01}
            style={
            new TextStyle({
                align: "center",
                fontFamily: "Futura",
                fontSize: 100,
                fontWeight: 800,
                fill: [orange],
                letterSpacing: -5,
            })
            }
        />
        {/* )} */}

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
        {/* TEST POSE ID RETRIEVAL */}
        <RectButton
            height={height * 0.13}
            width={width * 0.26}
            x={width * 0.35}
            y={height * 0.93}
            color={black}
            fontSize={width * 0.015}
            fontColor={white}
            text={"TEST Pose UUID"}
            fontWeight={800}
            callback={() => {
            const UUID = "15ff9cc4-f39d-4db9-be04-bcad5907f876"; // nates user id
            getPoseDataByConjectureUUID(UUID).then((poseData) => {
                console.log('Pose Data:', poseData);
            }).catch((error) => {
                console.error('Error getting pose data: ', error);
                    }
                );
            }}
        />

        {/* NEXT POSE*/}
        <RectButton
            height={height * 0.13}
            width={width * 0.26}
            x={width * 0.55}
            y={height * 0.93}
            color={black}
            fontSize={width * 0.015}
            fontColor={white}
            text={"NEXT POSE"}
            fontWeight={800}
            callback={() => handleNewPoseButtonClick()}
        />

        

    </>
    );



};

export default TestConjectureModule;