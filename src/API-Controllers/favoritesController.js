const { DbFavorite, DbUser } = require("../database/controllers")


const controllers = {
    getFavoritesInfo: async (req, res) => {
        try {
            const { loggedUser: userId } = req.session

            if (userId) {
                const userFavorites = await DbFavorite.getFavoriteByUserId(userId)

                res.send(userFavorites)
            }
        } catch (err) {
            console.log("ERROR fn : getFavoritesInfo -> ", err.message);
        }
    },
    isFavorite: async (req, res) =>{
        try {
            const { loggedUser: userId } = req.session

            const { productId } = req.params
            const { favoritesProductsId } = req.cookies

            if (userId && favoritesProductsId.includes(productId)) {
                res.status(200).send(true)
            }else{
                res.status(200).send(false)
            }
        } catch (err) {
            console.log("ERROR fn : verifyIsFavorite -> ", err.message);
        }
    },
    addFavorite: async (req, res) => {
        try {
            const { loggedUser: userId } = req.session

            const { productId } = req.body

            if (userId) {

                const data = {
                    userId,
                    productId
                }

                const newFavoriteProduct = await DbFavorite.createFavorite(data)

                if (newFavoriteProduct) {
                    await controllers.updateFavoriteCookieInfo(userId, req, res)
                }

                res.send(newFavoriteProduct)
            }
        } catch (err) {
            console.log("ERROR fn : addFavoritesInfo -> ", err.message);
        }
    },
    deleteFavorite: async (req, res) => {
        try {
            const { loggedUser: userId } = req.session

            const { favoriteId } = req.body

            if (userId) {

                const deletedFavoriteProduct = await DbFavorite.deleteFavorite(favoriteId)

                if (deletedFavoriteProduct) {
                    await controllers.updateFavoriteCookieInfo(userId, req, res)
                }
                
                res.status(200).send(true)
            }
        } catch (err) {
            console.log("ERROR fn : dleteFavorite -> ", err.message);
        }
    },

    updateFavoriteCookieInfo: async (userId, req, res) => {
        try {

            const userInfo = await DbUser.getUserById(userId)

            const favoritesProductsId = userInfo.favoriteProducts.map(product => product.productId)

            res.cookie("favoritesProductsId", favoritesProductsId) 

        } catch (err) {
            console.log("ERROR fn : updateFavoriteInfoToRender -> ", err.message);
        }
    },



    /*   deleteProduct: async (req, res) => {
        try {
          const { loggedUser: userId } = req.session
          const cartProductId = req.params.cartProductId // se lo extrae e un input hidden y se le hace un fech en el onclik de plus
    
          const deleteProduct = await DbCartProduct.deleteCartProduct(cartProductId)
    
          if (!deleteProduct) return res.send([false, "No se elimino del carrito"]) //en el fornt observar si se elimino el producto.. si es asi elimina el article del producto
    
          await controllers.updateCartInfoToRender(userId, req, res) //actualiza info del carrito para consumo del front
    
          return res.send([true, "El producto fue eliminado con exito"])
        } catch (err) {
          console.log("ERROR fn : deleteProduct -> ", err.message)
        }
      },
    
      cleanCartProducts: async (req, res) => {
        try {
          const { loggedUser: userId } = req.session
          
          const cleanResult = await DbCartProduct.cleanCartProductsByUserId(userId)
          
          if (!cleanResult) return res.send([false, "No se limpio el carrito"]) 
          
          await controllers.updateCartInfoToRender(userId, req, res) //actualiza info del carrito para consumo del front
          
          return res.send([true, "El producto fue eliminado con exito"])
        } catch (err) {
          console.log("ERROR fn : cleanCartProducts -> ", err.message)
        }
      },
    
      addProductToCart: async (req, res) => {
        try {
          const productId = req.params.productId
          const { quantity } = req.body
          const { loggedUser: userId, loggedCart: cartId } = req.session
    
          const cartProducts = req.cookies.cartProductsId
    
          // verificacion si ya existe el producto enn el carrito
          if (cartProducts.includes(productId)) return res.send([false, "Ya existe el producto en tu carrito"])
    
          const newCartProduct = {
            cartId,
            productId,
            quantity: quantity ? quantity : 1
          }
    
          const addedProduct = await DbCartProduct.createCartProduct(newCartProduct)
    
          if (!addedProduct) return res.send([false, "No se agrego el producto al carrito"]) //en el fornt observar si se elimino el producto.. si es asi elimina el article del producto
    
          await controllers.updateCartInfoToRender(userId, req, res) //actualiza info del carrito para consumo del front
    
          return res.send([true, "El producto fue agregado con exito"])
        } catch (err) {
          console.log("ERROR fn : addProductToCart -> ", err.message);
        }
      },
    
      updateCartInfoToRender: async (userId, req, res) => {
        try {
    
          const cartProducts = await DbCartProduct.getCartProductsByUserId(userId)
    
          const cartProductsId = cartProducts.map(product => product.productId)
    
          res.cookie("cartProductsId", cartProductsId) //sirve para verificar los productos que ya existen en el carrito
    
          const cartProductsData = []
    
          for (const cartProduct of cartProducts) {
            const { cartProductId, cartId, productId, quantity, total, product, cart } = cartProduct
    
            cartProductsData.push({
              cartProductId: cartProductId,
              cartId: cartId,
              productId: productId,
              quantity: quantity,
              total: await total * (1 - (product.discount / 100)),
              discount: product.discount,
              product: product,
              cart: cart
            })
          }
    
          req.session.cartProducts = cartProductsData //sirve para renderizar los productos en el carrito / funcion que se ejecuta en globalDataMiddleware
    
    
        } catch (err) {
          console.log("ERROR fn : updateCartInfoToRender -> ", err.message);
        }
      }
     */

}

module.exports = controllers