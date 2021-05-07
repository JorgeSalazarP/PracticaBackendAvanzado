'user strict';

const Anuncio = require('./Anuncio');


async function filters(req, res, next) {
    
   
    try {
      const tag = req.query.tag;
      const venta = req.query.venta;
      const limit = parseInt(req.query.limit);
      const skip = parseInt(req.query.skip);
      const sort = req.query.sort;
      const precio = req.query.precio;
      const nombre = req.query.nombre;
      const fields = req.query.fields;
  
      const filter = {};// Si le pasamos el objeto literal vacío, nos mostrará todos los artículos.
  
      if (tag){
        filter.tags = tag;
      }
      if (venta){
        filter.venta = venta;
      }
      
      if (precio) {
      
        const rankPrice = precio.split('-'); // Separa e ignora el signo -
        
        if(rankPrice.length === 2){
  
          if(rankPrice[0]!=='' && rankPrice[1]===''){ //precio 10-
  
            filter.precio = {'$gte': rankPrice[0]};
  
          } else if (rankPrice[0]==='' && rankPrice[1]!==''){ //precio -50
  
            filter.precio = {'$lte': rankPrice[1]};
  
          }else{ // precio 50-60
  
            filter.precio = {'$gte': rankPrice[0], '$lte': rankPrice[1]}
          }
  
        }
  
        if(rankPrice.length === 1){ // precio = 10;
  
          filter.precio=precio;
        }
        
      }
  
      if (nombre) {
        filter.nombre = new RegExp('^' + nombre, 'i');
      }
  
      const result = await Anuncio.list(filter,limit,skip,sort,fields);
      
      

      if (result.length===0){ // Por si no encuentra ningún artículo
  
        return res.status(404).json({err: 'Not found'});
      
      }

      if (req.originalUrl.indexOf('api') !== 1){ // Si la llamada la hace index.js

        res.locals.articles = result;
        res.render('index',{
            title: 'NodePop',
            age:new Date().getFullYear()
           }
        );

      }else{

        res.json(result); // Significa que lo ha llamado apiv1/anuncios
      }
     
    } catch (err) { next(err);}
    
  
   
}

module.exports = filters;