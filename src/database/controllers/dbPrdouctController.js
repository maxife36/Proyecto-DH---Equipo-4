const { Product, seqQuery, sequelize, Sequelize } = require("../models")
const msg = require("./dbMessage")
const { v4: uuid } = require("uuid")
const validator = require("../seqQueyConfig/assets/validators")

//Controladores de DB
const DbImage = require("./dbImageController")
const DbProductCategory = require("./dbProductCategoryController")
const DbPrdouctFeature = require("./dbProductFeatureController")

const queryProduct = seqQuery.newModel("Product")
module.exports = class DbProduct {

    static async getAllProducts() {
        try {
            //query config
            const query = queryProduct.newQuery(["images", "categories", "comments", "features", "favorites"])
            query.addAssociation("user", ["comments"])
            query.addAssociation("specifications", ["features"])
            query.addAttribute(["commentBody", "score"], "comments")

            //En la siguiente linea incluyo manualmente attributes debido a que no cree una funcion para aplicar atributos en asociaciones de asociaciones.. solo en primera linea
            query.config.include[2].include[0].attributes = ["userId", "username", "email"]

            const literal = "(SELECT COUNT(*) FROM favorites WHERE favorites.productId = Product.productId)"
            query.addLiteral(literal, "attributes", "favorites")

            //Consulta a DB
            const products = await Product.findAll(query.config)

            if (!products.length) throw new Error(msg.erroMsg.emptyTable + "Producto")

            return products
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getProductById(productId) {
        try {

            //validacion de ID
            validator.idValidator(productId)

            //query config
            const query = queryProduct.newQuery(["images", "categories", "comments", "features", "favorites"])
            query.addAssociation("user", ["comments"])
            query.addAssociation("specifications", ["features"])
            query.addAttribute(["commentBody", "score"], "comments")
            //En la siguiente linea incluyo manualmente attributes debido a que no cree una funcion para aplicar atributos en asociaciones de asociaciones.. solo en primera linea
            query.config.include[2].include[0].attributes = ["userId", "username", "email"]

            const product = await Product.findByPk(productId, query.config)

            if (!product) throw new Error(msg.erroMsg.notExistId + productId)

            return product
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getSearchProduct(keywords) {
        try {
            //query config
            const query = queryProduct.newQuery()
            query.filterByString(keywords, "productName")

            //Busqueda en mi DB
            const searchResult = await Product.findAll(query.config)

            return searchResult
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getProductByPrice(gte, lte, order) {
        try {
            //query config
            const query = queryProduct.newQuery()
            query.filterByInteger([gte, lte , order], "productPrice")

            //Busqueda en mi DB
            const searchResult = await Product.findAll(query.config)

            return searchResult
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getProductByCategory(categoryId) {
        try {
            //query config
            const query = queryProduct.newQuery(["productsCategories"])
            query.addWhere(categoryId, "categoryId", "productsCategories")

            //Busqueda en mi DB
            const searchResult = await Product.findAll(query.config)

            return searchResult
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async getProductPagination(limit, offset) {
        try {
            //query config
            const query = queryProduct.newQuery()
            query.addLimitOffset(limit, offset)

            //Busqueda en mi DB
            const searchResult = await Product.findAll(query.config)

            return searchResult
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    static async createProduct(data) {
        //Creo una instancia de transaction para ejecucion en conjunto
        const productCreate = await sequelize.transaction()

        try {
            /* Objeto Modelo que debe llegar 
            data = {
                 productName ["STRING"],
                 productBrand ["STRING"],
                 shortDescription ["STRING"],
                 longDescription ["STRING"],
                 productPrice ["NUMBER"],
                 discount ["NUMBER"],
                 stock ["NUMBER"],
                 score ["NUMBER"],
                 features: [{
                     featureId: ["UUID"],
                     specifications: -> Array de strings con epsecifaciones por cada featureId
                 }, (puede venir vacio, no se generara realicones de feature)
                 {},...{}]  -> Array de Objetos, c/obj tiene el feature con sus especificaciones,
                 imageTitles: ["pathImg", ...] -> Array de strings con el nombre y extension de la imagen,
                 categories: ["categoryId",...] -> Array de strings con categoryIds
             }  
             */

            //Verificacion de campos obligatorios
            const requiredFields = ["productName", "productBrand", "shortDescription", "productPrice", "stock", "score", "imageTitles", "categories"]

            const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);

            //verificacion de estructura de data

            [data.imageTitles, data.categories].forEach(el => {
                if (!Array.isArray(el)) throw new Error(msg.erroMsg.wrongFormat + `${el} debe ser un Array`)
            })

            if (data.features) {
                if (!Array.isArray(data.features)) throw new Error(msg.erroMsg.wrongFormat + `${data.features} debe ser un Array`)

                data.features.forEach(obj => {
                    if (!obj["featureId"] && !obj["specifications"]) throw new Error(msg.erroMsg.wrongFormat + `${el} debe ser un Objeto = {featureId, specifications}`)
                    if (!Array.isArray(obj["specifications"])) throw new Error(msg.erroMsg.wrongFormat + `specifications debe ser un Array`)
                })
            }

            //Transaction para el modelo Product

            const promises = []

            // ID del nuevo Producto
            const productId = uuid()

            const newProduct = {
                productId,
                productName: data.productName,
                productBrand: data.productBrand,
                shortDescription: data.shortDescription,
                longDescription: data.longDescription ? data.longDescription : null,
                productPrice: data.productPrice,
                discount: data.discount ? data.discount : null,
                stock: data.stock,
                score: data.score
            }

            await Product.create(newProduct, { transaction: productCreate })

            //Transaction para el modelo Image

            const bulkImages = []

            for (const image of data.imageTitles) {
                bulkImages.push({
                    productId,
                    imageTitle: image
                })
            }

            promises.push(DbImage.bulkCreateImage(bulkImages, productCreate))

            //Transaction para el modelo Product_Category 

            const bulkCategories = []

            for (const categoryId of data.categories) {
                bulkCategories.push({
                    productId,
                    categoryId
                })
            }

            promises.push(DbProductCategory.bulkCreateProductCategory(bulkCategories, productCreate))

            //Transaction para el modelo Product_Feature


            if (data.features) {

                const bulkFeatures = []

                for (const objFeature of data.features) {
                    for (const specification of objFeature.specifications) {
                        bulkFeatures.push({
                            productId,
                            featureId: objFeature.featureId,
                            specification
                        })
                    }
                }

                promises.push(DbPrdouctFeature.bulkCreatePrdouctFeature(bulkFeatures, productCreate))
            }

            //Resuelvo los bulkCreate Juntos
            await Promise.all(promises)

            // Realizo el commit de la transaccion en caso de que todo haya salido sin errores
            await productCreate.commit()

            return
        } catch (err) {
            // Deshago la transaccion en caso de que haya errores
            await productCreate.rollback()

            console.log(err.message)
            throw err

        }
    }

    static async updateProductData(productId, data) {
        //Creo una instancia de transaction para ejecucion en conjunto
        const productUpdate = await sequelize.transaction()

        try {
            /* Objeto Modelo que debe llegar 
            productId -> ID del producto que se desea modificar
            data = {
                 productName ["STRING"],
                 productBrand ["STRING"],
                 shortDescription ["STRING"],
                 longDescription ["STRING"],
                 productPrice ["NUMBER"],
                 discount ["NUMBER"],
                 stock ["NUMBER"],
                 score ["NUMBER"],
                 features: [{
                     featureId: ["UUID"],
                     specifications: -> Array de strings con epsecifaciones por cada featureId
                 }, (puede venir vacio, no se generara realicones de feature)
                 {},...{}]  -> Array de Objetos, c/obj tiene el feature con sus especificaciones,
                 imageTitles: ["pathImg", ...] -> Array de strings con el nombre y extension de la imagen,
                 categories: ["categoryId",...] -> Array de strings con categoryIds
             }  
             */

            //Verificacion de campos obligatorios
            const requiredFields = ["productName", "productBrand", "shortDescription", "productPrice", "stock", "score", "imageTitles", "categories"]

            const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));

            if (missingFields.length) throw new Error(msg.erroMsg.incompleteData + ` Faltan propiedades requeridas: ${missingFields.join(", ")}`);

            //verificacion de estructura de data

            [data.imageTitles, data.categories].forEach(el => {
                if (!Array.isArray(el)) throw new Error(msg.erroMsg.wrongFormat + `${el} debe ser un Array`)
            })

            if (data.features) {
                if (!Array.isArray(data.features)) throw new Error(msg.erroMsg.wrongFormat + `${data.features} debe ser un Array`)

                data.features.forEach(obj => {
                    if (!obj["featureId"] && !obj["specifications"]) throw new Error(msg.erroMsg.wrongFormat + `${el} debe ser un Objeto = {featureId, specifications}`)
                    if (!Array.isArray(obj["specifications"])) throw new Error(msg.erroMsg.wrongFormat + `specifications debe ser un Array`)
                })
            }
            //Transaction para el modelo Product

            const promisesCreate = []

            const updateProduct = {
                productName: data.productName,
                productBrand: data.productBrand,
                shortDescription: data.shortDescription,
                longDescription: data.longDescription ? data.longDescription : null,
                productPrice: data.productPrice,
                discount: data.discount ? data.discount : null,
                stock: data.stock,
                score: data.score
            }

            //query Product Table config
            const queryProductTable = queryProduct.newQuery()
            queryProductTable.addWhere(productId, "productId")

            await Product.update(updateProduct, queryProductTable.config, { transaction: productUpdate })

            //Transaction para el modelo Image

            await DbImage.deleteImage(productId, "productId", productUpdate)

            const bulkImages = []

            for (const image of data.imageTitles) {
                bulkImages.push({
                    productId,
                    imageTitle: image
                })
            }

            promisesCreate.push(DbImage.bulkCreateImage(bulkImages, productUpdate))

            //Transaction para el modelo Product_Category 

            await DbProductCategory.deleteProductCategory(productId, "productId", productUpdate)

            const bulkCategories = []

            for (const categoryId of data.categories) {
                bulkCategories.push({
                    productId,
                    categoryId
                })
            }

            promisesCreate.push(DbProductCategory.bulkCreateProductCategory(bulkCategories, productUpdate))

            //Transaction para el modelo Product_Feature

            await DbPrdouctFeature.deletePrdouctFeature(productId, "productId", productUpdate)

            if (data.features) {

                const bulkFeatures = []

                for (const objFeature of data.features) {
                    for (const specification of objFeature.specifications) {
                        bulkFeatures.push({
                            productId,
                            featureId: objFeature.featureId,
                            specification
                        })
                    }
                }

                promisesCreate.push(DbPrdouctFeature.bulkCreatePrdouctFeature(bulkFeatures, productUpdate))
            }

            //Resuelvo los bulkCreate Juntos
            await Promise.all(promisesCreate)

            // Realizo el commit de la transaccion en caso de que todo haya salido sin errores
            await productUpdate.commit()

            return
        } catch (err) {
            // Deshago la transaccion en caso de que haya errores
            await productUpdate.rollback()

            console.log(err.message)
            throw err

        }
    }

    static async deleteProduct(productId) {
        try {
            //validacion de ID
            validator.idValidator(productId)

            //query config
            const query = queryProduct.newQuery()
            query.addWhere(productId, "productId")

            const result = await Product.destroy(query.config)

            if (!result) throw new Error(msg.erroMsg.notExistId)

            return result
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }
}

