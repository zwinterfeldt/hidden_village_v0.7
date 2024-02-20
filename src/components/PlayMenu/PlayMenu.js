import { useEffect, useState } from "react";
import Background from "../Background"
import { set } from "js-cookie";
import Button from "../Button";
import { blue, yellow } from "../../utils/colors";
import RectButton from "../RectButton";

const PlayMenu = (props) => {
    const {width, height, poseData, columnDimensions, rowDimensions} = props;
    const [buttonList, setButtonList] = useState([{text: "Play", callback: () => console.log("Play")}, {text: "Settings", callback: () => console.log("Settings")}]);
    const [userRole, setUserRole] = useState("Student");
    const [distanceBetweenButtons, setDistanceBetweenButtons] = useState();
    const [startingX, setStartingX] = useState();
    const[multiplier, setMultiplier] = useState(1);
    

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
                {text: "New Level", callback: () => console.log("New Level")},
                {text: "Edit Level", callback: () => console.log("Edit Level")},
                {text: "Settings", callback: () => console.log("Settings")},
            ])
        }
    }, [userRole]);

    return (
        <>
        <Background height={height} width= {width}/>
        {distanceBetweenButtons !== undefined && buttonList.map((button, idx) => (
            <Button
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
        </>
    );
};

export default PlayMenu;