//setup express
var express     = require('express');

var morgan = require('morgan');
var bodyParser = require('body-parser');
//call it in our variable
//tell express what our view engine will be

require('dotenv').config();

var config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    name: process.env.DB_USER,
    password: process.env.DB_PASS
  }
var path = require('path');
//var methodOverride  = require('method-override');
var app         = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('short'));
//app.use(methodOverride('_method'))



app.set('view engine', 'ejs');// also sets express to look for views folder
//set home route
app.get('/', function(req, res){
  res.render('index.html.ejs');
});
//set port app will listen on
var port      =process.env.PORT || 3000;
//start up server
app.listen(port, function(){
  console.log('server up @' + port + '/');
});
