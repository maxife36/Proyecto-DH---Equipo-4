const { Credit_Card , seqQuery } = require("../models")
const msg = require("./dbMessage")
const { v4: uuid } = require("uuid")
const validator = require("../seqQueyConfig/assets/validators")

const queryCreditCard = seqQuery.newModel("Credit_Card")

module.exports = class DbCreditCard {
    static async getAllCreditCards() {
        try {
            const creditCards = await Credit_Card.findAll()

            if (!creditCards.length) throw new Error(msg.erroMsg.emptyTable + "Tarjetas de Credito")

            return creditCards
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getCreditCardById(creditCardId) {
        try {

            //validacion de ID
            validator.idValidator(creditCardId)

            const creditCard = await Credit_Card.findByPk(creditCardId)

            if (!creditCard) throw new Error(msg.erroMsg.notExistId + creditCardId)

            return creditCard
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async createCreditCard(data) {
        try {
            const { userId, creditNumber, creditName ,expirationDate } = data

            //Verificacion de campos obligatorios
            const requiredFields = [ "userId", "creditNumber", "creditName", "expirationDate"]

            const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);

            //creacion de caracteristica
            const newCreditCard = {
                creditCardId: uuid(),
                userId,
                creditNumber,
                creditName,
                expirationDate
            }

            return await Credit_Card.create(newCreditCard)

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async updateCreditCardData(creditCardId, data) {
        try {
            const { userId, creditNumber, creditName ,expirationDate  } = data

            //validacion de ID
            validator.idValidator(creditCardId)

            //Verificacion de campos obligatorios
            const requiredFields = ["userId", "creditNumber", "creditName", "expirationDate"]

            const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);


            //caracteristica modificada
            const updateCreditCard = {
                userId,
                creditNumber,
                creditName,
                expirationDate
            }

            //query config
            const query = queryCreditCard.newQuery()
            query.addWhere(creditCardId, "creditCardId")

            return await Credit_Card.update(updateCreditCard, query.config)

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async deleteCreditCard(creditCardId) {
        try {

            //validacion de ID
            validator.idValidator(creditCardId)

            //query config
            const query = queryCreditCard.newQuery()
            query.addWhere(creditCardId, "creditCardId")

            const result = await Credit_Card.destroy(query.config)

            if (!result) throw new Error(msg.erroMsg.notExistId)

            return result
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }
}