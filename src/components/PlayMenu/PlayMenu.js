import { useEffect, useState } from "react";
import Background from "../Background"
import { set } from "js-cookie";
import Button from "../Button";
import { blue, yellow } from "../../utils/colors";
import RectButton from "../RectButton";

const PlayMenu = (props) => {
    const {width, height, poseData, columnDimensions, rowDimensions} = props;
    const [buttonList, setButtonList] = useState([{text: "Play", callback: () => console.log("Play")}, {text: "Home", callback: () => console.log("Home")}]);
    const [userRole, setUserRole] = useState("Student");
    const [distanceBetweenButtons, setDistanceBetweenButtons] = useState();
    const [startingX, setStartingX] = useState();

    

    useEffect(() => {
        // Calculate the distance for buttons
        const totalAvailableWidth = width * 0.85 * (buttonList.length/7);
        const startingX = (width * 0.5) - (totalAvailableWidth * 0.5);
        setStartingX(startingX);
        const spaceInBetween = totalAvailableWidth / (buttonList.length-1);
        setDistanceBetweenButtons(spaceInBetween);
    }, [buttonList]);
    
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
                height = {height * 0.2}
                width = {width * 0.13}
                color = {blue}
                fontSize = {50}
                fontWeight = {800}
                text={button.text}
                x={startingX + (idx * distanceBetweenButtons)}
                y={height * 0.5}
                callback={console.log(distanceBetweenButtons)}
            />
        ))}
        </>
    );
};

export default PlayMenu;