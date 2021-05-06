'use strict';

const fs = require('fs');
const Articulo = require('../models/Anuncio');

async function startDatabase(){
    
    try {
        require('./connectMongoose');// Primero comprobamos que conecte con la BBDD
        await Articulo.deleteMany();
        const data = JSON.parse(fs.readFileSync('./data/anuncios.json'),'utf-8');
        await Articulo.insertMany(data.anuncios);
       
    } catch (err) {
    
        next(err);
    }
    
}


startDatabase();