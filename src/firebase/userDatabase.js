import { ref, push, getDatabase, set, query, equalTo, get, orderByChild } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getDatabase();

// User Id functionality will be added in a different PR
let userId;

// Get the Firebase authentication instance
const auth = getAuth();

// Listen for changes to the authentication state
// and update the userId variable accordingly
onAuthStateChanged(auth, (user) => {
userId = user.uid;
});

const UserPermissions = {
    Admin: 'Admin',
    Developer: 'Developer',
    Teacher: 'Teacher',
    Student: 'Student',
};

export const writeToDatabaseNewUser = async () => {
    // Create a new date object to get a timestamp
    const dateObj = new Date();
    const timestamp = dateObj.toISOString();

    console.log('User ID:', userId);

    const userEmail = auth.currentUser.email;
    console.log(`User Email: ${userEmail}`)

    const userRole = UserPermissions.Teacher
    console.log(`User Role: ${userRole}`)

    const userOrg = "Minnesota State University, Mankato"
    console.log(`User Org: ${userOrg}`)

   // Extract username from email
    const userName = userEmail.split('@')[0];
    console.log(`User Name: ${userName}`);

    // db path
    // ref the realtime db
    const userPath = `Users/${userId}`;

    // Check if user already exists in the database
    const userSnapshot = await get(ref(db, userPath));

    if (userSnapshot.val() !== null) {
        // User already exists, do not add again
        alert("User already exists in the database.");
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
        alert("User successfully published to database.");
        return true;
    })
    .catch(() => {
        alert("OOPSIE POOPSIE. Cannot publish user to database.");
        return false;
    });
};

// returns the user role
// // Example usage:
// // Assuming userId is available
// getUserRoleFromDatabase(userId)
// .then((userRole) => {
//     if (userRole !== null) {
//         console.log(`User Role: ${userRole}`);
//     } else {
//         console.log("User not found in the database.");
//     }
// })
// .catch((error) => {
//     console.error("Error retrieving user role:", error);
// });
export const getUserRoleFromDatabase = async (props) => {
    const userPath = `Users/${userId}`;

    // Get the user snapshot from the database
    const userSnapshot = await get(ref(db, userPath));

    if (userSnapshot.exists()) {
        // User exists, return the user's role
        return userSnapshot.val().userRole;
    } else {
        // User does not exist in the database
        return null;
    }
};

export const getUserNameFromDatabase = async (props) => {
    const userPath = `Users/${userId}`;

    // Get the user snapshot from the database
    const userSnapshot = await get(ref(db, userPath));

    if (userSnapshot.exists()) {
        // User exists, return the user's role
        return userSnapshot.val().userName;
    } else {
        // User does not exist in the database
        return "USER NOT FOUND";
    }
};

// return a list of users by organization
export const getUsersByOrganizationFromDatabase = async (organization) => {
    try {
        const usersRef = ref(db, 'Users');
        const usersQuery = query(usersRef, orderByChild('userOrg'), equalTo(organization));
        
        console.log('Executing users query...');
        const usersSnapshot = await get(usersQuery);

        if (usersSnapshot.exists()) {
            console.log('Users found for organization:', organization);
            const usersList = [];

            // Loop through the users and add them to the list
            usersSnapshot.forEach((userSnapshot) => {
                const userData = userSnapshot.val();
                usersList.push(userData);
            });

            console.log('Userlist:', usersList);
            return usersList;
        } else {
            console.log('No users found for organization:', organization);
            // No users found for the given organization
            return [];
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};




