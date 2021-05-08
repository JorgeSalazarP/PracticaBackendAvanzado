'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const emailTransportConfigure = require('../lib/emailTransportConfigure');

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

usuarioSchema.methods.enviaEmail = async function(subject, body_email) {

  const transport = await emailTransportConfigure();

  // send email
  return transport.sendMail({
    from: process.env.EMAIL_SERVICE_FROM,
    to: this.email,
    subject: subject,
    html: body_email
  });

}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
