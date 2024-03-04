require("dotenv").config()
const sgMail = require('@sendgrid/mail');

const { DbUser } = require("../database/controllers");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports = {
    sendMail: async (userData) => {
        try {
            const { userEmail, userName, userId } = userData

            const msg = {
                to: userEmail,  // mail que se desea verificar userEmail
                from: {
                    name: "Gotec",
                    email: process.env.SENDGRID_FROM_MAIL
                },
                subject: "Welcome to Gotec!. Please, confirm your email.",
                templateId: process.env.SENDGRID_TEMP_WELCOME,   //Manipular el template y agregar href para verificacion
                dynamicTemplateData: {
                    userName,
                    userId
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
    }
}