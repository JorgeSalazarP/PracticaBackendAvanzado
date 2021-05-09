'use strict';

const cote = require('cote');

const requester = new cote.Requester({
    name: 'Generator thumbnail Requester'
})


const requesterThumbnail = function(patchImage) {
    console.log('requester thumbnail');
    const request = {
        type: 'process thumbnail',
        patchImage: patchImage
    }

    console.log('configuration Request', request);
    requester.send(request, res => {
        console.log('Response', res);
    });
}

module.exports = requesterThumbnail;