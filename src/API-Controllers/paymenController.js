require('dotenv').config()
// Step 1: Import the parts of the module you want to use
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const { DbCartProduct, DbUser } = require("../database/controllers")

const { v4: uuid } = require("uuid")

const MP_ACCESS_KEY = process.env.MP_ACCESS_KEY
const HOST = process.env.HOST
const NGROK_HOST = process.env.NGROK_TUNNELS

// Step 2: Initialize the client object
const client = new MercadoPagoConfig({
    accessToken: MP_ACCESS_KEY,
    options: { timeout: 6000, idempotencyKey: uuid() }
});

// Step 3: Initialize the API object
const preference = new Preference(client);

module.exports = {
    createOrder: async (req, res) => {
        try {
            //recuperar del req.body todos los cartProductId  que estan en el input hidden, con esos se busca en la DB para encontrar todos los productos con cantidades y subtotales
            const { loggedUser: userId, loggedCart: cartId } = req.session
            const cartCookiesProducts = req.cookies.cartProductsId

            const {email, fullname} = await DbUser.getUserById(userId)

            const cartProducts = await DbCartProduct.getCartProductsByUserId(userId)

            //Confeccion de Carrito a pagar
            const items = []
            for (const cartProduct of cartProducts) {
                const { quantity } = cartProduct
                const {productId, productName, productPrice, discount} = cartProduct.product
                const unitPrice = productPrice * ( 1 - (discount / 100))

                const productFlag = cartCookiesProducts.includes(productId)
                if(!productFlag) console.warn(`Advertencia de manipulacion de datos del Carrito de Compras en el producto ${product.productId}`)
                
                items.push({
                    id: productId ,  
                    title: productName , 
                    quantity: quantity, 
                    unit_price: unitPrice, 
                    currency_id: "ARS",  //OPCIONAL
                })
            }

            // Step 4: Create the request object
            const body = {
                items: items,
                payer: {
                    name: fullname,
                    email: email  // OPCIONAL [userEmail]
                },
                shipments: {
                    "cost": 5000,
                  },
                back_urls: {
                    success: `${HOST}/mercadopago/success`,
                    pending: `${HOST}/mercadopago/pending`,
                    failure: `${HOST}/mercadopago/failure`
                },
                notification_url: `${NGROK_HOST || HOST}/mercadopago/webhook`
                //La informacion de envio se coloca dentro de un objeto con clave shipments.. revisar propiedades en https://www.mercadopago.com.ar/developers/es/reference/preferences/_checkout_preferences/post
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

            const result = req.query

            /* 
            COMPLETAR CUANDO SUBAMOS A UN SERVIDOR
            al ejecutarse muchas veces debido a los distintos cambios de estado durante el proceso de pago de MP, pueden llegar diferentes estructuras en req.query, por lo que hay q verificar bajo que estructura llega cuando esta aprobado.

            en teoria llega { data.id: "numero ID",  type: "payment" }

            cuando type = payment  -> Realizar una busqueda con payment.get,
            verificar los datos que devuelve y almacenarlo en tabla purchase

            const paymentData = await payment.get({id: '<PAYMENT_ID>'})

            */

            res.send("webhook")
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
}

