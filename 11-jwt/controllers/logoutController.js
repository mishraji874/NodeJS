const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {

    //on client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //no content to send back
    const refreshToken = cookies.jwt;

    //is refreshed token in db?
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204); //Forbidden
    } 
    
    //delete the refreshToken in db
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = {...foundUser, refreshToken: ''};
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    );

    res.clearCookie('jwt', { httpOnly: true }); //secure: true - only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout };