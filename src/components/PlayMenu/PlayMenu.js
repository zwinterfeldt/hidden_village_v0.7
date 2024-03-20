import { useEffect, useState } from "react";
import Background from "../Background"
import { set } from "js-cookie";
import Button from "../Button";
import { blue, yellow, skyBlue, babyBlue, powderBlue, cornflowerBlue, steelBlue, dodgerBlue, royalBlue, navyBlue, midnightBlue } from "../../utils/colors";
import RectButton from "../RectButton";
import { send } from "xstate";
import { sendTo } from "xstate/lib/actions";
import { useMachine } from "@xstate/react";
import {PlayMenuMachine} from "./PlayMenuMachine";
import ConjecutureModule from "../ConjectureModule/ConjectureModule";
import { getUserRoleFromDatabase } from "../../firebase/userDatabase";
import { Text } from "@inlet/react-pixi";

import { TextStyle } from "@pixi/text";
import Settings from "../Settings";
import UserManagementModule from "../AdminHomeModule/UserManagementModule";
import NewUserModule from "../AdminHomeModule/NewUserModule";
import PoseAuthoring from "../PoseAuth/PoseAuthoring";
import ConjecturePoseContainer from "../TestConjectureModule/ConjecturePoseContainer";

const PlayMenu = (props) => {
    const {width, height, poseData, columnDimensions, rowDimensions, role} = props;
    const [buttonList, setButtonList] = useState([]);
    const [distanceBetweenButtons, setDistanceBetweenButtons] = useState();
    const [startingX, setStartingX] = useState();
    const[multiplier, setMultiplier] = useState(1);
    const[state, send] = useMachine(PlayMenuMachine);
    const [userRole, setUserRole] = useState(null);
    
    const fetchData = async () => {
        try {
          const role = await getUserRoleFromDatabase();
          setUserRole(role);
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
    useEffect(() => {
        fetchData();
    }, []);

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
        let role = userRole;
        let list = [];
        console.log(role);
        if(role === "Admin" || role === "Developer"){ // if user is not a student
            list.push(
                {text: "Admin", callback: () => send("ADMIN"), color: babyBlue},
                {text: "New Game", callback: () => console.log("New Game"), color: skyBlue},
                {text: "Edit Game", callback: () => console.log("Edit Game"), color: powderBlue},
                {text: "Play", callback: () => send("PLAY"), color: royalBlue},
                {text: "New Level", callback: () => send("NEWLEVEL"), color: dodgerBlue},
                {text: "Edit Level", callback: () => console.log("Edit Level"), color: steelBlue},
                {text: "Settings", callback: () => send("SETTINGS"), color: cornflowerBlue},
            );
        } else if (role === "Student"){
            list.push({text: "Play", callback: () => console.log("Play"), color: royalBlue}, {text: "Settings", callback: () => send("SETTINGS"), color: cornflowerBlue})
        } else if (role === "Teacher"){
            list.push(
                {text: "New Game", callback: () => console.log("New Game"), color: skyBlue},
                {text: "Edit Game", callback: () => console.log("Edit Game"), color: powderBlue},
                {text: "Play", callback: () => send("PLAY"), color: royalBlue},
                {text: "New Level", callback: () => send("NEWLEVEL"), color: dodgerBlue},
                {text: "Edit Level", callback: () => console.log("Edit Level"), color: steelBlue},
                {text: "Settings", callback: () => send("SETTINGS"), color: cornflowerBlue},
            );
        }
            setButtonList(list);
    }, [userRole]);

    return (
        <>
        <Background height={height} width= {width}/>
        {state.value === "main" && buttonList.map((button, idx) => (
            <Button
                fontColor={yellow}
                key = {idx}
                width = {width * 0.5}
                color = {button.color}
                fontSize = {40 * multiplier}
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
                mainCallback={() => send("MAIN")}
                editCallback={() => send("EDIT")}
            />
        )}
        {state.value === "edit" && (
            <PoseAuthoring
            width={width}
            height={height}
            poseData={poseData}
            columnDimensions={columnDimensions}
            rowDimensions={rowDimensions}
            conjectureCallback={() => send("NEWLEVEL")}  // goes to the Conjecture Module
          />
        )
        }
        {state.value === "play" && (
            <ConjecturePoseContainer
          
            height={height}
            width={width}
            columnDimensions={columnDimensions}
            rowDimensions={rowDimensions}
            editCallback={() => send("AUTHOR")} // goes to the Pose Sequence Editor
            mainCallback={() => send("HOME")} // goes to Home
            poseData={poseData}
            UUID={"43edd593-1838-49f7-9315-6d2a913de763"}
          /> 
        )}
        {state.value === "settings" && (
            <Settings
        />)}
        {state.value === "admin" && (
            <UserManagementModule
            width={width}
            height={height}
            mainCallback={() => send("MAIN")} // goes to Home
            addNewUserCallback={() => send("ADDNEWUSER")} // goes to add new user section
        />
        )}
        {state.value === "addNewUser" && (
            <NewUserModule  
            width={width}
            height={height}
            UserManagementCallback={() => {
              send("ADMIN");
              }}// goes to user management
        />
        )
        
        }
        </>
    );
};

export default PlayMenu;