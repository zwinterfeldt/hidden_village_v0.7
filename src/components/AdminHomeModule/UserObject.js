import React from 'react';
import {Container, Sprite, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import RectButton from '../RectButton'; 
import UserManagementModule from '../../components/AdminHomeModule/UserManagementModule'
import {changeUserRoleInDatabase} from '../../firebase/userDatabase'

import { green, neonGreen, black, blue, white, pink, orange, red, transparent, turquoise } from "../../utils/colors";



const ChangeRole = () => {

}


const UserObject = (props) => {
    const { width, height, x, y, username,index,role,userId,refreshUserListCallback} = props;
    // console.log(role)

    const UserPermissions = {
        Admin: 'Admin',
        Developer: 'Developer',
        Teacher: 'Teacher',
        Student: 'Student',
    };

    const roleColors = {
        [UserPermissions.Admin]: red,
        [UserPermissions.Developer]: orange,
        [UserPermissions.Teacher]: blue,
        [UserPermissions.Student]: green,
    };


    // Define the order of roles
    const roleOrder = [UserPermissions.Admin, UserPermissions.Developer, UserPermissions.Teacher, UserPermissions.Student];

    // Function to get the next role
    const getNextRole = (currentRole) => {
        const currentIndex = roleOrder.indexOf(currentRole);
        const nextIndex = (currentIndex + 1) % roleOrder.length; // Cycle through roles
        return roleOrder[nextIndex];
    };


    return (
        <>
            <Text
                x={150}
                y={y + 50}  // Move this line inside the style object
                text={username}
                style={
                    new TextStyle({
                        fontFamily: 'Futura',
                        fontSize: 16,
                        fontWeight: 400,
                    })
                }
            />
            {/* Role Button*/}
            <RectButton
                height={55}
                width={200}
                x={420}
                y={y + 50}
                color={roleColors[role]}
                fontSize={15}
                fontColor={white}
                text={role}
                fontWeight={800}
                callback={async () => {
                try {
                    const result = await changeUserRoleInDatabase(userId, getNextRole(role));

                    if (result) {
                        // Success
                        // change the color of the button

                        // update the list of users
                        await refreshUserListCallback();
                        console.log("User role changed successfully.");
                    } else {
                        // Failure
                        console.log("Failed to change user role.");
                    }
                } catch (error) {
                    // Handle any errors that occurred during the operation
                    console.error("Error:", error);
                    alert("An error occurred while changing the user role.");
                }
            }}
        />  
        </>
    );
};

export default UserObject;