const { Product, Sequelize, Favorite } = require("../models")
const msg = require("./dbMessage")
const validator = require("../seqQueyConfig/assets/validators")


module.exports = class DbProductController {

    static async getAllProducts() {
        try {
          /*   let c = a.initConfig(associations)//{}
            a.addFilter(c)
            c = a.addFilter(c)
            c = a.addFilter(c)

            
            a.execute(c)
 */

            const products = await Product.findAll({
                include: [
                    {
                        association: "images"
                    },
                    {
                        association: "categories"
                    },
                    {
                        association: "comments",
                        attributes: ["commentBody", "score"],
                        include: [
                            {
                                association: "user",
                                attributes: ["userId", "username", "email"]
                            }
                        ]
                    },
                    {
                        association: "features",
                        include: [
                            {
                                association: "specifications",
                                attributes: ["specification"]
                            }
                        ]
                    },
                    {
                        association: "favorites",
                        attributes: [
                            [
                                Sequelize.literal('(SELECT COUNT(*) FROM favorites WHERE favorites.productId = Product.productId)'),
                                'favoritesCount',
                            ],
                        ]
                    }
                ]
            })

            if (!products.length) throw new Error(msg.erroMsg.emptyTable + "Producto")

            return products
        } catch (err) {
            console.log(err.message)
        }
    }

    static async getProductById(productId) {
        try {

            //validacion de ID
            validator.idValidator(productId)

            const product = await Product.findByPk(productId, {
                include: [
                    {
                        association: "images"
                    },
                    {
                        association: "categories"
                    },
                    {
                        association: "comments",
                        attributes: ["commentBody", "score"],
                        include: [
                            {
                                association: "user",
                                attributes: ["userId", "username", "email"]
                            }
                        ]
                    },
                    {
                        association: "features",
                        include: [
                            {
                                association: "specifications",
                                attributes: ["specification"]
                            }
                        ]
                    },
                    {
                        association: "favorites",
                    }
                ]
            })

            if (!product) throw new Error(msg.erroMsg.notExistId + productId)

            return product
        } catch (err) {
            console.log(err.message)
        }
    }

    static async getProductSearch(keywords) {
        try {
            //limpieza de parametros de busqueda
            const arraySearched = validator.searcherValidatorAndCleaner(keywords)

            console.log(arraySearched);

            //configuracion de opciones de busqueda

            const whereConfig = arraySearched.map(keyword => {

                const whereOption = {
                    productName: {
                        [Sequelize.Op.like]: `%${keyword}%`
                    }
                }

                return whereOption
            })

            //Busqueda en mi DB
            const searchResult = await Product.findAll({

                where: {
                    [Sequelize.Op.or]: whereConfig
                },
                include: [

                ]
            })

            return searchResult

        } catch (err) {
            console.log(err.message)
        }
    }

    static async getFilteredProducts(filter) {

        /* Objeto modelo con parametro permitidos 
        filer = {
            products:{
                productBrand: ["STRING"],
                productPrice : [gte["NUMBER"], lte["NUMBER"], order],
                discount: [gte["NUMBER"], lte["NUMBER"], order] // analiza si es mayor a 0 y ordena de mayor a menor,
                stock: [gte["NUMBER"], lte["NUMBER"], order]//analiza unicamente si es mayor a 0,
                score: [gte["NUMBER"], lte["NUMBER"], order] //unicamente ordena de mayo a menor
            },
            categories:{
                categoryTitle: ["STRING"]
            },
            cart:{
                cartId: ["STRING"]
            }
        }
        */

        /* crear una funcion que le deba pasar el nombre de las tablas asociadas, sus columnas y tipo de dato (por ahora solo acepta string, number y uuid)*/

        let generalConfig = {
            mainTable: [
                {
                    column: "productBrand",
                    type: "string"
                },
                {
                    column: "productPrice",
                    type: "number"
                },
                {
                    column: "discount",
                    type: "number"
                },
                {
                    column: "stock",
                    type: "number"
                },
                {
                    column: "score",
                    type: "number"
                },
            ],
            include: [
                {
                    association: "categories",
                    columns: [
                        {
                            column: "categoryTitle",
                            type: "string"
                        }
                    ],
                    include: []
                },
                {
                    association: "cart",
                    columns: [
                        {
                            column: "cartId",
                            type: "uuid"
                        }
                    ],
                    include: []
                }

            ]
        }

        //generar una funcion que me devuelva el objeto armado de las configuraciones de filtrado 

       

        DbProductController.whereNumberConstructor(/* FALTAN PASAR PARAMETROS */)

    }

    static whereNumberConstructor(columnName, [gte = 0, lte = 0, order = "DESC"]) {

        //validacion de estructura y tipos de datos de parametros de filtrado
        validator.filterNumberValidator([gte, lte, order])

        //Armado de condiciones de busqueda numerica del where
        const condition = [
            gte !== 0 ? { [columnName]: { [Sequelize.Op.gte]: gte } } : null,
            lte !== 0 ? { [columnName]: { [Sequelize.Op.lte]: lte } } : null
        ].filter(Boolean)

        //configuracion del objeto de busqueda
        const searchConfig = {
            where: { [Sequelize.Op.and]: condition },
            order: order
        }

        return searchConfig
    }

    static whereStringCosntructor(columnName, stringValue) {

    }

}
