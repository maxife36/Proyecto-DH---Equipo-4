

const fs = require("fs")
const path = require("path")
const productsModels = require("../models/productsModels")

const controllers = {
    productoDetail: (req,res) => res.render("productDetail.ejs"),
    editPage :  (req, res) => {
        const productId = req.params.id
        let productsToEdit = productsModels.findByPk(productId)

        res.render("productEdit.ejs", {product: productsToEdit})
    },

    createPage :  (req, res) => res.render("productCreate.ejs"),
    productCart: (req,res) => res.render("productCart.ejs"),
    productCreate: (req,res) => {
        const body = req.body
        const productsDb = productsModels.findAll()
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
        
        productsModels.create(newProduct)

        res.redirect("/products/edit")
    },

    productEdit: (req, res) => {
        const productId = req.params.id
        const body = req.body
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
        }
        newProduct.feature = feature

        productsModels.update(newProduct)

        res.redirect(`/products/edit/${productId}`)

    },

    productDelete: (req,res) => {
        const productId = req.params.id

        productsModels.destroy(productId)

        res.redirect("/")
    }
}


module.exports = controllers;