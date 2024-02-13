import React from 'react';
import {Container, Sprite, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { RectButton } from '../RectButton';  // Replace with your actual UI library

import { green, neonGreen, black, blue, white, pink, orange, red, transparent, turquoise } from "../../utils/colors";


const UserList = (props) => {
    const { width, height, x, y, users} = props;
    console.log(users)
    return (
        <Text
            text={`Users`}
            x={x}
            y={y}
            style={
            new TextStyle({
                align: "center",
                fontFamily: "Futura",
                fontSize: 100,
                fontWeight: 800,
                fill: [red],
                letterSpacing: -5,
            })
            }
        />
    )
    };

export default UserList;
