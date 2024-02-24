const { Image , seqQuery } = require("../models")
const msg = require("./dbMessage")
const { v4: uuid } = require("uuid")
const validator = require("../seqQueyConfig/assets/validators")

const queryImage = seqQuery.newModel("Image")

module.exports = class DbImage {
    static async getAllImages() {
        try {
            const images = await Image.findAll()

            if (!images.length) throw new Error(msg.erroMsg.emptyTable + "Imagenes")

            return images
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getImageById(imageId) {
        try {

            //validacion de ID
            validator.idValidator(imageId)

            const image = await Image.findByPk(imageId)

            if (!image) throw new Error(msg.erroMsg.notExistId + imageId)

            return image
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async createImage(data, transaction) {
        try {
            const { productId, imageTitle} = data

            //Verificacion de campos obligatorios
            const requiredFields = ["productId", "imageTitle"]

            const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);

            //creacion de caracteristica
            const newImage = {
                imageId: uuid(),
                productId,
                imageTitle
            }

            return await Image.create(newImage, {transaction})

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async bulkCreateImage(ImageData, transaction) {
        try {
            const newImage = []

            for (const data of ImageData) {
                const { productId, imageTitle} = data
    
                //Verificacion de campos obligatorios
                const requiredFields = ["productId", "imageTitle"]
    
                const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));
    
                if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);
    
                //creacion de caracteristica
                newImage.push({
                    imageId: uuid(),
                    productId,
                    imageTitle
                })
            }

            return await Image.bulkCreate(newImage, {transaction})

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async updateImageData(imageId, data) {
        try {
            const { productId, imageTitle} = data

            //validacion de ID
            validator.idValidator(imageId)

            //Verificacion de campos obligatorios
            const requiredFields = ["productId", "imageTitle"]

            const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);


            //caracteristica modificada
            const updateImage = {
                productId,
                imageTitle
            }

            //query config
            const query = queryImage.newQuery()
            query.addWhere(imageId, "imageId")

            return await Image.update(updateImage, query.config)

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async deleteImage(deleteId, deleteParam, transaction) {
        try {

            //validacion de ID
            validator.idValidator(deleteId)

            //query config
            const query = queryImage.newQuery()
            query.addWhere(deleteId, `${deleteParam}`)

            const result = await Image.destroy(query.config, { transaction })

            if (!result) throw new Error(msg.erroMsg.notExistId)

            return result
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }
}