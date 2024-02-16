import React from 'react';
import {Container, Sprite, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { RectButton } from '../RectButton';  // Replace with your actual UI library
import UserObject from './UserObject'
import { green, neonGreen, black, blue, white, pink, orange, red, transparent, turquoise } from "../../utils/colors";


const UserList = (props) => {
    const { width, height, x, y, users} = props;
    // console.log(users)
    return (
        <Container 
            x={x*.3} 
            y={y*.2}>
            <Text
                text={`Users`}
                style={
                    new TextStyle({
                        align: 'center',
                        fontFamily: 'Futura',
                        fontSize: 100,
                        fontWeight: 800,
                        fill: ['red'],
                        letterSpacing: -5,
                    })
                }
            />
            {/* Display User Names */}
            <Container x={x * 0.1} y={y * 0.15}>
                {users.map((user, index) => (
                    <UserObject
                        x={x}
                        y={index * 20}
                        index = {index}
                        username={user.userName}
                        role={user.userRole}
        
                         // Adjust the spacing between usernames
                    />
                ))}
            </Container>
        </Container>
    );
};

export default UserList;
