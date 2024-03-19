require('dotenv').config()

//Creador de tunel hhtps 
const ngrok = require('ngrok');

// Step 1: Import the parts of the module you want to use
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const { DbCartProduct, DbUser, DbPurchase, DbProduct } = require("../database/controllers")
const { updateCartInfoToRender } = require("./cartController")

const { v4: uuid } = require("uuid")

const MP_ACCESS_KEY = process.env.MP_ACCESS_KEY
const HOST = process.env.HOST

// Step 2: Initialize the client object
const client = new MercadoPagoConfig({
    accessToken: MP_ACCESS_KEY,
    options: { timeout: 6000, idempotencyKey: uuid() }
});

// Step 3: Initialize the API object
const preference = new Preference(client);
const payment = new Payment(client);

module.exports = {
    createOrder: async (req, res) => {
        try {
            //recuperar del req.body todos los cartProductId  que estan en el input hidden, con esos se busca en la DB para encontrar todos los productos con cantidades y subtotales
            const { loggedUser: userId, loggedCart: cartId } = req.session
            const cartCookiesProducts = req.cookies.cartProductsId
            let { shippingCost } = req.body

            const { email, fullname } = await DbUser.getUserById(userId)

            const cartProducts = await DbCartProduct.getCartProductsByUserId(userId)

            //Confeccion de Carrito a pagar
            const items = []
            for (const cartProduct of cartProducts) {
                const { quantity } = cartProduct
                const { productId, productName, productPrice, discount } = cartProduct.product
                const unitPrice = productPrice * (1 - (discount / 100))

                const productFlag = cartCookiesProducts.includes(productId)
                if (!productFlag) console.warn(`Advertencia de manipulacion de datos del Carrito de Compras en el producto ${product.productId}`)

                items.push({
                    id: productId,
                    title: productName,
                    quantity: quantity,
                    unit_price: unitPrice,
                    currency_id: "ARS",  //OPCIONAL
                })
            }

            //Eliminar en produccion
            const NGROK_HOST = await ngrok.connect({ addr: 4000, authtoken: process.env.NGROK_AUTHTOKEN })

            // Step 4: Create the request object
            const body = {
                items: items,
                payer: {
                    name: fullname,
                    email: email  // OPCIONAL [userEmail]
                },
                shipments: {
                    "cost": Number(shippingCost),
                },
                back_urls: {
                    success: `${HOST}/mercadopago/success`,
                    pending: `${HOST}/mercadopago/pending`,
                    failure: `${HOST}/mercadopago/failure`
                },
                notification_url: `${NGROK_HOST || HOST}/mercadopago/webhook/${userId}/${cartId}`
            }

            // Step 5: Create request options object - Optional
            const requestOptions = {
                idempotencyKey: uuid(),
            };

            // Step 6: Make the request
            const result = await preference.create({ body, requestOptions })

            res.redirect(result.init_point)
        } catch (err) {
            console.log(err.message);
            res.send(err.message)
        }
    },

    recieveWebhook: async (req, res) => {
        try {
            const { userId, cartId } = req.params
            const paymentResult = req.query
            
            if (paymentResult.type && paymentResult.type === "payment") {
                const paymentInfo = await payment.get({ id: paymentResult["data.id"] })

                const savePurchase = await DbPurchase.createPurchase({
                    userId,
                    data: paymentInfo
                })

                const cleanCart = await DbCartProduct.cleanCartProductsByUserId(cartId)

                if (!cleanCart || !savePurchase) {
                    const errors = {}

                    if (!cleanCart) errors.cart = "No se limpio el carrito"
                    if (!savePurchase) errors.purchase = "No se guardo el registro del payment"

                    return res.status(500).send([false, errors])
                }

                res.status(200).send("Pago Exitoso")
            }
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    },

    successHandler: async (req, res) => {
        try {
            const { loggedUser: userId} = req.session

            await updateCartInfoToRender(userId, req, res)

            res.redirect("/")

        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    },

    pendingHandler: async (req, res) => {
        try {
            res.redirect("/")
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    },

    failureHandler: async (req, res) => {
        try {
            
            console.log("PARAMS ",req.params)
            console.log("BODY ",req.body)
            console.log("QUERY ",req.query)
            
            res.redirect("/")
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    }

}

