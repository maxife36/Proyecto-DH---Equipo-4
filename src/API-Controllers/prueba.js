const db = require("../database/models")
const {v4:uuid} = require("uuid")

module.exports = {
    createUser: async (req,res) => {
        const data = req.body 

        const user = await db.User.create({
            userId: uuid(),
            fullname : data.fullname,
            email : data.email,
            birthday : data.birthday,
            username : data.username,
            password : data.password,
            
        })

        res.status(200).send("OK")
    },
    showUser:async (req,res)=>{

       /*  const users = await db.User.findAll({
            include: [
              { association: "cart" }
            ]})

        res.status(200).json(users) */
        const users = await db.User.findAll({
            include: [
              { association: "products" }
            ]})

        res.status(200).json(users)

    }
} 