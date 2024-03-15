// userSaver.js

const saveUsername = (username) => {
    // console.log("Username saved:", username);
    localStorage.setItem('savedUsername', username);
};

const getSavedUsername = () => {
    const savedUsername = localStorage.getItem('savedUsername');
    // console.log("Retrieving saved username:", savedUsername);
    return savedUsername;
};

const savePassword = (password) => {
    // console.log("Password saved:", password);
    localStorage.setItem('savedPassword', password);
};

const getSavedPassword = () => {
    const savedPassword = localStorage.getItem('savedPassword');
    // console.log("Retrieving saved password:", savedPassword);
    return savedPassword;
};

export { saveUsername, getSavedUsername, savePassword, getSavedPassword };
