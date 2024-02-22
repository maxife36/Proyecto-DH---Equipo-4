const { Cart_Product , seqQuery } = require("../models")
const msg = require("./dbMessage")
const { v4: uuid } = require("uuid")
const validator = require("../seqQueyConfig/assets/validators")

const queryCartProduct = seqQuery.newModel("Cart_Product")

module.exports = class DbCartProductController {
    static async getAllCartProducts() {
        try {
            const cartProducts = await Cart_Product.findAll()

            if (!cartProducts.length) throw new Error(msg.erroMsg.emptyTable + "Carritos y Productos")

            return cartProducts
        } catch (err) {
            console.log(err.message)
        }
    }

    static async getCartProductById(cartProductId) {
        try {

            //validacion de ID
            validator.idValidator(cartProductId)

            const cartProduct = await Cart_Product.findByPk(cartProductId)

            if (!cartProduct) throw new Error(msg.erroMsg.notExistId + cartProductId)

            return cartProduct
        } catch (err) {
            console.log(err.message)
        }
    }

    static async createCartProduct(data) {
        try {
            const { cartId, productId, quantity ,total } = data

            //Verificacion de campos obligatorios
            const requiredFields = ["cartId", "productId", "quantity", "total"]

            const missingFields = requiredFields.filter(field => !userData.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);

            //creacion de caracteristica
            const newCartProduct = {
                cartProductId: uuid(),
                cartId,
                productId,
                quantity,
                total
            }

            return await Cart_Product.create(newCartProduct)

        } catch (err) {
            console.log(err.message)
        }
    }

    static async updateCartProductData(cartProductId, data) {
        try {
            const { cartId, productId, quantity ,total  } = data

            //validacion de ID
            validator.idValidator(cartProductId)

            //Verificacion de campos obligatorios
            const requiredFields = ["cartId", "productId", "quantity", "total"]

            const missingFields = requiredFields.filter(field => !userData.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);


            //caracteristica modificada
            const updateCartProduct = {
                cartId,
                productId,
                quantity,
                total
            }

            //query config
            const query = queryCartProduct.newQuery()
            query.addWhere(cartProductId, "cartProductId")

            return await Cart_Product.update(updateCartProduct, query.config)

        } catch (err) {
            console.log(err.message)
        }
    }

    static async deleteCartProduct(cartProductId) {
        try {

            //validacion de ID
            validator.idValidator(cartProductId)

            //query config
            const query = queryCartProduct.newQuery()
            query.addWhere(cartProductId, "cartProductId")

            const result = await Cart_Product.destroy(query.config)

            if (!result) throw new Error(msg.erroMsg.notExistId)

            return result
        } catch (err) {
            console.log(err.message)
        }
    }
}