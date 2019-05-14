const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Image = require('../../models/Image');
const ImageInstance = require('../../models/ImageInstance');

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("../../config/keys");

aws.config.update({
    secretAccessKey: config.s3secretAccessKey,
    accessKeyId: config.s3accessKeyId,
    region: config.s3region
})

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: "tabletop-images-16",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: "TESTING_META_DATA" });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

// Index page of all images in a specific game
router.get('/game/:game_id', (req, res) => {
    Image.find({game_id: req.params.game_id})
        .then(images => res.json(images))
        .catch(err => res.status(404).json({ noimagesfound: 'No images available in that game.'}));
});

// Create an image in a game. How are we threading layers into this?
router.post("/game/:game_id",

    passport.authenticate('jwt', { session: false }),

    upload.single("image"),

    function(req, res) {
        console.log(req.params.game_id)
        const newImage = new Image({
            game_id: req.params.game_id,
            url: req.file.location
        })

        newImage.save().then(image => {
            const newImageInstance = new ImageInstance({
                image_id: image._id
            })
            newImageInstance.save().then(() => res.json(image))
        });
    }
);

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
    
    image.delete()
};


module.exports = router;

