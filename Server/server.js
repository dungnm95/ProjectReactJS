var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt    = require('jsonwebtoken');

app.set('superSecret', 'aBcD123');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


//Set up default mongoose connection
var mongoDB = 'mongodb://localhost/test';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
// tạo  schemas and models ở đây.
var userSchema = new mongoose.Schema({
    username: { type: String }, password: String
});
// tao model smarjob tương ứng với schema đã khai báo bên trên
var users = mongoose.model('users', userSchema);
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/login', function (req, res) {
	var user = req.body.user;
	var password = req.body.password;
    users.findOne({ username: user }, function(err, data) {
      if (err) return res.json({
        success: false,
        message: err
      });
      var crypto = require('crypto');
      var has_pass = crypto.createHash('md5').update(password).digest("hex");
      if(has_pass === data.password){
        var token = jwt.sign({user_id: data._id}, app.get('superSecret'));
        return res.json({
          success: true,
          message: 'Login successful!',
          access_token: token
        });
      }else{
        return res.json({
          success: false,
          message: 'Login fail!'
        });
      }
    });

});
app.post('/register', function (req, res) {
	var username = req.body.user;
	var email = req.body.email;
  var password = req.body.password;
  var user;
  users.findOne({username: username }, function(err, data) {
    if(data){
      return res.json({
        success: false,
        message: 'Exist account'
      });
    }else{
      var crypto = require('crypto');
      var has_pass = crypto.createHash('md5').update(password).digest("hex");
      var products = db.collection('products');
      user = new users({ username: username, email: email, password: has_pass});

      user.save(function(err, data) {
        if (err){
          return res.json({
            success: false,
            message: 'Add account error'
          });
        }else{
          return res.json({
            success: true,
            message: 'Add account success'
          });
        }
      });
    }
  });


});
app.post('/checklogin', function(req, res){
  var token = req.headers.access_token;
  var decoded = jwt.verify(token, app.get('superSecret'));
  var user_id = decoded.user_id;
  users.findOne({_id: user_id }, function(err, data) {
    if(data){
      return res.json({
        success: true
      });
    }else{
      return res.json({
        success: false
      });
    }
  });
});
