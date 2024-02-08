const { User } = require("../models")
const msg = require("../dbMessages")
const { v4: uuid } = require("uuid")


module.exports = {
    getAllUsers: async () => {
        try {
            const users = await User.findAll({
                include: ["cart"]
            })

            if (!users.length) throw new Error(msg.erroMsg.emptyTable + "Usuarios")

            return users
        } catch (err) {
            throw new Error(err.message)
        }
    },
    getUserByPk: async (userId) => {
        try {
            const user = await User.findByPk(userId, {
                include: ["cart"]
            })

            if (!user) throw new Error(msg.erroMsg.notExistId + userId)

            return user.dataValues
        } catch (err) {
            throw new Error(err.message)
        }
    },
    getUserByEmail: async (email) => {
        try {
            const user = await User.findOne({
                where: { email },
                include: ["cart"]
            })

            if (!user) throw new Error(msg.erroMsg.notExistField + `email = ${email}`)

            return user
        } catch (err) {
            throw new Error(err.message)
        }
    },
    getUserByUsername: async (username) => {
        try {
            const user = await User.findOne({
                where: { username },
                include: ["cart"]
            })

            if (!user) throw new Error(msg.erroMsg.notExistField + `Username = ${username}`)

            return user
        } catch (err) {
            throw new Error(err.message)
        }
    },
    getUserPurchase: async (userId) => {
        try {
            const user = await User.findByPk(userId, {
                include: ["purchases"]
            })

            if (!user) throw new Error(msg.erroMsg.notExistId + userId)

            return {
                userId: user.userId,
                purchases: user.purchases
            }
        } catch (err) {
            throw new Error(err.message)
        }
    },
    getUserCreditcards: async (userId) => {
        try {
            const user = await User.findByPk(userId, {
                include: ["creditCards"]
            })

            if (!user) throw new Error(msg.erroMsg.notExistId + userId)

            return {
                userId: user.userId,
                creditCards: user.creditCards
            }
        } catch (err) {
            throw new Error(err.message)
        }
    },
    getUserCommentedProducts: async (userId) => {
        try {
            const user = await User.findByPk(userId, {
                include: [{
                    association: "productsReviews",
                    attributes: ["productId", 'productName', 'score'],
                    include: [
                        {
                            association: "comments",
                            attributes: ["commentId", 'commentBody', 'score']
                        }
                    ]
                }]
            })

            if (!user) throw new Error(msg.erroMsg.notExistId + userId)

            return {
                userId: user.userId,
                products: user.productsReviews
            }
        } catch (err) {
            throw new Error(err.message)
        }
    },
    getUserFavoritesProducts: async (userId) => {
        try {
            const user = await User.findByPk(userId, {
                include: [{
                    association: "favoriteProducts",
                    attributes: ["productId", 'productName']
                }]
            })

            if (!user) throw new Error(msg.erroMsg.notExistId + userId)

            return {
                userId: user.userId,
                products: user.favoriteProducts
            }
        } catch (err) {
            throw new Error(err.message)
        }
    },
    createUser: async (userData) => {
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
            throw new Error(err.message)
        }
    },
    updateUserData: async (userId, userData) => {
        try {

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

            return await User.update(updateUser,{
                where : { userId }
            })

        } catch (err) {
            throw new Error(err.message)
        }
    },
    deleteUser: async (userId) => {
        try {
            const result = await User.destroy({
                where: {
                  userId: userId,
                },
              })

            if (!result) throw new Error(msg.erroMsg.notExistId)

            return result
        } catch (err) {
            throw new Error(err.message)
        }
    }
}