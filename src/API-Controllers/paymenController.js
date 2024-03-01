require('dotenv').config()
// Step 1: Import the parts of the module you want to use
const { MercadoPagoConfig, Preference } = require('mercadopago');

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

            // Step 4: Create the request object
            const body = {
                items: [
                    {
                        id: uuid(),  //requerido  [productId]
                        title: "Monitor 4k Samsung", //requerido [productName]
                        quantity: 1, //requerido [quantity - Tabla Cart_Product]
                        unit_price: 10000,  //requerido [productPrice]
                        currency_id: "ARS",  //OPCIONAL
                        category_id: "Monitor"  // OPCIONAL
                    }
                ],
                payer: {
                    email: "test_user_1352177263@testuser.com"  // OPCIONAL [userEmail]
                },
                back_urls: {
                    success: `${HOST}/mercadopago/success`,
                    pending: `${HOST}/mercadopago/pending`,
                    failure: `${HOST}/mercadopago/failure`
                },
                notification_url: `${NGROK_HOST || HOST}/mercadopago/webhook`
            }


            // Step 5: Create request options object - Optional
            const requestOptions = {
                idempotencyKey: uuid(),
            };

            // Step 6: Make the request
            const result = await preference.create({ body, requestOptions })

            // console.log(result);

            res.send(result)

            // res.redirect(result.init_point)
        } catch (err) {
            console.log(err.message);
            res.send(err.message)
        }
    },

    recieveWebhook: (req, res) => {
        try {
            
            const result = req.query
            console.log("------------------------------------------------------------");
            console.log(result);
    
    
            res.send("webhook")
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
}

