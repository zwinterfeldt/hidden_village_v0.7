import React, { useState } from 'react';
import { Container, Text, TextInput, Select, Graphics, lineStyle, beginFill, drawRect, endFill } from "@inlet/react-pixi"
import Background from "../Background";

const NewUserModule = (props) => {
    const {height, width, UserManagementCallback} = props
    console.log("New User Module Activated")
    const [email, setEmail] = useState('');
    const [selectedRole, setSelectedRole] = useState('Teacher'); // Default selection

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform form validation (optional)
        // Example:
        if (!email.trim()) {
            alert('Please enter an email address.');
            return;
        }

        // Process user input (e.g., send to server)
        console.log('Submitted form data:', { email, selectedRole });

        // Clear form or reset state as needed
    };

    return (
        <>
        <Background height={height * 1.1} width={width} />
        
        <Container>
            <Text text="Add New User">{/* Add styling */}</Text>

        </Container>
    </>
    );
};

export default NewUserModule;