'use strict';

const cote = require('cote');
const jimp = require('jimp');
const path = require('path');
const pathThumbnail = path.join( __dirname + '../../' + '/public/images/');
const pathImage = path.join( __dirname + '../../../' + '/public/images/');

const responder = new cote.Responder({
    name: 'Generator thumbnail Service'
})


responder.on('process thumbnail', async function (req, done) {

    console.log('Microservice response');
    const { nameImage } = req;

    try {
        const image =  await jimp.read(`${pathImage}/${nameImage}`);
        await image.contain(100, 100);
        await image.write(`${pathThumbnail}thumbnail_${nameImage}`);
    } catch (err) {
        console.log('Error', err);
    }
    const result = 'OK response';
    await done(result);
})