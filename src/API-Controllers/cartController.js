const { DbCartProduct, DbCart, DbProduct } = require("../database/controllers")


module.exports = {  //Cart deve devolver la asociacion con Cart_Prodcut
  addQuantityProduct: async (req, res) => { //CREO QUE QUEDO DEPRECADO
    try {
      const cartProductId = req.params.cartProductId // se lo extrae e un input hidden y se le hace un fech en el onclik de plus
      const { currentQuantity } = req.body //recupero el valor que existe en el input de quantity por si lo modifico manualmente 

      const { cartId, productId, quantity } = await DbCartProduct.getCartProductById(cartProductId)

      const newQuantity = Number(currentQuantity) === Number(quantity) ? (Number(quantity) + 1) : (Number(currentQuantity) + 1)

      const addedProduct = {
        cartId,
        productId,
        quantity: newQuantity
      }

      const result = await DbCartProduct.updateCartProductData(cartProductId, addedProduct)

      if (!result[0]) res.send([false, "No se agrego al carrito"])

      const { total } = await DbCartProduct.getCartProductById(cartProductId)

      addedProduct.total = await total

      return res.send([true, addedProduct])

    } catch (err) {
      console.log(err.message);
    }
  },

  restQuantityProduct: async (req, res) => {//CREO QUE QUEDO DEPRECADO
    try {
      const cartProductId = req.params.cartProductId // se lo extrae e un input hidden y se le hace un fech en el onclik de plus
      const { currentQuantity } = req.body //recupero el valor que existe en el input de quantity por si lo modifico manualmente 

      const { cartId, productId, quantity } = await DbCartProduct.getCartProductById(cartProductId)

      const newQuantity = Number(currentQuantity) === Number(quantity) ? (Number(quantity) - 1) : (Number(currentQuantity) - 1)

      const decrementedProduct = {
        cartId,
        productId,
        quantity: newQuantity
      }

      const result = await DbCartProduct.updateCartProductData(cartProductId, decrementedProduct)

      if (!result[0]) res.send([false, "No se agrego al carrito"])

      const { total } = await DbCartProduct.getCartProductById(cartProductId)

      addedProduct.total = await total

      return res.send([true, addedProduct])
    } catch (err) {
      console.log(err.message);
    }
  },

  updateQuantity: async (req, res) => {
    try {
      const {loggedUser: userId, loggedCart: cartId} = req.session
      
      const { cartProductId, productId, currentQuantity } = req.body

      const newProduct = {
        cartId,
        productId,
        quantity: currentQuantity
      }

      const result = await DbCartProduct.updateCartProductData(cartProductId, newProduct)

      if (!result[0]) res.send([false, "No se agrego al carrito"])

      const { total } = await DbCartProduct.getCartProductById(cartProductId)

      newProduct.total = await total

      await this.updateCartInfoToRender(userId, res) //actualiza info del carrito para consumo del front

      return res.send([true, newProduct])
    } catch (err) {
      console.log(err.message);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const {loggedUser: userId} = req.session
      const cartProductId = req.params.cartProductId // se lo extrae e un input hidden y se le hace un fech en el onclik de plus

      const deleteProduct = await DbCartProduct.deleteCartProduct(cartProductId)

      if (!deleteProduct[0]) res.send([false, "No se elimino del carrito"]) //en el fornt observar si se elimino el producto.. si es asi elimina el article del producto


      await this.updateCartInfoToRender(userId, res) //actualiza info del carrito para consumo del front

      return res.send([true, "El producto fue eliminado con exito"])
    } catch (err) {
      console.log(err.message)
    }
  },

  addToCart: async (req, res) => {
    try {
      const productId = req.params.productId
      const { quantity } = req.body
      const {loggedUser: userId, loggedCart: cartId} = req.session

      const cartProducts = req.cookies.cartProductsId

      // verificacion si ya existe el producto enn el carrito
      if (cartProducts.includes(productId)) return res.send([false, "Ya existe el producto en tu carrito"])

      const newCartProduct = {
        cartId,
        productId,
        quantity: quantity ? quantity : 1
      }

      const addedProduct = await DbCartProduct.createCartProduct(newCartProduct)

      if (!addedProduct) res.send([false, "No se agrego el producto al carrito"]) //en el fornt observar si se elimino el producto.. si es asi elimina el article del producto

      await this.updateCartInfoToRender(userId, res) //actualiza info del carrito para consumo del front

      return res.send([true, "El producto fue eliminado con exito"])
    } catch (err) {
      console.log(err.message);
    }
  },

  updateCartInfoToRender: async (userId, res) => {
    try {

      const cartProducts = await DbCartProduct.getCartProductsByUserId(userId)

      const cartProductsId = cartProducts.map(product => product.productId)

      res.cookie("cartProductsId", cartProductsId) //sirve para verificar los productos que ya existen en el carrito

      res.locals.cartProducts = cartProducts //sirve para renderizar los productos en el carrito

    } catch (err) {
      console.log("fn : updateCartInfoToRender -> ", err.message);
    }
  }



  /*   getAllCarts, // consulta desde Cart - asoc Cart_Product  
    getCartByPk, // consulta desde Cart - asoc Cart_Product  
    getCartByUser, // consulta desde Cart - asoc Cart_Product  
    getCartItemsbyUser, // consulta desde Cart_Product - asoc Cart wher userId  
    getCartByUserId, // consulta desde Cart_Product - asoc Cart wher userId
    get, */

}