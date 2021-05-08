'use strict';

require('dotenv').config();

const { connectMongoose, Anuncio, Usuario, mongoose } = require('../../models');


main().catch(err=>console.log(err));

async function main(){

    //Inicializamos la colección de usuarios
    await initUsers();
    mongoose.connection.close();

}

async function initUsers(){

    const { deletedCount } = await Usuario.deleteMany();
    console.log(`Eliminados ${deletedCount} usuarios.`);
      
    const result = await Usuario.insertMany([
        {
            email: 'user@example.com',
            password: await Usuario.hashPassword('1234')
        },
        {
            email: 'jamg44@gmail.com',
            password: await Usuario.hashPassword('1234')
        }
       
    ]);
    console.log(`Insertados ${result.length} usuario${result.length > 1 ? 's' : ''}.`)

}