const express = require("express");
const router = express.Router();
const passport = require("passport");

const ImageInstance = require('../../models/ImageInstance');
const Image = require("../../models/Image");

router.get('/game/:game_id', (req, res) => {
    let image_ids = []
    Image.find({game_id: req.params.game_id})
        .then(images => (
            images.forEach((image) => {
            image_ids.push(image._id)
        })
        ))
        .then(() => {
    ImageInstance.find({ image_id: { $in: image_ids } })
        .then(imageInstances => res.json(imageInstances))
        .catch(err => res.status(404).json({ noimageinstancesfound: 'No image instances available in that game.' }));
        })
});

router.post("/image/:image_id", (req, res) => {
    Image.findById(req.params.image_id)
        .then(image => {
            const newImageInstance = new ImageInstance({
                image_id: image._id
            })
            newImageInstance.save().then(() => res.json(image))
        })
        .catch(err => res.status(404).json({ noimagesfound: "No image found"}))
})

router.put("/:image_instance_id", (req, res) => {
    const updateParams = req.body;

    ImageInstance.findOneAndUpdate( {id: req.params.image_id}, updateParams, {new: true}, function(err, imageInstance) {
        res.json(imageInstance)
    } )
})


module.exports = router;
