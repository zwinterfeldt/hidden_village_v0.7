import React from 'react';
import {Container, Sprite, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { RectButton } from '../RectButton';  // Replace with your actual UI library

import { green, neonGreen, black, blue, white, pink, orange, red, transparent, turquoise } from "../../utils/colors";


const UserObject = (props) => {
    const { width, height, x, y, username,key,index,role} = props;
    // console.log(role)
    return (
        <Container>
            <Text
                x={1}
                y={y}  // Move this line inside the style object
                text={username}
                style={
                    new TextStyle({
                        fontFamily: 'Futura',
                        fontSize: 16,
                        fontWeight: 400,
                    })
                }
            />
            <Text
                x={150}
                y={y}  // Move this line inside the style object
                text={role}
                style={
                    new TextStyle({
                        fontFamily: 'Futura',
                        fontSize: 16,
                        fontWeight: 400,
                    })
                }
            />
        </Container>
    );
};

export default UserObject;