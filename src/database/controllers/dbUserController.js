const { User, seqQuery } = require("../models")
const msg = require("./dbMessage")
const { v4: uuid } = require("uuid")
const validator = require("../seqQueyConfig/assets/validators")

const queryUser = seqQuery.newModel("User")

module.exports = class DbUserController {
    static async getAllUsers() {
        try {
            //query config
            const query = queryUser.newQuery(["cart"])

            const users = await User.findAll(query.config)

            if (!users.length) throw new Error(msg.erroMsg.emptyTable + "Usuarios")

            return users
        } catch (err) {
            console.log(err.message)
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

            return user.dataValues
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
        }
    }

    static async createUser(userData) {
        try {

            //Verificacion de campos obligatorios

            const requiredField = ["fullname", "email", "birthday", "username", "password"]

            requiredField.forEach(el => {
                let requiredFlag = false

                userData.hasOwnProperty(el) ? null : requiredFlag = true

                if (requiredFlag) throw new Error(msg.erroMsg.incompleteData)
            })

            //creacion de usuario

            const newUser = {
                userId: uuid(),
                admin: userData.admin ? userData.admin : 0,
                fullname: userData.fullname,
                email: userData.email,
                birthday: userData.birthday,
                address: userData.address ? userData.address : null,
                profileImg: userData.profileImg ? userData.profileImg : null,
                username: userData.username,
                password: userData.password
            }

            return await User.create(newUser)

        } catch (err) {
            console.log(err.message)
        }
    }

    static async updateUserData(userId, userData) {
        try {
            //validacion de ID
            validator.idValidator(userId)

            //Verificacion de campos obligatorios
            const requiredField = ["fullname", "email", "birthday", "username", "password"]

            requiredField.forEach(el => {
                let requiredFlag = false

                userData.hasOwnProperty(el) ? null : requiredFlag = true

                if (requiredFlag) throw new Error(msg.erroMsg.incompleteData)
            })

            //creacion de usuario
            const updateUser = {
                admin: userData.admin ? userData.admin : 0,
                fullname: userData.fullname,
                email: userData.email,
                birthday: userData.birthday,
                address: userData.address ? userData.address : null,
                username: userData.username,
                password: userData.password
            }

            //query config
            const query = queryUser.newQuery()
            query.addWhere(userId, "userId")

            return await User.update(updateUser, query.config)

        } catch (err) {
            console.log(err.message)
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
        }
    }
}