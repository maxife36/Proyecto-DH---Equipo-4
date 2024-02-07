const db = require("../models")
const msg = require("../dbMessages")


module.exports = {
    getAllUsers: async () => {
        try {
            const users = await db.User.findAll({
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
            const user = await db.User.findByPk(userId, {
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
            const user = await db.User.findOne({
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
            const user = await db.User.findOne({
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
            const user = await db.User.findByPk(userId, {
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
            const user = await db.User.findByPk(userId, {
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
            const user = await db.User.findByPk(userId, {
                include: [{
                    association: "productsReviews",
                    attributes: ["productId" ,'productName', 'score'],
                    include: [
                        {
                            association: "comments",
                            attributes: ["commentId",'commentBody', 'score']  
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
            const user = await db.User.findByPk(userId, {
                include: [{
                    association: "favoriteProducts",
                    attributes: ["productId" ,'productName']
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


}