const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Image = require('../../models/Image');
 


// Index page of all images in a specific game
router.get('/game/:game_id/images', (req, res) => {
    Image.find({game: req.params.game_id})
        .then(images => res.json(images))
        .catch( err => res.status(404).json({ noimagesfound: 'No images available in that game.'}));
});

// Create an image in a game. How are we threading layers into this?
router.post('/game/:game_id/images'), (req, res) => {

    Image.find({game: req.params.game_id})
    .then(image => res.json(image))
    .catch(err => res.status(404).json({ noimagesfound: 'No images available in that game.' }));


    const newImage = new Image({
        user: req.user.id,
        scalefactor: req.body.scalefactor,
        layer_id: req.params.layer_id,
        game_id: req.params.game_id,
        url: req.body.url,
        position: req.body.position
    });

    newImage.save().then( image => res.json(image));
};

/// Show image route available to everyone. (Optional)
router.get('/game/:game_id/images/:image_id'), (req, res) => {

    Image.findById({ game: req.params.game_id })
        .then( image => res.json(image))
        .catch( err => 
            res.status(404).json({ noimagefound: 'Image ID does not exist' }))
};



// Delete image route 
router.delete('/game/:game_id/images/:image_id'), (req, res) => {
    
    const image = Image.findById(req.params.id)
        .then(image => image.delete())
        .catch(err =>
            res.status(404).json({ noimagefound: 'Image ID does not exist' }))
}

module.exports = router;

