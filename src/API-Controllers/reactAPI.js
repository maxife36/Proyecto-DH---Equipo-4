require("dotenv").config()

const { DbUser, DbProduct, DbCategory } = require("../database/controllers")

const controllers = {
    getAllUsers: async function (req, res) {
        try {
            const allUsers = await DbUser.getAllUsers()

            allUsers.forEach(user => {
                delete user.dataValues.password
                delete user.dataValues.admin
                delete user.dataValues.isVerified
                delete user.dataValues.cart
                user.dataValues.profileImg = `${process.env.HOST}/img/usersImg${user.dataValues.profileImg}`
                user.dataValues.detail = `${process.env.HOST}/api/users/${user.userId}`
            })

            const result = {
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
            userInfo.dataValues.profileImg = `${process.env.HOST}/img/usersImg${userInfo.dataValues.profileImg}`

            res.json(userInfo)
        } catch (err) {
            console.log(err.message);
        }
    },
    getAllProducts: async function (req, res) {
        try {
            const allProducts = await DbProduct.getAllProducts()
            const allCategories = await DbCategory.getAllCategories()

            const countByCategory = {}

            allCategories.forEach(category => countByCategory[category.categoryTitle] = category.products.length)
            
            allProducts.forEach(product => product.dataValues.detail = `${process.env.HOST}/api/products/${product.productId}`)

            const result = {
                count: allProducts.length,
                countByCategory,
                data: allProducts
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

                product.dataValues.images.forEach( (image, i) => imagesURL[`image${i}`] = `${process.env.HOST}/img/Products-Image${image.dataValues.imageTitle}` )

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