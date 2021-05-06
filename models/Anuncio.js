'use strict';

const mongoose = require('mongoose');

// Creamos el esquema
const articleSchema = mongoose.Schema({
  nombre: {type:String,index:true},
  venta: {type: Boolean, index:true},
  precio: {type:Number,index:true},
  foto: String,
  tags: {type: [String], index: true}
});


articleSchema.statics.list = function(filter,limit,skip,sort,fields) {

  const query = Anuncio.find(filter);
  query.limit(limit);
  query.skip(skip);
  query.select(fields);
  query.sort(sort);
  
  return query.exec();


}

// Realizamos un métodos estático para listar los Tags
articleSchema.statics.listTags = function () {
  const tagsCollection = mongoose.connection.collection('anuncios');
  
  return (tagsCollection.distinct('tags'));
}


//Creamos el modelo con el esquema que acabamos de definir
const Anuncio = mongoose.model('Anuncio', articleSchema);

// y lo exportamos
module.exports = Anuncio;

