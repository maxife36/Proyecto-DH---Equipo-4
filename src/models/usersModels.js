const path = require("path")
const fs = require("fs")
const pathUserDb = path.join(__dirname, "..", "temporary-DB", "users-DB.json")


const usersModels = {
    findAll: function () {
        const usersDbJSON = fs.readFileSync(pathUserDb, "utf-8")
        const usersDb = JSON.parse(usersDbJSON)
        return usersDb

    },

    findByPk: function (id) {
        const usersDb = this.findAll()
        const user = usersDb.find(el => el.id == id)

        return user 
    },

    findByParams: function (params, value) {
        const usersDb = this.findAll()
        const filteredUser = usersDb.filter(el => el[params] == value)

        return filteredUser
    },

    create: function (user) {
        const usersDb = this.findAll()
        usersDb.push(user)

        const newUserDbJSON = JSON.stringify(usersDb, null, " ") 
        fs.writeFileSync(pathUserDb, newUserDbJSON)
    },

/* 
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
    } */
    }
 


module.exports = usersModels