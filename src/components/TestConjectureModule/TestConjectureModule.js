// USED FOR TESTING THE CONJECTURES THAT WE UPLOAD
import Background from "../Background";
import { Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { green, neonGreen, black, blue, white, pink, orange, red, transparent, turquoise } from "../../utils/colors";
import Button from "../Button";
import RectButton from "../RectButton";
import { getConjectureDataByUUID } from "../../firebase/database";

import React, { useState, useEffect } from 'react';

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
export const getConjectureKeyByConjectureData = async (conjectureData) => {
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





const TestConjectureModule = (props) => {
    const { height, width, columnDimensions, rowDimensions, editCallback, mainCallback } = props;
    // const [state, send] = useMachine(TestConjectureMachine);

    // const [conjectureData, setConjectureData] = useState(null);
    // const [conjectureKey, setConjectureKey] = useState(null);
    // useEffect(() => {
    //     const fetchData = async () => {
    //     const UUID = "15ff9cc4-f39d-4db9-be04-bcad5907f876";

    //     try {
    //         const data = await getConjectureDataByUUID(UUID);
    //         const key = getConjectureKeyByConjectureData(data);

    //         setConjectureData(data);
    //         setConjectureKey(key);
    //     } catch (error) {
    //         console.error('Error getting data: ', error);
    //         // Handle the error appropriately
    //     }
    //     };

    //     fetchData();
    // }, []); // ONLY RUNS ONCE WHEN THE OBJECT IS ACTIVATED??? That would have been nice to know about 3 hours ago: Okay but it Actually FREKIN RUNNS Multiple times...



    return(
    <>
        {/* Only render when Conjecture Data and Key are loaded */}
        {conjectureData && conjectureKey && (
        <Text
            // text={conjectureData[conjectureKey]["Text Boxes"]["Conjecture Name"]}
            text = "cheese"
            x={width * 0.5}
            y={height * 0.25}
            style={
            new TextStyle({
                align: "center",
                fontFamily: "Futura",
                fontSize: 146,
                fontWeight: 800,
                fill: [blue],
                letterSpacing: -5,
            })
            }
        />
        )}

        < Background height={height * 1.1} width={width} />

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

    </>
    );



};

export default TestConjectureModule;