const path = require('path')
const fs = require('fs')
const pathProductDb = path.join(__dirname, "..", "temporary-DB", "products-DB.json")


const productsModels = {
    findAll: function () {
        const productsDbJSON = fs.readFileSync(pathProductDb, "utf-8")
        const productsDb = JSON.parse(productsDbJSON)

        return productsDb
    },

    findByPk: function (id) {
        const productsDb = this.findAll()
        const product = productsDb.find(el => el.id == id)

        return product 
    },

    findByParams: function (params, value) {
        const productsDb = this.findAll()
        const filteredProducts = productsDb.filter(el => el[params] == value)

        return filteredProducts
    },

    create: function (product) {
        const productsDb = this.findAll()
        productsDb.push(product)

        const newProductDbJSON = JSON.stringify(productsDb, null, " ") 
        fs.writeFileSync(pathProductDb, newProductDbJSON)
    },

    update: function (product) {
        const productsDb = this.findAll()
        this.destroy(product.id)
        this.create(product)
    },

    destroy: function (id) {
        const productsDb = this.findAll()
        const updatedProductsDb = productsDb.filter(el => el.id != id)

        const newProductDbJSON = JSON.stringify(productsDb, null, " ") 
        fs.writeFileSync(pathProductDb, newProductDbJSON)
    }
    }
 
module.exports = productsModels