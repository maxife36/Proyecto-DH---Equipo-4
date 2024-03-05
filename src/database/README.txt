1 - Se debe tener instalado sequelize CLI
    -> npm install -g sequelize-cli

2 - Crear en tu servidor de MySQL una base de dato nueva llamada "gotec_db"

3 - Ejecutar las migraciones con 
    -> sequelize db:migrate

4 - Eejecutar los seeders con
    -> sequelize db:seed:all

pd: No modificar el archivo updateSeedsVariables.js que es necesario para actualizar los seed segun los nuevos ids que se generan automaticamente categories y features
