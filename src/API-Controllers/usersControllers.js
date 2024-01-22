const bcrypt = require('bcrypt')
const controllers = {
    productCart: (req,res) => res.render("productCart.ejs"),
    showForm: (req, res) => {
        res.render('/register.ejs');
      },
    processRegister: (req, res) => {
        const { fullName, userEmail, userBirthday, userAdress, userName, password, confirmPassword } = req.body;
        // const avatarPath = req.file.path;
        const newUser = {
            fullName: fullName,
            email: userEmail,
            adress: userAdress,
            userName: userName,
            password: bcrypt.hash(password, 10)
        }
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) throw err;
    
            const newUser = {
                username,
                password: hash,
                avatar: avatarPath
            };
            fs.readFile('usuarios.json', 'utf8', (err, data) => {
                if (err) throw err;
    
                const usuarios = JSON.parse(data);
                usuarios.push(newUser);
    
                fs.writeFile('usuarios.json', JSON.stringify(usuarios), (err) => {
                    if (err) throw err;
                    res.send('¡Registro exitoso!');
                });
            });
        });
    }
}

module.exports = controllers;