import { useEffect, useState } from "react";
import Background from "../Background"
import { set } from "js-cookie";
import Button from "../Button";
import { blue, yellow, purple, babyBlue, powderBlue, cornflowerBlue, steelBlue, dodgerBlue, royalBlue, navyBlue, midnightBlue } from "../../utils/colors";
import RectButton from "../RectButton";
import { send } from "xstate";
import { sendTo } from "xstate/lib/actions";
import { useMachine } from "@xstate/react";
import {PlayMenuMachine} from "./PlayMenuMachine";
import ConjecutureModule from "../ConjectureModule/ConjectureModule";
import CurricularModule from "../CurricularModule/CurricularModule.js";
import ConjectureSelectorModule, { getAddToCurricular, setAddtoCurricular } from "../ConjectureSelector/ConjectureSelectorModule.js";
import CurricularSelectorModule, { getPlayGame, setPlayGame } from "../CurricularSelector/CurricularSelector.js";
import { getUserRoleFromDatabase } from "../../firebase/userDatabase";
import { Text } from "@inlet/react-pixi";
import { Curriculum } from "../CurricularModule/CurricularModule.js";

import { TextStyle } from "@pixi/text";
import Settings from "../Settings";
import UserManagementModule from "../AdminHomeModule/UserManagementModule";
import NewUserModule from "../AdminHomeModule/NewUserModule";
import PoseAuthoring from "../PoseAuth/PoseAuthoring";
import ConjecturePoseContainer from "../TestConjectureModule/ConjecturePoseContainer";
import PlayGame from "../PlayGameModule/PlayGame";

const PlayMenu = (props) => {
    const {width, height, poseData, columnDimensions, rowDimensions, role} = props;
    const [buttonList, setButtonList] = useState([]);
    const [distanceBetweenButtons, setDistanceBetweenButtons] = useState();
    const [startingX, setStartingX] = useState();
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

    }, [buttonList, width, height]);
    
    useEffect(() => {
        //get user role
        let role = userRole;
        let list = [];
        console.log(role);
        if(role === "Admin" || role === "Developer"){ // if user is not a student
            list.push(
                {text: "Admin", callback: () => send("ADMIN"), color: babyBlue},
                {text: "New Game", callback: () => send("NEWGAME"), color: purple},
                {text: "Edit Game", callback: () => (setPlayGame(false), send("GAMESELECT")), color: powderBlue},
                {text: "Play Game", callback: () => (setPlayGame(true), send("GAMESELECT")), color: royalBlue},
                {text: "New Level", callback: () => send("NEWLEVEL"), color: dodgerBlue},
                {text: "Edit Level", callback: () => (setAddtoCurricular(false),send("LEVELSELECT")), color: steelBlue},
                {text: "Settings", callback: () => send("SETTINGS"), color: cornflowerBlue},
            );
        } else if (role === "Student"){
            list.push({text: "Play", callback: () => console.log("Play"), color: royalBlue}, {text: "Settings", callback: () => send("SETTINGS"), color: cornflowerBlue})
        } else if (role === "Teacher"){
            list.push(
                {text: "New Game", callback: () => send("NEWGAME"), color: purple},
                {text: "Edit Game", callback: () => (setPlayGame(false), send("GAMESELECT")), color: powderBlue},
                {text: "Play", callback: () => send("PLAY"), color: royalBlue},
                {text: "New Level", callback: () => send("NEWLEVEL"), color: dodgerBlue},
                {text: "Edit Level", callback: () => (setAddtoCurricular(false),send("LEVELSELECT")), color: steelBlue},
                {text: "Settings", callback: () => send("SETTINGS"), color: cornflowerBlue},
            );
        }
            setButtonList(list);
    }, [userRole]);

    return (
        <>
        {state.value === "main" && (
          <Background height={height} width= {width}/>
        )}
        {state.value === "main" && buttonList.map((button, idx) => (
            <Button
                fontColor={yellow}
                key = {idx}
                width = {width * 0.1}
                color = {button.color}
                fontSize = {width * 0.02}
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
            <PlayGame
                width={width}
                height={height}
                backCallback={()=> send("MAIN")}
                columnDimensions={columnDimensions}
                rowDimensions={rowDimensions}
                poseData={poseData}
                gameUUID={Curriculum.getCurrentUUID()}
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
        )}
        {state.value === "newGame" && (
          <CurricularModule
            width={width}
            height={height}
            columnDimensions={columnDimensions}
            rowDimensions={rowDimensions}
            conjectureCallback={() => send("EDIT")}  // goes to the Conjecture Module
            mainCallback={() => send("MAIN")} // goes to Home
            conjectureSelectCallback={() => send("LEVELSELECT")}
          />
        )}
        {state.value === "levelSelect" && (
          <ConjectureSelectorModule
            width={width}
            height={height}
            columnDimensions={columnDimensions}
            rowDimensions={rowDimensions}
            conjectureCallback={() => send("NEWLEVEL")}  // goes to the Conjecture Module
            curricularCallback={() => send("NEWGAME")}
            backCallback={() => {
              if(getAddToCurricular()) // if selecting a level to add to a game, go back to the game screen
                send("NEWGAME");
              else
                send("MAIN") // if selecting a level to edit, go to main menu
            }}
          />
        )}
        {state.value === "gameSelect" && (
          <CurricularSelectorModule
            width={width}
            height={height}
            columnDimensions={columnDimensions}
            rowDimensions={rowDimensions}
            curricularCallback={() => {
              if (!getPlayGame()) // edit game
                send("NEWGAME");
              else
                send("PLAY"); 
            }}
            mainCallback={() => {send("MAIN")}}
          />
        )}
        </>
    );
};

export default PlayMenu;