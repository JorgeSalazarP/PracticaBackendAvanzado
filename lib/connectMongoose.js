'use strict';

const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
  console.log('Error de conexión', err);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log('Conectado a MongoDB en', mongoose.connection.name);
});

mongoose.connect(process.env.MONGODB_CONNECTION_STR, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
});

module.exports = mongoose.connection;//no haría falta porque es singleton.