const express = require("express");
const router = express.Router();
const passport = require("passport");
const Game = require('../../models/Game');
const User = require('../../models/User');

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
    console.log(req.params.id);
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
    (req, res) => {
        const newGame = new Game({
            name: req.body.game.name,
            gameMaster: req.user.id,
            users: [req.user.id]
        });

        newGame.save().then(game => res.json(game));
    }
);

module.exports = router;