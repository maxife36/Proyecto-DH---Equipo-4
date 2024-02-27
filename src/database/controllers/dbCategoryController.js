const { Category, seqQuery } = require("../models")
const msg = require("./dbMessage")
const { v4: uuid } = require("uuid")
const validator = require("../seqQueyConfig/assets/validators")

const queryCategory = seqQuery.newModel("Category")

module.exports = class DbCategory {
    static async getAllCategories() {
        try {
            const categories = await Category.findAll()

            if (!categories.length) throw new Error(msg.erroMsg.emptyTable + "Categorias")

            return categories
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getCategoryById(categoryId) {
        try {

            //validacion de ID
            validator.idValidator(categoryId)

            const category = await Category.findByPk(categoryId)

            if (!category) throw new Error(msg.erroMsg.notExistId + categoryId)

            return category
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getCategoryByTitle(categoryTitle) {
        try {
            //query config
            const query = queryCategory.newQuery()
            query.addWhere(categoryTitle, "categoryTitle")

            const category = await Category.findOne(query.config)

            if (!category) throw new Error(msg.erroMsg.notExistId + categoryTitle)

            return category
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async createCategory(categoryTitle) {
        try {
            //creacion de categoria
            const newCategory = {
                categoryId: uuid(),
                categoryTitle
            }

            return await Category.create(newCategory)

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async updateCategoryData(categoryId, categoryTitle) {
        try {
            //validacion de ID
            validator.idValidator(categoryId)

            //categoria modificada
            const updateCategory = { categoryTitle }

            //query config
            const query = queryCategory.newQuery()
            query.addWhere(categoryId, "categoryId")

            return await Category.update(updateCategory, query.config)

        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async deleteCategory(categoryId) {
        try {

            //validacion de ID
            validator.idValidator(categoryId)

            //query config
            const query = queryCategory.newQuery()
            query.addWhere(categoryId, "categoryId")

            const result = await Category.destroy(query.config)

            if (!result) throw new Error(msg.erroMsg.notExistId)

            return result
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }
}