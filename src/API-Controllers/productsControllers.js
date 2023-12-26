

const fs = require("fs")
const path = require("path")


const controllers = {
    productoDetail: (req,res) => res.render("productDetail.ejs"),
    editPage :  (req, res) => {
        const productId = req.params.id
        const pathProductDb = path.join(__dirname, "..", "temporary-DB", "products-DB.json")
        const productsDbJSON = fs.readFileSync(pathProductDb, "utf-8")
        const productsDb = JSON.parse(productsDbJSON)
        let productsToEdit = null

        for(let i = 0; i < productsDb.length; i++){
            if(productId == productsDb[i].id){
                productsToEdit = productsDb[i]
            }
        }
        res.render("productEdit.ejs", {product: productsToEdit})
    },
    createPage :  (req, res) => res.render("productCreate.ejs"),
    productCart: (req,res) => res.render("productCart.ejs"),
    productCreate: (req,res) => {
        const body = req.body
        const pathProductDb = path.join(__dirname, "..", "temporary-DB", "products-DB.json")
        const productsDbJSON = fs.readFileSync(pathProductDb, "utf-8")
        const productsDb = JSON.parse(productsDbJSON)
        const feature = {}
        
        for(let i = 0; i < body.features.length; i++){
            const featureKey = body.features[i]
            const featureValueOriginal = body[`featureItem${i}`]
            const featureValue = featureValueOriginal.filter(el => !!el)
            feature[featureKey] = featureValue

        }


        const newProduct = {
            id: Date.now(),
            name: body.name,
            shortDescription: body.shortDescription,
            price: body.price,
            stock: body.stock,
            image: req.file.filename         
        }
        newProduct.feature = feature

        productsDb.push(newProduct)

        const newProductDbJSON = JSON.stringify(productsDb, null, " ") 
        fs.writeFileSync(pathProductDb, newProductDbJSON)
        

        res.redirect("/")
    },
    productEdit: (req, res) => {
        const productId = req.params.id
        const body = req.body
        const pathProductDb = path.join(__dirname, "..", "temporary-DB", "products-DB.json")
        const productsDbJSON = fs.readFileSync(pathProductDb, "utf-8")
        const productsDbOriginal = JSON.parse(productsDbJSON)
        const productsDb = productsDbOriginal.filter(el => el.id != productId)
        const feature = {}

        for(let i = 0; i < body.features.length; i++){
            const featureKey = body.features[i]
            const featureValueOriginal = body[`featureItem${i}`]
            const featureValue = featureValueOriginal.filter(el => !!el)
            feature[featureKey] = featureValue

        }


        const newProduct = {
            id: productId,
            name: body.name,
            shortDescription: body.shortDescription,
            price: body.price,
            stock: body.stock,
            image: req.file.filename          
        }
        newProduct.feature = feature

        productsDb.push(newProduct)

        const newProductDbJSON = JSON.stringify(productsDb, null, " ") 
        fs.writeFileSync(pathProductDb, newProductDbJSON)
        

        res.redirect(`/products/edit/${productId}`)

    },
    productDelete: (req,res) => {
        const productId = req.params.id
        const pathProductDb = path.join(__dirname, "..", "temporary-DB", "products-DB.json")
        const productsDbJSON = fs.readFileSync(pathProductDb, "utf-8")
        const productsDbOriginal = JSON.parse(productsDbJSON)
        const productsDb = productsDbOriginal.filter(el => el.id != productId)

        const deletedProductDbJSON = JSON.stringify(productsDb, null, " ") 
        fs.writeFileSync(pathProductDb, deletedProductDbJSON)

        res.redirect("/")
    }
}


module.exports = controllers;