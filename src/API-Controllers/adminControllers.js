const bcrypt = require("bcrypt")
const fs = require("fs")
const { validationResult } = require("express-validator");
const { DbUser, DbProduct } = require("../database/controllers");
const path = require("path");

const controllers = {
    formatDate: function (date) {
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = (date.getDate() + 1).toString().padStart(2, '0');

        // Formatea la fecha en formato YYYY-MM-DD para el input date
        return `${year}-${month}-${day}`;
    },
    allProducts: async (req, res) => {
        try {
            const allProducts = await DbProduct.getAllProducts()

            res.render("./partials/allProducts", { allProducts })
        } catch (err) {
            console.log(err.message);
            res.status(404).render("notFound")
        }
    },
    allUsers: async (req, res) => {
        try {
            const allUsers = await DbUser.getAllUsers()

            res.render("./partials/allUsers", { allUsers })
        } catch (err) {
            console.log(err.message);
            res.status(404).render("notFound")
        }
    },
    userDetail: async (req, res) => {
        try {

            const userId = req.params.userId
            
            const userInfo = await DbUser.getUserById(userId)

            userInfo.formatedBirthday = controllers.formatDate(userInfo.birthday)

            res.render("./partials/userDetail", { userInfo })
        } catch (err) {
            console.log(err.message);
            res.status(404).render("notFound")
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
            const currentUserId = req.session.loggedUser

            const currentUser = await DbUser.getUserById(currentUserId)
            
            if (currentUser.admin) {
                const { userId }= req.body
                
                const userToDelete = await DbUser.getUserById(userId)

                const deleteResult = await DbUser.deleteUser(userId)
    
                if (deleteResult) {
                    if (userToDelete.profileImg) {
                        const profileImgPath = path.join(__dirname, `../../public/img/usersimg${userToDelete.profileImg}`)
                        
                        fs.unlink(profileImgPath, (err) => {
                            if (err) {
                                console.error("Error al eliminar la Foto de Perfil:", err);
                            }
                            console.log("Foto de Perfil eliminado");
                        })
                    }    
                }

                if (deleteResult) return res.send(true)
                
                return res.send(false)
            }

        } catch (err) {
            throw new Error(err.message)
        }
    },
    changePermission: async (req, res) => {
        try {
            const { userId, admin } = req.body

            const result = await DbUser.changePermission(userId, { admin })

            if(result[0]) return res.send(true)
            
            res.send(false)
        } catch (err) {
            throw new Error(err.message)
        }
    }
}

module.exports = controllers;
