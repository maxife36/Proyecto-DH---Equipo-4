const { DbCartProduct } = require("../database/controllers")


const controllers = {
  getOneCartProductInfo: async (req, res) => {
    try {
      const { loggedUser: userId } = req.session

      if (userId) {

        const { cartProductId } = req.params

        const cartProduct = await DbCartProduct.getCartProductById(cartProductId)

        const total = await cartProduct.total * (1 - (cartProduct.product.discount / 100))

        console.log(cartProduct);
        res.send({ cartProduct, total })
      }
    } catch (err) {
      console.log("ERROR fn : getCartProductInfo -> ", err.message);
    }
  },
  getCartProductsInfo: async (req, res) => {
    try {
      const { loggedUser: userId } = req.session

      if (userId) {

        const allCartProducts = await DbCartProduct.getCartProductsByUserId(userId)

        res.send(allCartProducts)
      }
    } catch (err) {
      console.log("ERROR fn : getCartProductInfo -> ", err.message);
    }
  },
  updateQuantity: async (req, res) => {
    try {
      const { loggedUser: userId, loggedCart: cartId } = req.session

      const { cartProductId, productId, currentQuantity } = req.body

      const newProduct = {
        cartId,
        productId,
        quantity: currentQuantity
      }

      const cartProducts = req.cookies.cartProductsId

      // verificacion si existe el producto en el carrito
      if (!cartProducts.includes(productId)) return res.send([false, "No existe el producto que quieres modificar en tu carrito"])

      // Modificacion en DB del producto
      const result = await DbCartProduct.updateCartProductData(cartProductId, newProduct)

      if (!result[0]) {
        if (result[1]) return res.send([false, result[1]])

        return res.send([false, "No se agrego al carrito"])
      } 

      const { total, product } = await DbCartProduct.getCartProductById(cartProductId)

      newProduct.total = await total * (1 - (product.discount / 100))
      newProduct.discount = product.discount

      await controllers.updateCartInfoToRender(userId, req, res) //actualiza info del carrito para consumo del front

      return res.send([true, newProduct])
    } catch (err) {
      console.log("ERROR fn : updateQuantity -> ", err.message);

    }
  },

  deleteProduct: async (req, res) => {
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

      return res.send([true, "El producto fue agregado con exito", addedProduct])
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


}

module.exports = controllers