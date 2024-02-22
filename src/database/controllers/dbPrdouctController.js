const { Product, Sequelize, Favorite, seqQuery } = require("../models")
const msg = require("./dbMessage")
const validator = require("../seqQueyConfig/assets/validators")

const queryProduct = seqQuery.newModel("Product")


module.exports = class DbProductController {

    static async getAllProducts() {
        try {
            //query config
            const query = queryProduct.newQuery(["images", "categories", "comments", "features", "favorites"])
            query.addAssociation("user", ["comments"])
            query.addAssociation("specifications", ["features"])
            query.addAttribute(["commentBody", "score"], "comments")

            //En la siguiente linea incluyo manualmente attributes debido a que no cree una funcion para aplicar atributos en asociaciones de asociaciones.. solo en primera linea
            query.config.include[2].include[0].attributes = ["userId", "username", "email"]

            const literal = "(SELECT COUNT(*) FROM favorites WHERE favorites.productId = Product.productId)"
            query.addLiteral(literal, "attributes", "favorites")

            //Consulta a DB
            const products = await Product.findAll(query.config)

            if (!products.length) throw new Error(msg.erroMsg.emptyTable + "Producto")

            return products
        } catch (err) {
            console.log(err.message)
        }
    }

    static async getProductById(productId) {
        try {

            //validacion de ID
            validator.idValidator(productId)

            //query config
            const query = queryProduct.newQuery(["images", "categories", "comments", "features", "favorites"])
            query.addAssociation("user", ["comments"])
            query.addAssociation("specifications", ["features"])
            query.addAttribute(["commentBody", "score"], "comments")
            //En la siguiente linea incluyo manualmente attributes debido a que no cree una funcion para aplicar atributos en asociaciones de asociaciones.. solo en primera linea
            query.config.include[2].include[0].attributes = ["userId", "username", "email"]

            const product = await Product.findByPk(productId, query.config)

            if (!product) throw new Error(msg.erroMsg.notExistId + productId)

            return product
        } catch (err) {
            console.log(err.message)
        }
    }

    static async getProductSearch(keywords) {
        try {
            //query config
            const query = queryProduct.newQuery()
            query.filterByString(keywords, "productName")

            //Busqueda en mi DB
            const searchResult = await Product.findAll(quer.config)

            return searchResult
        } catch (err) {
            console.log(err.message)
        }
    }
    //createProduct -- incluir Product_Feature / Images / Product_Category
}
 