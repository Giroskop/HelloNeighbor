const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
const formData = require('express-form-data');
const path = require("path");

const mongoUrl = "mongodb://localhost:27017/hello";
const atlasUrl = 'mongodb+srv://userDaniil:111@cluster0.cwgwa.mongodb.net/HelloNeighbor?retryWrites=true&w=majority'
const WebSocket = require('ws');
const Users = require("./models/user");

const morgan = require("morgan");

const wss = new WebSocket.Server({ port: 8080 });

const app = express();
// const map = new Map();

// const server = http.createServer(app);
// const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

const registerRoute = require("./routes/registrationRoute");
const userRouter = require("./routes/userRouter");
const loginRoute = require("./routes/loginRoute");



app.use(express.static("public"));
app.use(morgan('dev'))
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('Shama hi');
  });
});

app.use("/registration", registerRoute);
app.use('/user', userRouter);
app.use("/login", loginRoute);



app.listen(3001, () => {
  console.log("Go retard");
  connect(
    atlasUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    },
    () => {
      console.log("База зазазаз");
    }
  )

});
