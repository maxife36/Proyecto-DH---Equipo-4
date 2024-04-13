require("dotenv").config()

const { DbUser, DbProduct, DbCategory, DbPurchase } = require("../database/controllers")

const controllers = {
    getAllUsers: async function (req, res) {
        try {
            const { userId } = req.query

            const allUsers = await DbUser.getAllUsers()
            const admin = await DbUser.getUserById(userId)

            //Limpieza de userInfo
            allUsers.forEach(user => {
                delete user.dataValues.password
                delete user.dataValues.admin
                delete user.dataValues.isVerified
                delete user.dataValues.cart
                user.dataValues.profileImg = `${process.env.APP_HOST}/img/usersImg${user.dataValues.profileImg}`
                user.dataValues.detail = `${process.env.APP_HOST}/api/users/${user.userId}`
            })

            //Limpieza de Admin Info
            delete admin.dataValues.password
            delete admin.dataValues.admin
            delete admin.dataValues.isVerified
            delete admin.dataValues.cart
            admin.dataValues.profileImg = `${process.env.APP_HOST}/img/usersImg${admin.dataValues.profileImg}`
            admin.dataValues.detail = `${process.env.APP_HOST}/api/users/${admin.userId}`

            const result = {
                admin,
                count: allUsers.length,
                data: allUsers
            }

            res.json(result)
        } catch (err) {
            console.log(err.message);
        }
    },
    getUserDetail: async function (req, res) {
        try {

            const userId = req.params.userId

            const userInfo = await DbUser.getUserById(userId)

            delete userInfo.dataValues.password
            delete userInfo.dataValues.admin
            delete userInfo.dataValues.isVerified
            delete userInfo.dataValues.cart
            userInfo.dataValues.profileImg = `${process.env.APP_HOST}/img/usersImg${userInfo.dataValues.profileImg}`

            res.json(userInfo)
        } catch (err) {
            console.log(err.message);
        }
    },
    getAllProducts: async function (req, res) {
        try {
            const allProducts = await DbProduct.getAllProducts()
            const allCategories = await DbCategory.getAllCategories()
            const allPurchases = await DbPurchase.getAllPurchases()

            const countByCategory = {}
            let totalNetSales = 0
            let totalShippingCost = 0

            allCategories.forEach(category => countByCategory[category.categoryTitle] = category.products.length)

            allProducts.forEach(product => {
                //Configuracion de images
                const imagesURL = {}

                product.dataValues.images.forEach((image, i) => imagesURL[`image${i}`] = `${process.env.APP_HOST}/img/Products-Image${image.dataValues.imageTitle}`)

                product.dataValues.imagesURL = imagesURL

                delete product.dataValues.images
                
                product.dataValues.detail = `${process.env.APP_HOST}/api/products/${product.productId}`
            })



            if (allPurchases.length) {
                allPurchases.forEach(purchase => {
                    const data = JSON.parse(purchase.data)
                    const shippingCost = data.shipping_amount
                    const netSales = data.transaction_details.net_received_amount - shippingCost

                    totalNetSales += netSales
                    totalShippingCost += shippingCost
                })
            }

            const result = {
                count: allProducts.length,
                countByCategory,
                data: allProducts,
                totalNetSales: totalNetSales.toFixed(2),
                totalShippingCost: totalShippingCost.toFixed(2)
            }

            res.json(result)
        } catch (err) {
            console.log(err.message);
        }
    },
    getProductDetail: async function (req, res) {
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


                //Configuracion de images
                const imagesURL = {}

                product.dataValues.images.forEach((image, i) => imagesURL[`image${i}`] = `${process.env.APP_HOST}/img/Products-Image${image.dataValues.imageTitle}`)

                product.dataValues.imagesURL = imagesURL

                delete product.dataValues.images
            }

            res.json(product)

        } catch (err) {
            console.log(err.message);
        }
    }
}

module.exports = controllers