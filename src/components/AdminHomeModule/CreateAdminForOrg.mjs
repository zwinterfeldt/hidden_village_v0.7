
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat/app";
import { initializeApp } from 'firebase/app';
import { ref, push, getDatabase, set, query, equalTo, get, orderByChild } from "firebase/database";

import dotenv from 'dotenv';
dotenv.config();

// Now you can access your environment variables using process.env
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



const UserPermissions = {
    Admin: 'Admin',
    Developer: 'Developer',
    Teacher: 'Teacher',
    Student: 'Student',
};


export const writeCurrentUserToDatabaseNewUser = async (newID,newEmail,newRole, newOrg) => {
    // Create a new date object to get a timestamp
    const dateObj = new Date();
    const timestamp = dateObj.toISOString();

    const userId = newID;
    console.log('User ID:', userId);

    const userEmail = newEmail;
    console.log(`User Email: ${userEmail}`)

    const userRole = newRole;
    console.log(`User Role: ${userRole}`)

    const userOrg = newOrg
    console.log(`User Org: ${userOrg}`)

   // Extract username from email
    const userName = userEmail.split('@')[0];
    console.log(`User Name: ${userName}`);

    // db path
    // ref the realtime db
    const userPath = `Users/${userId}`;

    const db = getDatabase();

    // Check if user already exists in the database
    const userSnapshot = await get(ref(db, userPath));

    if (userSnapshot.val() !== null) {
        // User already exists, do not add again
        // alert("User already exists in the database.");
        return false;
    }

    const promises = [
        set(ref(db, `${userPath}/userId`), userId),
        set(ref(db, `${userPath}/userName`), userName),
        set(ref(db, `${userPath}/userEmail`),userEmail ),
        set(ref(db, `${userPath}/userRole`),userRole),
        set(ref(db, `${userPath}/userOrg`),userOrg),
        set(ref(db, `${userPath}/dateCreated`),timestamp),
        set(ref(db, `${userPath}/dateLastAcccessed`),timestamp),

    ];
    return Promise.all(promises)
    .then(() => {
        // alert("User successfully published to database.");
        console.log("Process Complete")
        return true;
    })
    .catch(() => {
        // alert("OOPSIE POOPSIE. Cannot publish user to database.");
        console.log("Process Error")
        return false;
    });
};

export const writeNewUserToDatabase = async (userEmail, userRole, userPassword, userOrg) => {
    // Create a new date object to get a timestamp
    const dateObj = new Date();
    const timestamp = dateObj.toISOString();

    // Get the Firebase authentication instance
    const auth = getAuth();

    await createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {

        console.log("User created successfully:", userCredential.user);

        // Additional user information
        const user = userCredential.user;
        console.log("New User UID:", user.uid);
        console.log("New User email:", user.email);
        console.log("New User display name:", user.displayName);

        const newID = user.uid;
        console.log(newID)
        const newEmail = user.email;
        const newRole = userRole;
        // lets addd user to the realtime database now
    
        writeCurrentUserToDatabaseNewUser(newID, newEmail, newRole, userOrg);
    })
    .catch((error) => {
        console.error("Error creating auth user", error);
        // Handle errors (e.g., invalid email, weak password)
    });
}

const adminUserEmail = "DELETE4Admin@email.com"
const adminUserRole = UserPermissions.Admin
const adminUserOrganization = "Minnesota State University, Mankato"
const adminUserPassword = "admin1"

writeNewUserToDatabase(adminUserEmail,adminUserRole,adminUserPassword,adminUserOrganization);
