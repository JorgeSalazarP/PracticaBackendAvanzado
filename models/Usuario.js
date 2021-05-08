'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

usuarioSchema.statics.hashPassword = function(passwordClear){
  return bcrypt.hash(passwordClear,10);

}

usuarioSchema.methods.comparePassword = function(passwordClear){
  return bcrypt.compare(passwordClear,this.password);
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
