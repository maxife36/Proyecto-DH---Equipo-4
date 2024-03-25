const fs = require("fs")
const { validationResult } = require("express-validator");
const { DbProduct, DbFeature, DbCategory, DbUser, DbComment } = require("../database/controllers");
const path = require("path");

const controllers = {
    allCategories: async (req, res) => {
        try {
            const allCategories = await DbCategory.getAllCategories()

            res.send(allCategories)
        } catch (err) {
            throw new Error(err.message)
        }
    }, 
    allFeatures: async (req, res) => {
        try {
            const allFeatures = await DbFeature.getAllFeatures()

            res.send(allFeatures)
        } catch (err) {
            throw new Error(err.message)
        }
    },
    productDetail: async (req, res) => {
        try {
            const userId = req.session.loggedUser

            const productId = req.params.productId

            const product = await DbProduct.getProductById(productId)

            if (product) {
                const userInfo = await DbUser.getUserById(userId)
                if (userInfo) {
                    product.currentUsername = userInfo.username
                }

                const numComments = product.comments.length

                //Creo nueva propiedad con el score global
                if (numComments) {
                    let sumCommentsScore = 0

                    product.comments.forEach(comment => {
                        sumCommentsScore += comment.score
                    });

                    product.totalScore = sumCommentsScore / numComments
                }
            }
            
            res.render("productDetail", { product })

        } catch (err) {
            console.log(err.message);
            res.status(404).render("notFound")
        }
    },
    showCreateForm: async (req, res) => {
        try {
            const allCategories = await DbCategory.getAllCategories()
            const allFeatures = await DbFeature.getAllFeatures()

            res.render("productCreate", { allCategories, allFeatures})
        } catch (err) {
            throw new Error(err.message)
        }
    },
    showEditForm: async (req, res) => {
        try {
            const productId = req.params.productId

            const allCategories = await DbCategory.getAllCategories()
            const allFeatures = await DbFeature.getAllFeatures()
            const product = await DbProduct.getProductById(productId)

            res.render("productEdit", { product, allCategories, allFeatures })
        } catch (err) {
            throw new Error(err.message)
        }
    },
    filterProduct: async (req, res) => {
        try {
            //[gte ,lte, order]

            const gte = req.query.gte
            const lte = req.query.lte
            const order = req.query.order

            const products = await DbProduct.getProductByPrice(gte, lte, order)

            res.render("/", { products }) //Cambiar a pagina de productos

        } catch (err) {
            throw new Error(err.message)
            // console.log(err.message);
            // res.status(400).render("errorPage")
        }
    },
    searchProduct: async (req, res) => {
        try {
            //keywords = string de busqueda

            const keywords = req.query.keyword

            const products = await DbProduct.getSearchProduct(keywords)

            res.render("/", { products }) //Cambiar a pagina de productos

        } catch (err) {
            throw new Error(err.message)
            // console.log(err.message);
            // res.status(400).render("errorPage")
        }
    },
    processCreate: async (req, res) => {
        try {
            /* OBJETO QUE SE DEBE ENVIAR AL CONTROLADOR DE LA DB
            {
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
      
            const { customeData: customeDataJSON } = req.body
            
            const images = req.files         
            
            const customeData = customeDataJSON? JSON.parse(customeDataJSON) : {}
                  
            const { productName, productBrand, shortDescription, longDescription, categories, productPrice, discount, stock, features } = customeData
            
            const errors = validationResult(req).errors;
             
            if (!images.length) errors.push({
                type: "field",
                value: images,
                msg: "Debe proporcionar al menos 1 foto del producto.",
                path: "images",
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
                    stock,
                    features
                }
                        
                //Procesado de Categorias
                
                const categoryInfo = await DbCategory.getCategoryById(categories[0])
                
                data.categories = [categoryInfo.categoryId]
                
                //Procesado de imagenes
                
                const imageTitles = []
                
                for (const imageInfo of images) {
                    imageTitles.push(`/${imageInfo.filename}`)
                }
                
                data.imageTitles = imageTitles
                
                //Creacion del Producto 
                
                const product = await DbProduct.createProduct(data)
                
                if(product) return res.send([true, product.productId])   
        }
        
            res.send([false, errors])
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

            const { customeData: customeDataJSON } = req.body
            
            const images = req.files         
            
            const customeData = customeDataJSON? JSON.parse(customeDataJSON) : {}
                  
            const { productName, productBrand, shortDescription, longDescription, categories, productPrice, discount, stock, features } = customeData

            const errors = validationResult(req).errors;

            if (!images.length) errors.push({
                type: "field",
                value: images,
                msg: "Debe proporcionar al menos 1 foto del producto.",
                path: "images",
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

                const categoryInfo = await DbCategory.getCategoryById(categories[0])

                data.categories = [categoryInfo.categoryId]

                //Procesado de imagenes

                const imageTitles = []

                for (const imageInfo of images) {
                    imageTitles.push(`/${imageInfo.filename}`)
                }

                data.imageTitles = imageTitles

                //Creacion del Producto 
                const product = await DbProduct.updateProductData(productId, data)

                if(product) return res.send([true, product.productId]) 
            }

            res.send([false, errors])
        } catch (err) {
            throw new Error(err.message)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.productId

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
    },
    productDisplay: async (req, res) => {
        try {
            /* por query categoryId, keywords, gte, lte , order, limit, offset*/
            const filtersKeys = Object.keys(req.query)

            const { allData, isFirst } = req.query

            if (Boolean(isFirst)) return res.status(200).render("productsDisplay", { products: [] })


            if (!filtersKeys.length) throw new Error("No se pasaron parametros validos")

            const filterObj = {}

            filtersKeys.forEach(filterKey => filterObj[filterKey] = req.query[filterKey])

            const products = await DbProduct.customFilter(filterObj)

            if (Boolean(allData)) return res.send(products)

            res.status(200).render("productsDisplay", { products })
        } catch (err) {
            throw new Error(err.message)
        }
    },
    commentProduct: async (req, res) => {
        try {
            const productId = req.params.productId
            const userId = req.session.loggedUser
            const { commentBody, score } = req.body

            data = { userId, productId, commentBody, score }

            const newComment = await DbComment.createComment(data)

            if (!newComment) return res.send([false, "No se agrego el comentario"]) 

            return res.redirect(`/products/detail/${productId}`)
        } catch (error) {
            console.log(error.message);
        }
    },
    deleteComment: async (req, res) => {
        try {
            const userId = req.session.loggedUser
            const { commentId } = req.body

            if (userId) {
                const commentDeleted = await DbComment.deleteComment(commentId)
                
                if (!commentDeleted) return res.send([false, "No se elimino el comentario"]) 

                console.log(commentDeleted);
                return res.send(`${commentDeleted}`)
            }

            return res.send(false)
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = controllers;

