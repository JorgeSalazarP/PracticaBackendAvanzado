'use strict';

const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const nodemailer = require('nodemailer');


class LoginController {
  
  /**
   * GET /login
   */
    index(req, res, next) {
        res.locals.email = '',
        res.locals.error = ''
        res.render('login');
    }

 
    async post(req,res,next) {
        try {
            const { email,password } = req.body;
            
            //user find
            const user = await Usuario.findOne({ email });
            
            if(!user || !(await user.comparePassword(password))){
             
                res.locals.email = email;
                res.locals.error = res.__('Invalid credentials');
                res.render('login');
                return;
            }
            
            //apuntar en la sesión del usuario su _id
            //OK valid credentials
            req.session.userLogged = {
                _id:Usuario._id
            };

        
         // mandar un email al usuario
          const info = await user.enviaEmail("It's great!", 'Welcome to NodePop');
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
          res.redirect('/');
            
        } catch (err) {
            next(err);
        }

    }

     /**
   * POST /loginJWT
   */
   async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;
  
      // buscar el usuario en la BD
      const usuario = await Usuario.findOne({ email })
      
      // si no lo encontramos --> error
      // si no coincide la clave --> error
      if (!usuario || !(await usuario.comparePassword(password)) ) {

        const error = new Error('Invalid credentials');
        error.status = 401;
        next(error);
        return;
      }
  
      // si el usuario existe y la clave coincide

      // crear un token JWT (firmado)
      jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '2h' }, (err, jwtToken) => {
        if (err) {
          next(err);
          return;
        }
        //Le devolvemos el token al cliente
        res.json({ token: jwtToken});
      });
      


      
    } catch(err) {
      next(err);
    }
  }

    /**
   * GET /logout
   */
    logout(req, res, next) {
        req.session.regenerate(err => {
        if (err) {
            next(err);
            return;
        }
        res.redirect('/login');
        })
    }


}


module.exports = new LoginController();



