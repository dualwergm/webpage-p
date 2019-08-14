const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

//connecting to db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ptechdb')
    .then(db => console.log('Db connected'))
    .catch(err => console.log(err));

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//routes
app.use(require('./routes'));

app.use(express.static(path.join(__dirname, 'public')));

//server
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get("port"));
});
