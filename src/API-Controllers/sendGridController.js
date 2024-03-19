require("dotenv").config()
const sgMail = require('@sendgrid/mail');
const cheerio = require('cheerio');

const { DbUser } = require("../database/controllers");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports = {
    sendVerificationMail: async (userData) => {
        try {
            const { userEmail, userName, userId } = userData

            const verificationHref = `${process.env.HOST}/mail-service/verifiedController/${userId}`

            const msg = {
                to: userEmail,  // mail que se desea verificar userEmail
                from: {
                    name: "Gotec",
                    email: process.env.SENDGRID_FROM_MAIL
                },
                subject: "Welcome to Gotec!. Please, confirm your email.",
                templateId: process.env.SENDGRID_TEMP_WELCOME,   //Manipular el template y agregar href para verificacion
                dynamicTemplateData: {
                    verificationHref,
                    userName
                }
            };

            await sgMail.send(msg);

        } catch (error) {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        }
    },
    emailVerifier: async (req, res) => {
        const userId = req.params.id

        const userToVerify = await DbUser.getUserById(userId)

        if (userToVerify && !userToVerify.isVerified) {

            const userVerified = await DbUser.verifyUser(userId)

            if (!userVerified[0]) {
                return res.render("login", {
                    errors: [{
                        type: "isVerified",
                        value: userId,
                        msg: "El usuario no pudo ser verificado"
                    }]
                })
            }

            req.session.loggedUser = userId
            res.cookie("isLogged", true) //permitira identificar desde el front si un usaurio esta logueado o no
        }

        return res.redirect("/")
    },
    sendSecurityUpdateMail: async (userData) => {
        try {
            const { userEmail, userName, userId, validateToken } = userData

            const verificationHref = `${process.env.HOST}/mail-service/verifiedSecurityData/${userId}/${validateToken}`

            const msg = {
                to: userEmail,  // mail que se desea verificar userEmail
                from: {
                    name: "Gotec",
                    email: process.env.SENDGRID_FROM_MAIL
                },
                subject: "Edicion de Seguridad",
                templateId: process.env.SENDGRID_TEMP_UPDATE_USER_DATA,   //Manipular el template y agregar href para verificacion
                dynamicTemplateData: {
                    verificationHref,
                    userName
                }
            };

            await sgMail.send(msg);

        } catch (error) {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        }
    },
    authUsersetting: async (req, res) => {
        //Informacion Recibida del mail
        const { id: paramsUserId, validateToken } = req.params

        //Informacion almacenada en session
        const { loggedUser: userId, updateUserToken } = req.session

        if (paramsUserId === userId && validateToken === updateUserToken) {

            const mainHTML = await fetch(`${process.env.HOST}/users/profile`, {
                method: 'GET',
                headers: {
                  'Cookie': req.headers.cookie // Adjunta la cookie al encabezado de la solicitud para pasar el middleware auth
                }
              })

            const mainHTMLTxt = await mainHTML.text()

            //parseo para poder manipular DOM en el servidor
            const $ = cheerio.load(mainHTMLTxt);
            const displayContainer = $(".settingDisplayConatiner");

            const securityDataHTML = await fetch(`${process.env.HOST}/users/securityData`, {
                method: 'GET',
                headers: {
                  'Cookie': req.headers.cookie // Adjunta la cookie al encabezado de la solicitud para pasar el middleware auth
                }
              })

            const securityDataTxt = await securityDataHTML.text()

            displayContainer.html(securityDataTxt)

            //inyecto script por separado para que lo lea correctamente
            const userDataScript = $("<script>");
            userDataScript.attr("src", "/DOM-Controllers/userData")
            displayContainer.append(userDataScript);
            
            //inyecto script por separado para que lo lea correctamente
            const securityDataScript = $("<script>");
            securityDataScript.attr("src", "/DOM-Controllers/securityData")
            displayContainer.append(securityDataScript);

            //Habilito edicion
            const formSecurityInfo = $("#securityDataForm");
            const allFormSecurityInputs = formSecurityInfo.find("input")

            allFormSecurityInputs.each((index, input) => {
                $(input).removeAttr("disabled"); // Eliminar el atributo disabled
                $(input).css("color", "var(--gris-oscuro-gotec)")
            });

            //inyecto un input hidden con el token de verificación

            const hiddenInputElement = $("<input>")
            hiddenInputElement.attr({
                type: "hidden",
                id: "validateToken",
                name: "validateToken", // Nombre del campo
                value: updateUserToken // Valor de la variable token
              });

            formSecurityInfo.append(hiddenInputElement);

            return res.status(200).send($.html())
        }

        return res.status(500).send(false)
    },
}