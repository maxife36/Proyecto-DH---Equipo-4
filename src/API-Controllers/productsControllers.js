const fs = require("fs")
const { } = require("express-validator");
const { DbProduct, DbFeature, DbCategory } = require("../database/controllers");
const path = require("path");

const controllers = {
    productDetail: async (req, res) => {
        try {
            const productId = req.params.productId

            const product = await DbProduct.getProductById(productId)

            res.render("productDetail", { product })

        } catch (err) {
            console.log(err.message);
            res.status(404).render("notFound")
        }
    },
    showCreateForm: (req, res) => {
        try {
            res.render("productCreate")
        } catch (err) {
            throw new Error(err.message)
        }
    },
    processCreate: async (req, res) => {
        try {
            /* OBJETO QUE SE DEBE ENVIAR AL CONTROLADOR DE LA DB
            {
                productId,
                productName,
                productBrand,
                shortDescription,
                longDescription,
                productPrice,
                discount,
                stock,
                score,
                features, //[{featureId,specifications}] ->specifications Array de strings con epsecifaciones por cada featureId
                imageTitles, //Array de nombres de imagenes
                categories // Array con ids de categorias
            } 
            */

            const { productName, productBrand, shortDescription, longDescription, categories, productPrice, discount, stock } = req.body

            const formData = req.body
            const images = req.files

            // Filtrado para obtener unicamente la info de features
            const featureKeys = Object.keys(formData).filter(el => el.startsWith('featureName'))
            const featureItemKeys = Object.keys(formData).filter(el => el.startsWith('featureItem'))

            const errors = [] //validationResult(req).errors;

            if (!images.length) errors.push({
                type: "field",
                value: images,
                msg: "Debe proporcionar al menos 1 foto del producto.",
                path: "images",
                location: "body"
            })

            if (featureKeys.length !== featureItemKeys.length) errors.push({
                type: "field",
                value: undefined,
                msg: "Existen Caracteristicas sin especificaciones.",
                path: "features",
                location: "body"
            })


            if (!errors.length) {
                const data = {
                    productName,
                    productBrand,
                    shortDescription,
                    longDescription,
                    productPrice,
                    discount,
                    stock
                }

                //Procesado de Categorias

                const categoryInfo = await DbCategory.getCategoryByTitle(categories)

                data.categories = [categoryInfo.categoryId]

                //Procesado de imagenes

                const imageTitles = []

                for (const imageInfo of images) {
                    imageTitles.push(`/${imageInfo.filename}`)
                }

                data.imageTitles = imageTitles

                //Procesado de Features


                // Formacion del atributo features necesario
                const features = []

                for (const featureName of featureKeys) {
                    if(featureName === "default") continue
                    
                    const feature = await DbFeature.getFeatureByName(formData[featureName])

                    const featureId = feature.featureId

                    const featureNumber = featureName.split('featureName')[1] // obtengo el numero del feature que estoy tratando

                    let specifications = formData[`featureItem${featureNumber}`]

                    specifications = specifications.filter(Boolean)

                    if (!specifications.length) continue

                    features.push({ featureId, specifications })
                }

                data.features = features

                //Creacion del Producto 
                const product = await DbProduct.createProduct(data)

                return res.render("productDetail", { product })
            }

            res.render("productCreate", { errors })
        } catch (err) {
            throw new Error(err.message)
        }
    },


    /*     productCart: (req, res) => res.render("productCart.ejs"),
        login: (req, res) => res.render("login.ejs"),
        register: (req, res) => res.render("register.ejs"),
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
    
                res.redirect("login", {errors : {msg: "Credenciales no validas"}})
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
        processLogout: (req, res) => {
            try {
                req.session.loggedUser = undefined
    
                res.clearCookie("rememberme")
    
                res.redirect("login")
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
                    console.log(profileImgPath);
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
        } */
}

module.exports = controllers;

