const { Cart , seqQuery } = require("../models")
const msg = require("./dbMessage")
const { v4: uuid } = require("uuid")
const validator = require("../seqQueyConfig/assets/validators")

const queryCart = seqQuery.newModel("Cart")

module.exports = class DbCart {
    static async getAllCarts() {
        try {
            const carts = await Cart.findAll()

            if (!carts.length) throw new Error(msg.erroMsg.emptyTable + "Carritos")

            return carts
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getCartById(cartId) {
        try {

            //validacion de ID
            validator.idValidator(cartId)

            const cart = await Cart.findByPk(cartId)

            if (!cart) throw new Error(msg.erroMsg.notExistId + cartId)

            return cart
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async createCart(data) {
        try {
            const { userId, amount} = data

            //Verificacion de campos obligatorios
            const requiredFields = ["userId"]

            const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);

            //creacion de caracteristica
            const newCart = {
                cartId: uuid(),
                userId,
                amount
            }

            return await Cart.create(newCart)

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async updateCartData(cartId, data) {
        try {
            const {userId, amount} = data

            //validacion de ID
            validator.idValidator(cartId)

            //Verificacion de campos obligatorios
            const requiredFields = ["userId"]

            const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);


            //caracteristica modificada
            const updateCart = {
                userId,
                amount
            }

            //query config
            const query = queryCart.newQuery()
            query.addWhere(cartId, "cartId")

            return await Cart.update(updateCart, query.config)

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async deleteCart(cartId) {
        try {

            //validacion de ID
            validator.idValidator(cartId)

            //query config
            const query = queryCart.newQuery()
            query.addWhere(cartId, "cartId")

            const result = await Cart.destroy(query.config)

            if (!result) throw new Error(msg.erroMsg.notExistId)

            return result
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }
}