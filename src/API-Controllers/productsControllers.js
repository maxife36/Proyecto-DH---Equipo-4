const fs = require("fs")
const { validationResult } = require("express-validator");
const { DbProduct, DbFeature, DbCategory } = require("../database/controllers");
const path = require("path");

const controllers = {
    productDetail: async (req, res) => {
        try {
            const productId = req.params.productId

            const product = await DbProduct.getProductById(productId)

            res.render("productDetail", { product })

        } catch (err) {
            console.log(err.message);
            res.status(404).render("notFound")
        }
    },
    showCreateForm: (req, res) => {
        try {
            res.render("productCreate")
        } catch (err) {
            throw new Error(err.message)
        }
    },
    showEditForm: async (req, res) => {
        try {
            const productId = req.params.productId

            const product = await DbProduct.getProductById(productId)
            console.log(product);
            res.render("productEdit", { product })
        } catch (err) {
            throw new Error(err.message)
        }
    },
    processCreate: async (req, res) => {
        try {
            /* OBJETO QUE SE DEBE ENVIAR AL CONTROLADOR DE LA DB
            {
                productId,
                productName,
                productBrand,
                shortDescription,
                longDescription,
                productPrice,
                discount,
                stock,
                score,
                features, //[{featureId,specifications}] ->specifications Array de strings con epsecifaciones por cada featureId
                imageTitles, //Array de nombres de imagenes
                categories // Array con ids de categorias
            } 
            */

            const { productName, productBrand, shortDescription, longDescription, categories, productPrice, discount, stock } = req.body

            const formData = req.body
            const images = req.files

            // Filtrado para obtener unicamente la info de features
            const featureKeys = Object.keys(formData).filter(el => el.startsWith('featureName'))
            const featureItemKeys = Object.keys(formData).filter(el => el.startsWith('featureItem'))

            const errors = validationResult(req).errors;

            if (!images.length) errors.push({
                type: "field",
                value: images,
                msg: "Debe proporcionar al menos 1 foto del producto.",
                path: "images",
                location: "body"
            })

            if (featureKeys.length !== featureItemKeys.length) errors.push({
                type: "field",
                value: undefined,
                msg: "Existen Caracteristicas sin especificaciones.",
                path: "features",
                location: "body"
            })


            if (!errors.length) {
                const data = {
                    productName,
                    productBrand,
                    shortDescription,
                    longDescription,
                    productPrice,
                    discount,
                    stock
                }

                //Procesado de Categorias

                const categoryInfo = await DbCategory.getCategoryByTitle(categories)

                data.categories = [categoryInfo.categoryId]

                //Procesado de imagenes

                const imageTitles = []

                for (const imageInfo of images) {
                    imageTitles.push(`/${imageInfo.filename}`)
                }

                data.imageTitles = imageTitles

                //Procesado de Features


                // Formacion del atributo features necesario
                const features = []

                for (const featureName of featureKeys) {
                    if (featureName === "default") continue

                    const feature = await DbFeature.getFeatureByName(formData[featureName])

                    const featureId = feature.featureId

                    const featureNumber = featureName.split('featureName')[1] // obtengo el numero del feature que estoy tratando

                    let specifications = formData[`featureItem${featureNumber}`]

                    specifications = specifications.filter(Boolean)

                    if (!specifications.length) continue

                    features.push({ featureId, specifications })
                }

                data.features = features

                //Creacion del Producto 
                const product = await DbProduct.createProduct(data)

                return res.render("productDetail", { product })
            }

            res.render("productCreate", { errors })
        } catch (err) {
            throw new Error(err.message)
        }
    },
    processEdit: async (req, res) => {
        try {
            /* OBJETO QUE SE DEBE ENVIAR AL CONTROLADOR DE LA DB
            {
                productId,
                productName,
                productBrand,
                shortDescription,
                longDescription,
                productPrice,
                discount,
                stock,
                features, //[{featureId,specifications}] ->specifications Array de strings con epsecifaciones por cada featureId
                imageTitles, //Array de nombres de imagenes
                categories // Array con ids de categorias
            } 
            */
            const productId = req.params.productId

            const { productName, productBrand, shortDescription, longDescription, categories, productPrice, discount, stock } = req.body

            const formData = req.body
            const images = req.files

            // Filtrado para obtener unicamente la info de features
            const featureKeys = Object.keys(formData).filter(el => el.startsWith('featureName'))
            const featureItemKeys = Object.keys(formData).filter(el => el.startsWith('featureItem'))

            const errors = validationResult(req).errors;

            if (!images.length) errors.push({
                type: "field",
                value: images,
                msg: "Debe proporcionar al menos 1 foto del producto.",
                path: "images",
                location: "body"
            })

            if (featureKeys.length !== featureItemKeys.length) errors.push({
                type: "field",
                value: undefined,
                msg: "Existen Caracteristicas sin especificaciones.",
                path: "features",
                location: "body"
            })

            if (!errors.length) {
                const data = {
                    productName,
                    productBrand,
                    shortDescription,
                    longDescription,
                    productPrice,
                    discount,
                    stock
                }

                //Procesado de Categorias

                const categoryInfo = await DbCategory.getCategoryByTitle(categories)

                data.categories = [categoryInfo.categoryId]

                //Procesado de imagenes

                const imageTitles = []

                for (const imageInfo of images) {
                    imageTitles.push(`/${imageInfo.filename}`)
                }

                data.imageTitles = imageTitles

                //Procesado de Features


                // Formacion del atributo features necesario
                const features = []

                for (const featureName of featureKeys) {
                    if (featureName === "default") continue

                    const feature = await DbFeature.getFeatureByName(formData[featureName])

                    const featureId = feature.featureId

                    const featureNumber = featureName.split('featureName')[1] // obtengo el numero del feature que estoy tratando

                    let specifications = formData[`featureItem${featureNumber}`]

                    specifications = specifications.filter(Boolean)

                    if (!specifications.length) continue

                    features.push({ featureId, specifications })
                }

                data.features = features

                //Creacion del Producto 
                const product = await DbProduct.updateProductData(productId, data)

                return res.render("productDetail", { product })
            }

            res.render("productCreate", { errors })
        } catch (err) {
            throw new Error(err.message)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.productId
            console.log(productId);
            const currentProduct = await DbProduct.getProductById(productId)

            await DbProduct.deleteProduct(productId)

            if (currentProduct.images) {

                for (const image of currentProduct.images) {

                    const profileImgPath = path.join(__dirname, `../../public/img/Products-Image${image.imageTitle}`)

                    fs.unlink(profileImgPath, (err) => {
                        if (err) {
                            console.error("Error al eliminar la Foto de Perfil:", err);
                        }
                        console.log("Foto de Perfil eliminado");
                    })
                }
            }

            res.redirect("/") //Monificar y poner el dashboard
        } catch (err) {
            throw new Error(err.message)
        }
    }
}

module.exports = controllers;

