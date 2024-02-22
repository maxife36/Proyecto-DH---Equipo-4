const { Favorite , seqQuery } = require("../models")
const msg = require("./dbMessage")
const { v4: uuid } = require("uuid")
const validator = require("../seqQueyConfig/assets/validators")

const queryFavorite = seqQuery.newModel("Favorite")

module.exports = class DbFavoriteController {
    static async getAllFavorites() {
        try {
            const favorites = await Favorite.findAll()

            if (!favorites.length) throw new Error(msg.erroMsg.emptyTable + "Favoritos")

            return favorites
        } catch (err) {
            console.log(err.message)
        }
    }

    static async getFavoriteById(favoriteId) {
        try {

            //validacion de ID
            validator.idValidator(favoriteId)

            const favorite = await Favorite.findByPk(favoriteId)

            if (!favorite) throw new Error(msg.erroMsg.notExistId + favoriteId)

            return favorite
        } catch (err) {
            console.log(err.message)
        }
    }

    static async createFavorite(data) {
        try {
            const { userId, productId } = data

            //Verificacion de campos obligatorios
            const requiredFields = ["userId", "productId"]

            const missingFields = requiredFields.filter(field => !userData.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);

            //creacion de caracteristica
            const newFavorite = {
                favoriteId: uuid(),
                userId,
                productId
            }

            return await Favorite.create(newFavorite)

        } catch (err) {
            console.log(err.message)
        }
    }

    static async updateFavoriteData(favoriteId, data) {
        try {
            const { userId, productId } = data

            //validacion de ID
            validator.idValidator(favoriteId)

            //Verificacion de campos obligatorios
            const requiredFields = ["userId", "productId"]

            const missingFields = requiredFields.filter(field => !userData.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);


            //caracteristica modificada
            const updateFavorite = {
                userId,
                productId
            }

            //query config
            const query = queryFavorite.newQuery()
            query.addWhere(favoriteId, "favoriteId")

            return await Favorite.update(updateFavorite, query.config)

        } catch (err) {
            console.log(err.message)
        }
    }

    static async deleteFavorite(favoriteId) {
        try {

            //validacion de ID
            validator.idValidator(favoriteId)

            //query config
            const query = queryFavorite.newQuery()
            query.addWhere(favoriteId, "favoriteId")

            const result = await Favorite.destroy(query.config)

            if (!result) throw new Error(msg.erroMsg.notExistId)

            return result
        } catch (err) {
            console.log(err.message)
        }
    }
}