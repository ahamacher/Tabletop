const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Message = require("../../models/Message");
const validateMessageInput = require("../../validation/messages");

// #TODO will current game live as part of url? or part of http header just like user?
router.get("/game/:game_id", (req, res) => {
    Message.find({game: req.params.game_id})
        .sort({ date: -1 })
        .then(messages => res.json(messages))
        .catch(err => res.status(404).json({ nomessagesfound: "No messages found in that game"}))
});

router.get("/game/:game_id.:user_id", (req, res) => {
    Message.find({game: req.params.game_id, user: req.params.user_id})
        .sort({ date: -1 })
        .then(messages => res.json(messages))
        .catch( err => res.status(404).json({ nomessagefound: "No message found from that user"}))
})

// #TODO what's stopping someone from accessing any message from any other game?
router.get("/:id", (req, res) => {
    Message.findById(req.params.id)
        .then(message => res.json(message))
        .catch(err => 
            res.status(404).json({nomessagefound: "No message found with that ID"}))
})

// #TODO what's stopping someone from posting message to any other game?
router.post("/game/:game_id",
    passport.authenticate("jwt", {session: false}),

    // #TODO we need a middleware here to authenticate that user belongs to game
    (req, res) => {
        const { errors, isValid } = validateMessageInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        let messageParams = {};
        messageParams.game = req.params.gem_id;
        messageParams.user = req.user.id;
        messageParams.text = req.body.text;
        if (!isNaN(req.body.positionX) && !isNaN(req.body.positionY)) {
            messageParams.positionX = req.body.positionX,
            messageParams.positionY = req.body.positionY
        }

        const newMessage = new Message(messageParams)

        newMessage.save().then(message => {
            req.app.io.in(req.params.game_id).emit('new-message', message);
            return res.json(message)});
    }
);

module.exports = router;