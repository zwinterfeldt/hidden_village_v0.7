import React from 'react';
import {Container, Sprite, Text,Graphics } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import RectButton from '../RectButton';  // Replace with your actual UI library
import UserObject from './UserObject'
import { green, neonGreen, black, blue, white, pink, orange, red, transparent, turquoise } from "../../utils/colors";

// import { ScrollView } from '@react-native';

const UserList = (props) => {
    const { width, height, x, y, users, refreshUserListCallback } = props;

    const displayedUsers = users.slice(0, users.length);




    return (
        <>
            <Graphics
                x = {x*.04}
                y = {y*.05}
                draw={(g) => {
                    // rectangle
                    g.beginFill(0xe0c755);
                    g.drawRect(120, 195, 420, ( users.length * 25) + 10);
                    g.endFill();
                    // border
                    g.lineStyle(4, 0x000000, 1);
                    g.drawRect(120, 195, 420, ( users.length * 25) + 10);
                }}
            />
            <Text
                x={x * 0.35}
                y={y * 0.2}
                text={`User`}
                style={
                    new TextStyle({
                        align: 'center',
                        fontFamily: 'Futura',
                        fontSize: 60,
                        fontWeight: 800,
                        fill: ['orange'],
                        letterSpacing: -5,
                    })
                }
            />
            <Text
                x={400}
                y={y * 0.2}
                text={`Role`}
                style={
                    new TextStyle({
                        align: 'center',
                        fontFamily: 'Futura',
                        fontSize: 60,
                        fontWeight: 800,
                        fill: ['orange'],
                        letterSpacing: -5,
                    })
                }
            />
            {/* Display User Names */}
            {/* <ScrollView style={{ flex: 1 }}> */}
            {displayedUsers.map((user, index) => (
                <UserObject
                    key={index} 
                    width={width}
                    height={height}
                    x={x}
                    y={y * 0.2 + (index + 1) * 25}  // Adjust the y position based on index
                    index={index}
                    username={user.userName}
                    role={user.userRole}
                    userId = {user.userId}
                    refreshUserListCallback = {refreshUserListCallback}
                />              
            ))}
            {/* </ScrollView> */}
            {/* Display User Names */}
            {/* {users.map((user, index) => (
                <RectButton
                    height={height * 0.13}
                    width={width * 0.26}
                    x={width * 0.58}
                    y={height * 0.93}
                    color={neonGreen}
                    fontSize={width * 0.014}
                    fontColor={white}
                    text={user.userRole}
                />              
            ))} */}
        </>
    );
};

export default UserList;
