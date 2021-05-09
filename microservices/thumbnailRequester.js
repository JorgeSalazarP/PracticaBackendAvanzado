'use strict';

const cote = require('cote');

const requester = new cote.Requester({
    name: 'Generator thumbnail Requester'
})


const requesterThumbnail = function(patch_image) {
    console.log('requester thumbnail');
    const request = {
        type: 'process thumbnail',
        patch_image: patch_image
    }

    console.log('configuration Request', request);
    requester.send(request, res => {
        console.log('Response', res);
    });
}

module.exports = requesterThumbnail;