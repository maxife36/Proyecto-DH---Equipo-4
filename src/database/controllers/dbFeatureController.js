const { Feature, seqQuery } = require("../models")
const msg = require("./dbMessage")
const { v4: uuid } = require("uuid")
const validator = require("../seqQueyConfig/assets/validators")

const queryFeature = seqQuery.newModel("Feature")

module.exports = class DbFeature {
    static async getAllFeatures() {
        try {
            const features = await Feature.findAll()

            if (!features.length) throw new Error(msg.erroMsg.emptyTable + "Caracteristicas")

            return features
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getFeatureById(featureId) {
        try {

            //validacion de ID
            validator.idValidator(featureId)

            const feature = await Feature.findByPk(featureId)

            if (!feature) throw new Error(msg.erroMsg.notExistId + featureId)

            return feature
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async createFeature(data) {
        try {
            const { featureName, featureIcon} = data

            //Verificacion de campos obligatorios
            const requiredFields = ["featureName", "featureIcon"]

            const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);

            //creacion de caracteristica
            const newFeature = {
                featureId: uuid(),
                featureName,
                featureIcon
            }

            return await Feature.create(newFeature)

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async updateFeatureData(featureId, data) {
        try {
            const { featureName, featureIcon} = data

            //validacion de ID
            validator.idValidator(featureId)

            //Verificacion de campos obligatorios
            const requiredFields = ["featureName", "featureIcon"]

            const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);


            //caracteristica modificada
            const updateFeature = {
                featureName,
                featureIcon
            }

            //query config
            const query = queryFeature.newQuery()
            query.addWhere(featureId, "featureId")

            return await Feature.update(updateFeature, query.config)

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async deleteFeature(featureId) {
        try {

            //validacion de ID
            validator.idValidator(featureId)

            //query config
            const query = queryFeature.newQuery()
            query.addWhere(featureId, "featureId")

            const result = await Feature.destroy(query.config)

            if (!result) throw new Error(msg.erroMsg.notExistId)

            return result
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }
}