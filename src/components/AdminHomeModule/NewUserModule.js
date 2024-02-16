import React, { useState } from 'react';
import { Container, Text, TextInput, Select, Graphics, lineStyle, beginFill, drawRect, endFill } from "@inlet/react-pixi"
import Background from "../Background";
import RectButton from '../RectButton';
import { green, neonGreen, black, blue, white, pink, orange, red, transparent, turquoise } from "../../utils/colors";
import {writeNewUserToDatabase} from "../../firebase/userDatabase"
// import {writeNewUserToDatabase_ADMIN} from "../../firebase/adminUserDatabase"

import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";



const NewUserModule = (props) => {
    const {height, width, UserManagementCallback} = props
    console.log("New User Module Activated")


    const SubmitUser = (props) => {

    }

    return (
        <>
        <Background height={height * 1.1} width={width} />
        
        <Container>
            <Text text="Add New User" />

        </Container>

        {/* // Submit Button // */}
        <RectButton
            height={height * 0.13}
            width={width * 0.26}
            x={width * 0.15}
            y={height * 0.93}
            color={black}
            fontSize={width * 0.015}
            fontColor={white}
            text={"Back"}
            fontWeight={800}
            callback={UserManagementCallback}
        />
        {/* // Back Button // */}
        <RectButton
            height={height * 0.13}
            width={width * 0.26}
            x={width * 0.15}
            y={height * 0.93}
            color={black}
            fontSize={width * 0.015}
            fontColor={white}
            text={"Back"}
            fontWeight={800}
            callback={UserManagementCallback}
        />

        {/* // TEST Button // */}
        <RectButton
            height={height * 0.13}
            width={width * 0.26}
            x={width * 0.35}
            y={height * 0.93}
            color={black}
            fontSize={width * 0.015}
            fontColor={white}
            text={"Test New User"}
            fontWeight={800}
            callback={writeNewUserToDatabase}
        />
    </>
    );
};

export default NewUserModule;