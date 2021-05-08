'use strict';

const { Usuario } = require('../models');


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

            res.redirect('/');
            
        } catch (err) {
            next(err);
        }

    }



}


module.exports = new LoginController();



