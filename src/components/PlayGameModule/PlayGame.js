import Button from "../Button";
import PlayGameMachine from "./PlayGameMachine";
import {white, red} from "../../utils/colors";
import { useMachine} from "@xstate/react";
import { useEffect, useState } from "react";
import LevelPlay from "../LevelPlayModule/LevelPlay";
import { getCurricularDataByUUID } from "../../firebase/database";
import { Curriculum } from "../CurricularModule/CurricularModule";

const PlayGame = (props) => {
    const { columnDimensions, rowDimensions, poseData, height, width, backCallback, gameUUID } = props;
    const uuidsTest = Curriculum.getCurrentConjectures();
    const [uuidIDX, setuuidIDX] = useState(0);
    const [levelsList, setLevelsList] = useState(0);
    const [state, send] = useMachine(PlayGameMachine, {
        context: {
            uuids: uuidsTest
        }
    });
    useEffect(() => {
        console.log("uuidIDX changed:", uuidIDX);
    }, [uuidIDX]);



    useEffect(() => {
        const fetchData = async () => {
        try {
          const data = await getCurricularDataByUUID(gameUUID);
          console.log("data:", data);
          setLevelsList(data[gameUUID]['ConjectureUUIDs']);
        } catch (error) {
          console.error('Error getting data: ', error);
        }
      };
        fetchData();
    }, []);

    useEffect(() => {
        setuuidIDX(state.context.uuidIndex)
    }, [state.context.uuidIndex]
    )

    return(
        <>
        {state.value === "idle" && (
        <LevelPlay
            key={levelsList[uuidIDX]}
            width={width}
            height={height}
            columnDimensions={columnDimensions}
            rowDimensions={rowDimensions}
            poseData={poseData}
            mainCallback={backCallback}
            UUID={levelsList[uuidIDX]}
            onLevelComplete={() => {send("LOAD_NEXT")}}
            needBack={false}
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