const { Purchase, seqQuery } = require("../models")
const msg = require("./dbMessage")
const { v4: uuid } = require("uuid")
const validator = require("../seqQueyConfig/assets/validators")

const queryPurchase = seqQuery.newModel("Purchase")

module.exports = class DbPurchase {
    static async getAllPurchases() {
        try {
            const purchase = await Purchase.findAll()

            // if (!purchase.length) throw new Error(msg.erroMsg.emptyTable + "Purchasenes")

            return purchase
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }
    static async getPurchasesByUserId(userId) {
        try {
            //validacion de ID
            validator.idValidator(userId)

            //query config
            const query = queryPurchase.newQuery()
            query.addWhere(userId, "userId")
            query.filterByDateRange([0,0,"DESC"], "createdAt")

            const purchase = await Purchase.findAll(query.config)

            // if (!purchase.length) throw new Error(msg.erroMsg.emptyTable + "Purchasenes")

            return purchase
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getPurchaseById(purchaseId) {
        try {

            //validacion de ID
            validator.idValidator(purchaseId)

            const purchase = await Purchase.findByPk(purchaseId)

            if (!purchase) throw new Error(msg.erroMsg.notExistId + purchaseId)

            return purchase
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async createPurchase(purchaseData) {
        try {
            const { userId, data } = purchaseData

            //Verificacion de campos obligatorios
            const requiredFields = ["userId", "data"]

            const missingFields = requiredFields.filter(field => !purchaseData.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);

            //creacion de caracteristica
            const newPurchase = {
                purchaseId: uuid(),
                userId,
                data: JSON.stringify(data)
            }

            return await Purchase.create(newPurchase)

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async updatePurchaseData(purchaseId, purchaseData) {
        try {
            const { userId, data } = purchaseData

            //validacion de ID
            validator.idValidator(purchaseId)

            //Verificacion de campos obligatorios
            const requiredFields = ["userId", "data"]

            const missingFields = requiredFields.filter(field => !purchaseData.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);


            //caracteristica modificada
            const updatePurchase = {
                userId,
                data
            }

            //query config
            const query = queryPurchase.newQuery()
            query.addWhere(purchaseId, "purchaseId")

            return await Purchase.update(updatePurchase, query.config)

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async deletePurchase(purchaseId) {
        try {

            //validacion de ID
            validator.idValidator(purchaseId)

            //query config
            const query = queryPurchase.newQuery()
            query.addWhere(purchaseId, "purchaseId")

            const result = await Purchase.destroy(query.config)

            if (!result) throw new Error(msg.erroMsg.notExistId)

            return result
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }
}