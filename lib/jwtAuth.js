'use strict';

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // recoger el jwtToken de la cabecera (o de otros sitios)
  const jwtToken = req.get('Authorization') || req.query.token || req.body.token;

  // Comprobación de que tenemos el token
  if (!jwtToken) {
    const error = new Error('No token provided');
    error.status = 401;
    next(error);
    return;
  }

  // comprobar que el token es valido
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      err.status = 401;
      next(err);
      return;
    }
    req.apiAuthUserId = payload._id;
    next();
  });
  
};
