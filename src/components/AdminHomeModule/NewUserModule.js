import React, { useState } from 'react';
import { Container, Text, TextInput, Select, Graphics, lineStyle, beginFill, drawRect, endFill } from "@inlet/react-pixi"
import Background from "../Background";
import RectButton from '../RectButton';
import { green, neonGreen, black, blue, white, pink, orange, red, transparent, turquoise } from "../../utils/colors";
import {writeNewUserToDatabase} from "../../firebase/userDatabase"


import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import InputBox from '../InputBox';

const UserPermissions = {
    Admin: 'Admin',
    Developer: 'Developer',
    Teacher: 'Teacher',
    Student: 'Student',
};

const NewUserModule = (props) => {
    const {height, width, UserManagementCallback} = props
    console.log("New User Module Activated")

    const [email, setEmail] = useState("example@email.com");
    const [userRole, setUserRole] = useState(UserPermissions.Student); 

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleRoleChange = (e) => {
        setUserRole(e.target.value);
    }


    const SubmitUser = (props) => {

    }

    function sendEmailPrompt(){
        let enteredEmail = prompt("Please Enter New User Email", email);
        if (enteredEmail !== null) {
            setEmail(enteredEmail)
        } else if (enteredEmail !== null) {
        alert('Error reading email: No value');
        }

    }

    function sendRolePrompt() {
        let enteredRole = prompt("Please enter a new user role: Admin, Developer, Teacher, Student", userRole);
        if (enteredRole !== null && Object.values(UserPermissions).includes(enteredRole)) {
            setUserRole(enteredRole);
        } else if (enteredRole !== null) {
            alert('Error reading role: value not allowed');
        }
    }

    console.log(email);

    return (
        <>
        <Background height={height * 1.1} width={width} />
        
        <Container>
            <Text text="Add New User" />
            <InputBox
                height={height * 0.10}
                width={width * 0.8}
                x={width * 0.5}
                y={height * 0.5}
                color={white}
                fontSize={width * 0.015}
                fontColor={black}
                text={email}
                fontWeight={300}
                callback={sendEmailPrompt} // Create Popup
            />
            <InputBox
                height={height * 0.10}
                width={width * 0.8}
                x={width * 0.5}
                y={height * 0.6}
                color={white}
                fontSize={width * 0.015}
                fontColor={black}
                text={userRole}
                fontWeight={300}
                callback={sendRolePrompt} // Create Popup
            />

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
            callback={() => {
                writeNewUserToDatabase(email, userRole);
            }}
        />
    </>
    );
};

export default NewUserModule;