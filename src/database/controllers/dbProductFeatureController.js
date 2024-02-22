const { Product_Feature, seqQuery } = require("../models")
const msg = require("./dbMessage")
const { v4: uuid } = require("uuid")
const validator = require("../seqQueyConfig/assets/validators")

const queryPrdouctFeature = seqQuery.newModel("Product_Feature")

module.exports = class DbPrdouctFeatureController {
    static async getAllPrdouctFeatures() {
        try {
            const specification = await Product_Feature.findAll()

            if (!specification.length) throw new Error(msg.erroMsg.emptyTable + "Especificación")

            return specification
        } catch (err) {
            console.log(err.message)
        }
    }

    static async getPrdouctFeatureById(productFeatureId) {
        try {
            //validacion de ID
            validator.idValidator(productFeatureId)

            const specification = await Product_Feature.findByPk(productFeatureId)

            if (!specification) throw new Error(msg.erroMsg.notExistId + productFeatureId)

            return specification
        } catch (err) {
            console.log(err.message)
        }
    }

    static async createPrdouctFeature(data) {
        try {
            const { productId, featureId, specification } = data

            //Verificacion de campos obligatorios
            const requiredFields = ["productId", "featureId", "specification"]

            const missingFields = requiredFields.filter(field => !userData.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);

            //creacion de caracteristica
            const newProductFeature = {
                productFeatureId: uuid(),
                productId,
                featureId,
                specification
            }

            return await Product_Feature.create(newProductFeature)

        } catch (err) {
            console.log(err.message)
        }
    }

    static async updatePrdouctFeatureData(productFeatureId, data) {
        try {
            const { productId, featureId, specification } = data

            //validacion de ID
            validator.idValidator(productFeatureId)
            
            //Verificacion de campos obligatorios
            const requiredFields = ["productId", "featureId", "specification"]

            const missingFields = requiredFields.filter(field => !userData.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);

            //caracteristica modificada
            const updateProductFeature =  {
                productId,
                featureId,
                specification
            }

            //query config
            const query = queryPrdouctFeature.newQuery()
            query.addWhere(productFeatureId, "productFeatureId")

            return await Product_Feature.update(updateProductFeature, query.config)

        } catch (err) {
            console.log(err.message)
        }
    }

    static async deletePrdouctFeature(productFeatureId) {
        try {
            //validacion de ID
            validator.idValidator(productFeatureId)

            //query config
            const query = queryPrdouctFeature.newQuery()
            query.addWhere(productFeatureId, "productFeatureId")

            const result = await Product_Feature.destroy(query.config)

            if (!result) throw new Error(msg.erroMsg.notExistId)

            return result
        } catch (err) {
            console.log(err.message)
        }
    }
}