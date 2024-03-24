const bcrypt = require("bcrypt")
const fs = require("fs")
const { v4: uuid } = require("uuid")
const { validationResult } = require("express-validator");
const { updateCartInfoToRender } = require("./cartController");
const { updateFavoriteCookieInfo } = require("./favoritesController");
const { sendVerificationMail, sendSecurityUpdateMail } = require("./sendGridController");
const { DbUser, DbCartProduct, DbFavorite, DbPurchase} = require("../database/controllers");
const path = require("path");

const controllers = {
    formatDate: function (date) {
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = (date.getDate() + 1).toString().padStart(2, '0');

        // Formatea la fecha en formato YYYY-MM-DD para el input date
        return `${year}-${month}-${day}`;
    },
    productCart: (req, res) => res.render("productCart.ejs"),
    login: (req, res) => res.render("login.ejs"),
    register: (req, res) => res.render("register.ejs"),

    userOnlyData: async (req, res) => {
        const userId = req.session.loggedUser

        const currentUser = await DbUser.getUserById(userId)

        currentUser.formatedBirthday = controllers.formatDate(currentUser.birthday)

        res.send(currentUser)
    },
    userProfile: async (req, res) => {
        const userId = req.session.loggedUser

        const currentUser = await DbUser.getUserById(userId)

        currentUser.formatedBirthday = controllers.formatDate(currentUser.birthday)

        res.render("userProfile.ejs", { userInfo: currentUser })
    },
    userData: async (req, res) => {
        const userId = req.session.loggedUser

        const {onlyData} = req.query

        const currentUser = await DbUser.getUserById(userId)

        currentUser.formatedBirthday = controllers.formatDate(currentUser.birthday)

        if(onlyData === "true") return res.send(currentUser)

        res.render("./partials/userData.ejs", { userInfo: currentUser })
    },
    securityData: async (req, res) => {
        const userId = req.session.loggedUser

        const currentUser = await DbUser.getUserById(userId)

        res.render("./partials/securityData.ejs", { userInfo: currentUser })
    },
    purchases: async (req, res) => {
        const userId = req.session.loggedUser

        const currentUserPurchases = await DbPurchase.getPurchasesByUserId(userId)

        function formatDate(date) {
            const year = date.getFullYear();
            let month = (1 + date.getMonth()).toString().padStart(2, '0');
            let day = (date.getDate()).toString().padStart(2, '0');
    
            // Formatea la fecha en formato YYYY-MM-DD para el input date
            return `${year}-${month}-${day}`;
        }

        if (currentUserPurchases) {
            currentUserPurchases.forEach(purchase => {
                purchase.dataParse = JSON.parse(purchase.data)
                purchase.formatedCreatedDate = formatDate(purchase.createdAt)
            });
        }


        res.render("./partials/purchases.ejs", { userInfo: currentUserPurchases })
    },
    favoritesData: async (req, res) => {
        const userId = req.session.loggedUser

        const currentUser = await DbFavorite.getFavoriteByUserId(userId)

        res.render("./partials/favorites.ejs", { userInfo: currentUser })
    },
    profileCart: async (req, res) =>  res.render("./partials/profileCart.ejs"),
    editSecurityData: async (req, res) => {
        const currentUserId = req.session.loggedUser

        const currentUser = await DbUser.getUserById(currentUserId)

        const { fullname, email, userId } = currentUser

        const validateToken = uuid()
        req.session.updateUserToken = validateToken

        //Envio asincronico de mail de verificación
        sendSecurityUpdateMail({
            userId,
            userEmail: email,
            userName: fullname,
            validateToken
        })

        res.status(200).send(true) // en el controlador del btn de editar en el DOM, enviar un popup avisando que verifique su mail
    },
    editUser: async (req, res) => {
        try {
            const userId = req.session.loggedUser

            const userInfo = await DbUser.getUserById(userId)

            res.render("/", { userInfo })  //Cambiar Ruta al de Edicion de usuario
        } catch (err) {
            throw new Error(err.message)
        }
    },
    processLogin: async (req, res) => {
        try {
            const { remembermeBtn, userName, password } = req.body

            const errors = []

            const userFinded = await DbUser.getUserByUsername(userName)

            if (userFinded && !userFinded.isVerified) errors.push({ msg: "Es necesario Validar tu mail" })
            if (!userFinded) errors.push({ msg: "Las credenciales no son validas" })


            if (!errors.length) {
                const validPassword = bcrypt.compareSync(password, userFinded.password)

                if (validPassword) {
                    req.session.loggedUser = userFinded.userId
                    req.session.loggedCart = userFinded.cart.cartId

                    res.cookie("isLogged", true) //permitira identificar desde el front si un usaurio esta logueado o no

                    await updateCartInfoToRender(userFinded.userId, req, res)
                    await updateFavoriteCookieInfo(userFinded.userId, req, res)

                    if (remembermeBtn) {
                        res.cookie("rememberme", userFinded.userId, { maxAge: (60 * 1000 * 60 * 24) })
                    }

                    return res.redirect("/")
                } else {
                    errors.push({ msg: "Las credenciales no son validas" })
                }
            }

            res.render("login", { errors })
        } catch (err) {
            throw new Error(err.message)
        }
    },
    processRegister: async (req, res) => {
        try {
            const profileImage = req.file

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
                    password: bcrypt.hashSync(password, 10)
                }

                const user = await DbUser.createUser(newUser)

                const { fullname, email, userId } = user

                //Envio asincronico de mail de verificación
                sendVerificationMail({
                    userId,
                    userEmail: email,
                    userName: fullname
                })

                return res.redirect("/users/login")
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
    },
    processEditUser: async (req, res) => {
        try {
            const userId = req.session.loggedUser
            const profileImage = req.file

            const { fullName, userBirthday, userAdress, userName, password, isProfileImage, validateToken } = req.body

            const errors = validationResult(req).errors;

            const currentUser = await DbUser.getUserById(userId)
            const existUsername = null

            if (validateToken && currentUser.username !== userName) {
                existUsername = await DbUser.getUserByUsername(userName)
            }

            if (!currentUser) errors.push({
                type: "field",
                value: userId,
                msg: `No existe un usuario con el Id:  ${userId}`,
                path: "userId",
                location: "body"
            })

            if (existUsername) errors.push({
                type: "field",
                value: userName,
                msg: `Ya existe el nombre de usuario:  ${userId}`,
                path: "userName",
                location: "body"
            })

            //Si no hay errores prosigo con la creacion
            if (!errors.length) {

                let updatedUser = {
                    fullname: fullName ? fullName : currentUser.fullname,
                    email: currentUser.email,
                    birthday: userBirthday ? userBirthday : currentUser.birthday,
                    address: userAdress ? userAdress : currentUser.address,
                    profileImg: profileImage ? `/${profileImage.filename}` : isProfileImage,
                    username: currentUser.username,
                    password: currentUser.password
                }

                if (validateToken && req.session.updateUserToken === validateToken) {

                    updatedUser = {
                        fullname: currentUser.fullname,
                        email: currentUser.email,
                        birthday: currentUser.birthday,
                        address: currentUser.address,
                        profileImg: currentUser.profileImg,
                        username: userName ? userName : currentUser.username,
                        password: password ? bcrypt.hashSync(password, 10) : currentUser.password
                    }
                }

                //Si se paso una foto nueva se elimina la anetrior antes de crearse la nueva, Para no ocupar espacio en el servidor
                if (!isProfileImage && profileImage) {
                    const profileImgPath = path.join(__dirname, `../../public/img/usersimg${currentUser.profileImg}`)

                    fs.unlink(profileImgPath, (err) => {
                        if (err) {
                            console.error("Error al eliminar la Foto de Perfil:", err);
                        }
                        console.log("Foto de Perfil eliminado");
                    })
                }

                updatedUserResult = await DbUser.updateUserData(userId, updatedUser)

                //Si se actualizo un elemento y se trata de cambio de username o contraseña, cierra la sesion
                if (validateToken && req.session.updateUserToken === validateToken && updatedUserResult[0]) {
                    req.session.loggedUser = undefined
                    req.session.loggedCart = undefined

                    res.clearCookie("isLogged")
                    res.clearCookie("rememberme")
                    res.clearCookie("cartProductsId")

                    return res.status(200).send(true)
                }

                updatedUser = await DbUser.getUserById(userId)

                updatedUser.formatedBirthday = controllers.formatDate(updatedUser.birthday)

                return res.status(200).render("userProfile.ejs", { userInfo: updatedUser })
            }

            if (profileImage) fs.unlink(profileImage.path, (err) => {
                if (err) {
                    console.error("Error al eliminar la Foto de Perfil:", err);
                }
                console.log("Foto de Perfil eliminado");
            })

            res.status(500).send(errors) //cambiar ruta al de edicion de perfil

        } catch (err) {
            throw new Error(err.message)
        }
    },
    processLogout: (req, res) => {
        try {
            req.session.loggedUser = undefined
            req.session.loggedCart = undefined

            res.clearCookie("isLogged")
            res.clearCookie("rememberme")
            res.clearCookie("cartProductsId")

            res.redirect("/")
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
            res.clearCookie("isLogged")

            res.clearCookie("rememberme")

            res.redirect("/users/login")
        } catch (err) {
            throw new Error(err.message)
        }
    }
}

module.exports = controllers
