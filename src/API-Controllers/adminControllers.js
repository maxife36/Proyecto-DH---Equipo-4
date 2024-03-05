const bcrypt = require("bcrypt")
const fs = require("fs")
const { validationResult } = require("express-validator");
const { DbUser } = require("../database/controllers");
const path = require("path");

const controllers = {
    allUser: async (req,res) => {
        try {
            const usersInfo = await DbUser.getAllUsers()

            res.render("/", { usersInfo })  //Cambiar Ruta al dashboard para manipulacion de usuarios como ADMIN
        } catch (err) {
            throw new Error(err.message)
        }
    },
    editUser: async (req, res) => {
        try {
            const userId = req.session.loggedUser

            const userInfo = await DbUser.getUserById(userId)

            res.render("/", { userInfo })  //Cambiar Ruta al de Edicion de usuario como ADMIN
        } catch (err) {
            throw new Error(err.message)
        }
    },
    processEditUser: async (req, res) => {
        try {
            const userId = req.session.loggedUser
            const profileImage = req.file

            const { fullName, userEmail, userBirthday, userAdress, userName, password } = req.body

            const errors = validationResult(req).errors;

            const currentUser = await DbUser.getUserById(userId)

            if (!currentUser) errors.push({
                type: "field",
                value: userId,
                msg: `No existe un usuario con el Id:  ${userId}`,
                path: "userId",
                location: "params"
            })

            //Si no hay errores prosigo con la creacion
            if (!errors.length) {

                const updatedUser = {
                    fullname: fullName,
                    email: userEmail,
                    birthday: userBirthday,
                    address: userAdress,
                    profileImg: profileImage ? `/${profileImage.filename}` : null,
                    username: userName,
                    password: bcrypt.hashSync(password, 10)
                }

                //Si se paso una foto nueva se elimina la anetrior antes de crearse la nueva, Para no ocupar espacio en el servidor
                if (currentUser.profileImg) {
                    const profileImgPath = path.join(__dirname, `../../public/img/usersimg${currentUser.profileImg}`)

                    fs.unlink(profileImgPath, (err) => {
                        if (err) {
                            console.error("Error al eliminar la Foto de Perfil:", err);
                        }
                        console.log("Foto de Perfil eliminado");
                    })
                }

                updatedUser = await DbUser.updateUserData(userId, updatedUser)

                return res.render("/", { userInfo: updatedUser }) //cambiar ruta al de edicion de perfil 
            }

            if (profileImage) fs.unlink(profileImage.path, (err) => {
                if (err) {
                    console.error("Error al eliminar la Foto de Perfil:", err);
                }
                console.log("Foto de Perfil eliminado");
            })

            res.render("register", { errors }) //cambiar ruta al de edicion de perfil

        } catch (err) {
            throw new Error(err.message)
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userId = req.session.loggedUser

            const currentUser = await DbUser.getUserById(userId)

            await DbUser.deleteUser(userId)

            if (currentUser.profileImg) {
                const profileImgPath = path.join(__dirname, `../../public/img/usersimg${currentUser.profileImg}`)
                
                fs.unlink(profileImgPath, (err) => {
                    if (err) {
                        console.error("Error al eliminar la Foto de Perfil:", err);
                    }
                    console.log("Foto de Perfil eliminado");
                })
            }

            req.session.loggedUser = undefined

            res.clearCookie("rememberme")

            res.redirect("login")
        } catch (err) {
            throw new Error(err.message)
        }
    },
    changePermission: async (req, res) => {
        try {
            const { userId, admin } = req.body

            await DbUser.updateUserData(userId, { admin })

            res.render("/") //cambiar ruta al Dashboard 

        } catch (err) {
            throw new Error(err.message)
        }
    }
}

/* 
Falta PROBAR controlador para:

Falta controlador para:
-Ruta para mostrar todos los usuarios con un ofsset y limit
-
*/
module.exports = controllers;
