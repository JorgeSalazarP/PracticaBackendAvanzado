# Nodepop. Práctica de Node.Js/Express/ MongoDB

Desarrollo de una API que se ejecutará en el servidor de un servicio de venta de artículos de segunda mano llamado Nodepop.

## Crear una aplicación de express

```
npx express-generator --ejs Nodepop
```

## Dentro de la carpeta Nodepop ejecutamos
```
npm install
```

## Deplay

Copy .env.example to .env and review the config

```sh
cp .env.example.env
```

## Instalación de nodemon

```
npm i nodemon
```

## Instalación de cross-env

```
npm i cross-env
```

## Inicializar la BBDD con MongoDB

```
npm run installDB
```
## La BBDD carga el archivo /data/anuncios.json


## Formas de arrancar 

* En desarrollo
```
npm run dev
```

* En producción

```
npm run start
```

## Peticiones GET ('/')

Nos muestra todos los anuncios

**Filtros**

* nombre: Muestra el nombre del artículo que empiece por el dato buscado.

* tag: Se visualizan los anuncios que contengan ese tag.

* precio: Filtra por rango de precio. Ejemplos:
    -10 Menores a 10.
    10- Mayores a 10.
    10-50 Entre 10 y 50.
    50 = Igual a 50.

* venta: true / false.

* fields: El anuncio mostrará únicamente los campos seleccionados.

* limit: Lista de anuncios con posibilidad de paginación.

* skip: Nos devuelve los x primeros resultados.

* sort: Ordenamos por el campo seleccionado.


## Peticiones GET ('/apiv1/anuncios')

Se muestra la API y además funcionan todos los filtros anteriormente mencionados.

## Peticiones GET ('/apiv1/anuncios/tags')

Se listan los tags existentes de la API en formato JSON

**Método POST**

* Para crear un nuevo anuncio a través de POSTMAN. Se puede utilizar de prueba la imagen /images/deportivos.jpg

## Templates ejs

* index.html: Se muestran los artículos.

* error.html: Nos muestra un error.

* /partials/header.html: Los datos correspondientes al header.

* /partials/footer.html: Los datos correspondientes al footer.

### Desarrollado por:

Jorge Salazar.