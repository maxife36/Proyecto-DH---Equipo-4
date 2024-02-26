const bcrypt = require("bcrypt")
const fs = require("fs")
const { validationResult } = require("express-validator");
const { DbUser } = require("../database/controllers");

const controllers = {
    productCart: (req, res) => res.render("productCart.ejs"),
    login: (req, res) => res.render("login.ejs"),
    register: (req, res) => res.render("register.ejs"),
    processlogin: async (req, res) => {
        try {
            const { remembermeBtn, userName, password } = req.body

            const userFinded = await DbUser.getUserByUsername(userName)

            if (userFinded) {
                const validPassword = bcrypt.compareSync(password, userFinded.password)

                if (validPassword) {
                    req.session.loggedUser = userFinded.userId

                    if (remembermeBtn) {
                        res.cookie("rememberme", userFinded.userId, { maxAge: (60 * 1000 * 60 * 24) })
                    }
                    return res.redirect("/")
                }
            }

            res.redirect("/")
        } catch (err) {
            throw new Error(err.message)
        }
    },
    processRegister: async (req, res) => {
        try {
            const profileImage = req.file
            console.log(profileImage);

            const { fullName, userEmail, userBirthday, userAdress, userName, password } = req.body

            const errors = validationResult(req).errors;

            //Valido si ya existen en mi db un mail o username 
            const existUser = await Promise.all([DbUser.getUserByEmail(userEmail), DbUser.getUserByUsername(userName)])

            if (existUser[0]) errors.push({
                type: "field",
                value: userEmail,
                msg: "Ya existe un usuario con ese mail",
                path: "userEmail",
                location: "body"
            })
            if (existUser[1]) errors.push({
                type: "field",
                value: userName,
                msg: "Ya existe un usuario con ese Username",
                path: "userName",
                location: "body"
            })

            //Si no hay errores prosigo con la creacion
            if (!errors.length) {

                const newUser = {
                    fullname: fullName,
                    email: userEmail,
                    birthday: userBirthday,
                    address: userAdress,
                    profileImg: profileImage ? `/${profileImage.filename}` : null,
                    username: userName,
                    password: password
                }

                const user = await DbUser.createUser(newUser)

                req.session.loggedUser = user.userId

                return res.redirect("/")
            }

            if (profileImage) fs.unlink(profileImage.path, (err) => {
                if (err) {
                    console.error("Error al eliminar la Foto de Perfil:", err);
                }
                console.log("Foto de Perfil eliminado");
            })

            res.render("register", { errors })
        } catch (err) {
            throw new Error(err.message)
        }
    }
  
}

module.exports = controllers;

