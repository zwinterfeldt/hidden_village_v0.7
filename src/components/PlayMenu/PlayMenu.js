import { useEffect, useState } from "react";
import Background from "../Background"
import { set } from "js-cookie";
import Button from "../Button";
import { blue, yellow } from "../../utils/colors";
import RectButton from "../RectButton";
import { send } from "xstate";
import { sendTo } from "xstate/lib/actions";
import { useMachine } from "@xstate/react";
import {PlayMenuMachine} from "./PlayMenuMachine";
import ConjecutureModule from "../ConjectureModule/ConjectureModule";

const PlayMenu = (props) => {
    const {width, height, poseData, columnDimensions, rowDimensions} = props;
    const [buttonList, setButtonList] = useState([{text: "Play", callback: () => console.log("Play")}, {text: "Settings", callback: () => console.log("Settings")}]);
    const [userRole, setUserRole] = useState("Student");
    const [distanceBetweenButtons, setDistanceBetweenButtons] = useState();
    const [startingX, setStartingX] = useState();
    const[multiplier, setMultiplier] = useState(1);
    const[state, send] = useMachine(PlayMenuMachine);
    

    useEffect(() => {
        // Calculate the distance for buttons
        const totalAvailableWidth = width * 0.85 * (buttonList.length/7);
        const startingX = (width * 0.5) - (totalAvailableWidth * 0.5);
        setStartingX(startingX);
        const spaceInBetween = totalAvailableWidth / (buttonList.length-1);
        setDistanceBetweenButtons(spaceInBetween);
        const totalArea = width * height;
        setMultiplier(totalArea/765440);

    }, [buttonList, width, height]);
    
    useEffect(() => {
        //get user role
        if(true){ //userRole === "Teacher" || userRole === "Admin" || userRole === "Developer"
            setButtonList([
                {text: "Admin", callback: () => console.log("Admin")},
                {text: "New Game", callback: () => console.log("New Game")},
                {text: "Edit Game", callback: () => console.log("Edit Game")},
                {text: "Play", callback: () => console.log("Play")},
                {text: "New Level", callback: () => send("NEWLEVEL")},
                {text: "Edit Level", callback: () => console.log("Edit Level")},
                {text: "Settings", callback: () => console.log("Settings")},
            ])
        }
    }, [userRole]);

    return (
        <>
        <Background height={height} width= {width}/>
        {state.value === "ready" && buttonList.map((button, idx) => (
            <Button
                fontColor={yellow}
                key = {idx}
                width = {width * 0.145*multiplier}
                color = {blue}
                fontSize = {40*multiplier}
                fontWeight = {600}
                text={button.text}
                x={startingX + (idx * distanceBetweenButtons)}
                y={height * 0.5}
                callback={button.callback}
            />
        ))}
        {state.value === "newLevel" && (
            <ConjecutureModule
                width={width}
                height={height}
                columnDimensions={columnDimensions}
                rowDimensions={rowDimensions}
                editCallback={() => send("AUTHOR")}
                mainCallback={() => send("HOME")}
            />
        )}
        </>
    );
};

export default PlayMenu;