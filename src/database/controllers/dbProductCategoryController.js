const { Product_Category, seqQuery } = require("../models")
const msg = require("./dbMessage")
const { v4: uuid } = require("uuid")
const validator = require("../seqQueyConfig/assets/validators")

const queryProductCategory = seqQuery.newModel("Product_Category")

module.exports = class DbProductCategory {
    static async getAllProductCategory() {
        try {
            const productCategories = await Product_Category.findAll()

            if (!productCategories.length) throw new Error(msg.erroMsg.emptyTable + "Catgeorias de Productos")

            return productCategories
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getProductCategoryById(productCategoryId) {
        try {

            //validacion de ID
            validator.idValidator(productCategoryId)

            const productCategory = await Product_Category.findByPk(productCategoryId)

            if (!productCategory) throw new Error(msg.erroMsg.notExistId + productCategoryId)

            return productCategory
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async createProductCategory(data, transaction) {
        try {
            const { productId, categoryId } = data

            //Verificacion de campos obligatorios
            const requiredFields = ["productId", "categoryId"]

            const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);

            //creacion de caracteristica
            const newProductCategory = {
                productCategoryId: uuid(),
                productId,
                categoryId
            }

            return await Product_Category.create(newProductCategory, {transaction})

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async bulkCreateProductCategory(ProductCategoryData, transaction) {
        try {
            const newProductCategory = []

            for (const data of ProductCategoryData) {
                const { productId, categoryId } = data

                //Verificacion de campos obligatorios
                const requiredFields = ["productId", "categoryId"]

                const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));

                if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);

                //creacion de caracteristica
                newProductCategory.push({
                    productCategoryId: uuid(),
                    productId,
                    categoryId
                })
            }

            return await Product_Category.bulkCreate(newProductCategory, { transaction })

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async updateProductCategoryData(productCategoryId, data) {
        try {
            const { productId, categoryId } = data

            //validacion de ID
            validator.idValidator(productCategoryId)

            //Verificacion de campos obligatorios
            const requiredFields = ["productId", "categoryId"]

            const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);


            //caracteristica modificada
            const updateProductCategory = {
                productId,
                categoryId
            }

            //query config
            const query = queryProductCategory.newQuery()
            query.addWhere(productCategoryId, "productCategoryId")

            return await Product_Category.update(updateProductCategory, query.config)

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async deleteProductCategory(deleteId, deleteParam, transaction) {
        try {

            //validacion de ID
            validator.idValidator(deleteId)

            //query config
            const query = queryProductCategory.newQuery()
            query.addWhere(deleteId, `${deleteParam}`)

            const result = await Product_Category.destroy(query.config, { transaction })

            if (!result) throw new Error(msg.erroMsg.notExistId)

            return result
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }
}