const express = require("express");
const router = express.Router();
const passport = require("passport");
const Game = require('../../models/Game');

// games index
router.get('/', (req, res) => {
    Game.find()
        .sort({ date: -1 })
        .then(games => res.json(games))
        .catch(err => res.status(404).json({ nogamesfound: 'No games found' }));
});

// game show
router.get('/:id', (req, res) => {
    Game.findById(req.params.id)
        .then(game => res.json(game))
        .catch(err =>
            res.status(404).json({ nogamefound: 'No game found with that ID' })
        );
});

// game create 
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log(req.body)
        const newGame = new Game({
            name: req.body.name,
            gameMaster: req.user.id
        });

        newGame.save().then(game => res.json(game));
    }
);

module.exports = router;