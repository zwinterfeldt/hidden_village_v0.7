import Button from "../Button";
import PlayGameMachine from "./PlayGameMachine";
import { green, neonGreen, black, blue, white, pink, orange, red, transparent, turquoise } from "../../utils/colors";

import { useMachine, useSelector } from "@xstate/react";
import { useEffect, useState } from "react";
import ConjecturePoseContainer from "../TestConjectureModule/ConjecturePoseContainer";
import LevelPlay from "../LevelPlayModule/LevelPlay";

const PlayGame = (props) => {
    const uuidsTest = ["73aa54b9-5b60-4ab5-afad-d35c11ca5982", "cff8ccca-7479-4611-ae0c-2b7c14e83e93"]
    const { columnDimensions, rowDimensions, poseData, height, width, backCallback } = props;
    const [uuidIDX, setuuidIDX] = useState(0);
    const [state, send] = useMachine(PlayGameMachine, {
        context: {
            uuids: uuidsTest
        }
    });
    useEffect(() => {
        console.log("uuidIDX changed:", uuidIDX);
    }, [uuidIDX]);

    useEffect(() => {
        setuuidIDX(state.context.uuidIndex)
    }, [state.context.uuidIndex]
    )

    return(
        <>
        {state.value === "idle" && (
        <LevelPlay
            key={uuidsTest[uuidIDX]}
            width={width}
            height={height}
            columnDimensions={columnDimensions}
            rowDimensions={rowDimensions}
            poseData={poseData}
            mainCallback={backCallback}
            UUID={uuidsTest[uuidIDX]}
            onLevelComplete={() => {send("LOAD_NEXT"),console.log(state.value),console.log(state.context.uuidIndex)}}
        />)}
        {state.value === "end" && (
        <Button
        width={width * 0.20}
        x={width * 0.5}
        y={height * 0.5}
        color={red}
        fontSize={width * 0.02}
        fontColor={white}
        text={"Back"}
        fontWeight={800}
        callback={backCallback}
        />)}
        </>
    )

}

export default PlayGame