import Button from "../Button";
import PlayGameMachine from "./PlayGameMachine";
import { green, neonGreen, black, blue, white, pink, orange, red, transparent, turquoise } from "../../utils/colors";

import { useMachine, useSelector } from "@xstate/react";
import { useEffect } from "react";
import ConjecturePoseContainer from "../TestConjectureModule/ConjecturePoseContainer";

const PlayGame = (props) => {
    const uuidsTest = ["cff8ccca-7479-4611-ae0c-2b7c14e83e93"]
    const { columnDimensions, rowDimensions, poseData, height, width, backCallback } = props;
    const [state, send] = useMachine(PlayGameMachine, {
        context: {
            uuids: uuidsTest
        }
    });

    useEffect(() => {
        console.log(state.context.uuidsLength)
    }, []

    )

    return(
        <>
        {state.value === "idle" && (
        <ConjecturePoseContainer
            width={width}
            height={height}
            columnDimensions={columnDimensions}
            rowDimensions={rowDimensions}
            poseData={poseData}
            UUID={uuidsTest[state.context.uuidIndex]}
            onComplete={() => send("LOAD_NEXT")}
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