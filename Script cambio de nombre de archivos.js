
const fs = require('fs');
const path = require('path');

const directorio = path.resolve("./public/img/usersImg")

const originalName = fs.readdirSync(directorio);

const newNames = []

for(let i = 0; i < originalName.length ; i++) {
    newNames.push(`profile_user${i + 1}.png`);
}

originalName.forEach((el, i) => {
    const oldRoute = path.join(directorio, el)
    const newRoute = path.join(directorio, newNames[i])
    
    fs.renameSync(oldRoute, newRoute)
})
