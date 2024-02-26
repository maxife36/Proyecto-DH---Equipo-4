const { User, seqQuery } = require("../models")
const msg = require("./dbMessage")
const { v4: uuid } = require("uuid")
const validator = require("../seqQueyConfig/assets/validators")

const queryUser = seqQuery.newModel("User")

module.exports = class DbUser {
    static async getAllUsers() {
        try {
            //query config
            const query = queryUser.newQuery(["cart"])

            const users = await User.findAll(query.config)

            if (!users.length) throw new Error(msg.erroMsg.emptyTable + "Usuarios")

            return users
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getUserById(userId) {
        try {

            //validacion de ID
            validator.idValidator(userId)

            //query config
            const query = queryUser.newQuery(["cart"])

            const user = await User.findByPk(userId, query.config)

            if (!user) throw new Error(msg.erroMsg.notExistId + userId)

            return user
        } catch (err) {
            console.log(err.message)
        }
    }

    static async getUserByEmail(email) {
        try {
            //query config
            const query = queryUser.newQuery(["cart"])
            query.addWhere(email, "email")

            const user = await User.findOne(query.config)

            if (!user) throw new Error(msg.erroMsg.notExistField + `email = ${email}`)

            return user
        } catch (err) {
            console.log(err.message)
        }
    }

    static async getUserByUsername(username) {
        try {
            //query config
            const query = queryUser.newQuery(["cart"])
            query.addWhere(username, "username")

            const user = await User.findOne(query.config)

            if (!user) throw new Error(msg.erroMsg.notExistField + `Username = ${username}`)

            return user
        } catch (err) {
            console.log(err.message)
        }
    }

    static async getUserPurchase(userId) {
        try {

            //validacion de ID
            validator.idValidator(userId)

            //query config
            const query = queryUser.newQuery(["purchases"])

            const user = await User.findByPk(userId, query.config)

            if (!user) throw new Error(msg.erroMsg.notExistId + userId)

            return {
                userId: user.userId,
                purchases: user.purchases
            }
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getUserCreditcards(userId) {
        try {

            //validacion de ID
            validator.idValidator(userId)

            //query config
            const query = queryUser.newQuery(["creditCards"])

            const user = await User.findByPk(userId, query.config)

            if (!user) throw new Error(msg.erroMsg.notExistId + userId)

            return {
                userId: user.userId,
                creditCards: user.creditCards
            }
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getUserCommentedProducts(userId) {
        try {

            //validacion de ID
            validator.idValidator(userId)

            //query config
            const query = queryUser.newQuery(["productsReviews"])
            query.addAttribute(["productId", "productName", "score"], "productsReviews")
            query.addAssociation("comments", ["productsReviews"])

            const user = await User.findByPk(userId, query.config)

            if (!user) throw new Error(msg.erroMsg.notExistId + userId)

            return {
                userId: user.userId,
                products: user.productsReviews
            }
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getUserFavoritesProducts(userId) {
        try {

            //validacion de ID
            validator.idValidator(userId)

            //query config
            const query = queryUser.newQuery(["favoriteProducts"])
            query.addAttribute(["productId", "productName"], "favoriteProducts")

            const user = await User.findByPk(userId, query.config)

            if (!user) throw new Error(msg.erroMsg.notExistId + userId)

            return {
                userId: user.userId,
                products: user.favoriteProducts
            }
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async createUser(userData) {
        try {
            const { admin, fullname, email, birthday, address, profileImg, username, password } = userData

            //Verificacion de campos obligatorios

            const requiredFields = ["fullname", "email", "birthday", "username", "password"]

            const missingFields = requiredFields.filter(field => !userData.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);
    
            //creacion de usuario

            const newUser = {
                userId: uuid(),
                admin: admin ? admin : 0,
                fullname,
                email,
                birthday,
                address: address ? address : null,
                profileImg: profileImg ? profileImg : null,
                username,
                password
            }
            console.log("ANTES DE CREATE ", newUser);
            return await User.create(newUser)

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async updateUserData(userId, userData) {
        try {
            const { admin, fullname, email, birthday, address, profileImg, username, password } = userData
            
            //validacion de ID
            validator.idValidator(userId)

            //Verificacion de campos obligatorios
            const requiredFields = ["fullname", "email", "birthday", "username", "password"]

            const missingFields = requiredFields.filter(field => !userData.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);
    
            //creacion de usuario
            const updateUser = {
                admin: admin ? admin : 0,
                fullname,
                email,
                birthday,
                address: address ? address : null,
                profileImg: profileImg ? profileImg : null,
                username,
                password
            }

            //query config
            const query = queryUser.newQuery()
            query.addWhere(userId, "userId")

            return await User.update(updateUser, query.config)

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async deleteUser(userId) {
        try {

            //validacion de ID
            validator.idValidator(userId)

            //query config
            const query = queryUser.newQuery()
            query.addWhere(userId, "userId")

            const result = await User.destroy(query.config)

            if (!result) throw new Error(msg.erroMsg.notExistId)

            return result
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }
}