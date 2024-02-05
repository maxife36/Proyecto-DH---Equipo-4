const db = require("../database/models")

module.exports = {
    createUser: async (req,res) => {
        const data = req.body 

        await db.User.create({
            fullname : data.fullname,
            email : data.email,
            birthday : data.birthday,
            username : data.username,
            password : data.password,
            
        })


    }
} 