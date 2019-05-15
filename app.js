const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const messages = require("./routes/api/messages");
const games = require("./routes/api/games");
const images = require('./routes/api/images');
const imageInstances = require('./routes/api/image_instances');

const bodyParser = require("body-parser");
const db = require("./config/keys").mongoURI;
const passport = require('passport');
const app = express();
const path = require('path');


mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDb sucessfully"))
.catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })

  const port = process.env.PORT || 5000;
  
  app.listen(port, () => console.log(`Server is running on port ${port}`));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.io = io;

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });
  socket.on('join', room => {
    console.log(`a user connected to room: ${room}`)
    socket.join(room);
  });
  socket.on('messages', data => {
    console.log(data);
    io.in(data.room).emit('new-message', data.message);
  })
})
io.listen(8000);
// end socket 


app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/messages", messages);
app.use("/api/images", images);
app.use("/api/games", games);
app.use("/api/image_instances", imageInstances);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

