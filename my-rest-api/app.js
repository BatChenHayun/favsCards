require("dotenv").config();
const users = require('./routes/users');
const auth = require('./routes/auth');
const cards = require('./routes/cards');
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const path = require("path");


const mongodburi='mongodb://localhost/my_rest_api';

mongoose.connect((process.env.mongodburi)||('mongodb://localhost/my_rest_api'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
}).then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public")))

app.use(cors());
//תדאג לכך שכל נתון שנקבל או נחזיר באפליקציה שלנו - תתקבל או תצא בפרורמט של ג'ייסון בלבד
app.use(express.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/cards', cards);
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



let port = process.env.PORT||3900;
http.listen(port, () => console.log(`Listening on port ${port}...`));