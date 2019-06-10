const express = require("express");
const router = express.Router();
const passport = require("passport");
const Game = require('../../models/Game');
const User = require('../../models/User');

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("../../config/keys");

aws.config.update({
    secretAccessKey: config.s3secretAccessKey,
    accessKeyId: config.s3accessKeyId,
    region: config.s3region
});

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
});

// games index
router.get('/', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Game.find({ users: { "$in": [req.user.id] } })
        .sort({ date: -1 })
        .then(games => res.json(games))
        .catch(err => res.status(404).json({ nogamesfound: 'No games found' }));
});

// game show
router.get('/:id', (req, res) => {
    // console.log(req.params.id);
    Game.findById(req.params.id)
        .then(game => {
            return res.json(game);
        })
        .catch(err =>
            res.status(404).json({ nogamefound: 'No game found with that ID' })
        );
});

// game join
router.put('/:id', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Game.findOne({ _id: req.params.id}, (err, game) => {
            game.users = game.users.concat([req.user.id]);
            User.findById(req.user._id, (err, user) => {
                user.games = user.games.concat([game._id])
                user.save();
            });
            game.save().then(game => res.json(game))
            .catch(err => console.log(err));
        })
});

// game create 
router.post('/',
    passport.authenticate('jwt', { session: false }),
    upload.single("image"),

    function(req, res) {
        let cover;
        if (req.file) {
            cover = req.file.location;
        } else {
            cover = null;
        }

        const newGame = new Game({
            name: req.body.name,
            gameMaster: req.user.id,
            users: [req.user.id],
            cover: cover
        });

        newGame.save().then(game => res.json(game));
    }
);

module.exports = router;