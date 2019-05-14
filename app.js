const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const messages = require("./routes/api/messages");
const games = require("./routes/api/games");
const images = require('./routes/api/images');

const bodyParser = require("body-parser");
const db = require("./config/keys").mongoURI;
const passport = require('passport');
const app = express();


mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDb sucessfully"))
.catch(err => console.log(err));

app.get('/', (req, res) => res.send("Hello World!"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('a user disconnected');
  })
  socket.on('communication', data => {
    
  })
})

app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/messages", messages);
app.use("/api/images", images);
app.use("/api/games", games);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

