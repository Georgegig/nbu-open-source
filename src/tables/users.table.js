'use strict';

let UsersTable = (function(){    
    let usersTableContainsEmail = (email) => {
        let usersTable = JSON.parse(localStorage.getItem('usersTable'));
        if(!usersTable){
            return false;
        }
        for(var i = 0; i < usersTable.length; i++){
            if(usersTable[i].email == email){
                return true;
            }
        }
    };

    let validateEmailAndPassword = (email, password) => {
        let usersTable = JSON.parse(localStorage.getItem('usersTable'));
        if(!usersTable){
            return false;
        }
        for(var i = 0; i < usersTable.length; i++){
            if(usersTable[i].email == email && usersTable[i].password == CryptoJS.SHA256(password).toString()){
                return true;
            }
        }
    };

    let getUsername = (email, password) => {
        let usersTable = JSON.parse(localStorage.getItem('usersTable'));
        if(!usersTable){
            return "";
        }
        for(var i = 0; i < usersTable.length; i++){
            if(usersTable[i].email == email && usersTable[i].password == password){
                return usersTable[i].name;
            }
        }
    ;}

    let userLoggedIn = () => {
        var user = JSON.parse(localStorage.getItem('user'));
        if(user){
            if(user.timeStamp && 
            ((new Date(user.timeStamp)).addDays(1)).getTime() > (new Date()).getTime()){
                return true;
            }
            else{
                localStorage.removeItem('user');
                return false;
            }
        }
        return false;
    };

    let registerUser = (user) => {
        let usersTable = JSON.parse(localStorage.getItem('usersTable'));
        if (!usersTable){
            usersTable = [];
        }

        usersTable.push(user);

        localStorage.setItem('usersTable', JSON.stringify(usersTable));
    };

    let loginUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
    };

    let logoutUser = () => {
        localStorage.removeItem('user');
    };

    return {
        usersTableContainsEmail: usersTableContainsEmail,
        validateEmailAndPassword: validateEmailAndPassword,
        getUsername: getUsername,
        userLoggedIn: userLoggedIn,
        registerUser: registerUser,
        loginUser: loginUser,
        logoutUser: logoutUser
    }
})();