const bcrypt = require('bcrypt')
const usersModels = require("../models/usersModels");
const { create } = require('domain');
const { Console } = require('console');
const controllers = {
    productCart: (req, res) => res.render("productCart.ejs"),
    showForm: (req, res) => {
        res.render('/register.ejs');
    },
    processRegister: (req, res) => {
        const { fullName, userEmail, userBirthday, userAdress, userName, password, confirmPassword } = req.body;
        // const avatarPath = req.file.path;
        const newUser = {
            fullName: fullName,
            email: userEmail,
            adress: userAdress,
            userName: userName,
            password: bcrypt.hashSync(password, 10),
            image: req.file.filename
        }
        usersModels.create(newUser)
        res.send(newUser)
    },
}
module.exports = controllers;