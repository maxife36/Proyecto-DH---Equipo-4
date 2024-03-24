const { Cart_Product, seqQuery } = require("../models")
const DbProduct = require("./dbPrdouctController")
const msg = require("./dbMessage")
const { v4: uuid } = require("uuid")
const validator = require("../seqQueyConfig/assets/validators")

const queryCartProduct = seqQuery.newModel("Cart_Product")

module.exports = class DbCartProduct {
    static async getAllCartProducts() {
        try {
            const cartProducts = await Cart_Product.findAll()

            if (!cartProducts.length) throw new Error(msg.erroMsg.emptyTable + "Carritos y Productos")

            return cartProducts
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getCartProductsByUserId(userId) {
        try {
            //query config
            const query = queryCartProduct.newQuery(["cart", "product"])
            query.addWhere(userId, "userId", "cart")
            query.config.include[1].include = [{ association: "images" }]

            const cartProducts = await Cart_Product.findAll(query.config)

            return cartProducts
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getCartProductById(cartProductId) {
        try {

            //validacion de ID
            validator.idValidator(cartProductId)  

            //query config
            const query = queryCartProduct.newQuery(["cart", "product"])
            query.config.include[1].include = [{ association: "images" }]
           
            const cartProduct = await Cart_Product.findByPk(cartProductId, query.config)

            if (!cartProduct) throw new Error(msg.erroMsg.notExistId + cartProductId)

            return cartProduct
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async createCartProduct(data) {
        try {
            const { cartId, productId, quantity } = data

            //Verificacion de campos obligatorios
            const requiredFields = ["cartId", "productId", "quantity"]

            const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);

            //creacion de caracteristica
            const newCartProduct = {
                cartProductId: uuid(),
                cartId,
                productId,
                quantity
            }

            return await Cart_Product.create(newCartProduct)

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async updateCartProductData(cartProductId, data) {
        try {
            const { cartId, productId, quantity } = data

            //validacion de ID
            validator.idValidator(cartProductId)

            //Verificacion de campos obligatorios
            const requiredFields = ["cartId", "productId", "quantity"]

            const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);

            const productInfo = await DbProduct.getProductById(productId)
            const currentStock = productInfo?.stock

            if (quantity > currentStock) return [false, "No hay stock"]
            
            //caracteristica modificada
            const updateCartProduct = {
                cartId,
                productId,
                quantity
            }

            //query config
            const query = queryCartProduct.newQuery()
            query.addWhere(cartProductId, "cartProductId")

            return await Cart_Product.update(updateCartProduct, query.config)

        } catch (err) {
            console.log(err.message)
            throw err
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
            throw err
        }
    }

    static async cleanCartProductsByUserId(cartId) {
        try {
            //validacion de ID
            validator.idValidator(cartId)

            //query config
            const query = queryCartProduct.newQuery()
            query.addWhere(cartId, "cartId")

            const result = await Cart_Product.destroy(query.config)

            if (!result) throw new Error(msg.erroMsg.notExistId)

            return result
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }
}