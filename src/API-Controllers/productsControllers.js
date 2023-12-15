
const fs = require("fs")
const path = require("path")


const controllers = {
    productoDetail: (req,res) => res.render("productDetail.ejs"),
    productEdit :  (req, res) => res.render("productEdit.ejs"),
    productCart: (req,res) => res.render("productCart.ejs"),
    productStore: (req,res) => {
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
        }
        newProduct.feature = feature

        productsDb.push(newProduct)

        const newProductDbJSON = JSON.stringify(productsDb, null, " ") 
        fs.writeFileSync(pathProductDb, newProductDbJSON)
        

        res.redirect("/products/edit")
    },
}
/* {
    "id": 3,
    "name": "Teclado Hyperx Alloy FPS",
    "brand": "Hyperx",
    "shortDescription": "Teclado gamer RGB idioma ENG switches BLUE",
    "longDescription": "Sumérgete en el mundo de los videojuegos con el teclado gamer HyperX Alloy Core RGB. Diseñado especialmente para los amantes de los juegos, este teclado cuenta con un diseño QWERTY en español latinoamérica y una conexión USB 2.0 para garantizar una experiencia de juego fluida y sin interrupciones.",
    "image": "/gabinete.png",
    "alt": "Imagen de teclado",
    "mainCategory": "Periféricos",
    "features": {
        "language": "eng",
        "connectivity": "wired",
        "color": "black",
        "lighting": "rgb",
        "size": "full-size"
    },
    "price": 95000,
    "stock": 15,
    "score": 75,
    "discount": 10
} */


module.exports = controllers;