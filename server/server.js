var express = require('express'),
    app = express(),
    server  = require('http').createServer(app),
    bcrypt = require('bcrypt'),
    jwt = require('jwt-simple'),
    db = require('./db.js');
     
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() { 
  console.log('Node app running on port', app.get('port')) 
});
app.use(express.static('./client'));


app.get('/login', function(req,res){
  var email = req.query.email,
      pw = req.query.password,
      salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync(pw, salt);

  //check DB  
  db.select('password').from('doThings')
    .where('email', email)
    .then(function(result){
      console.log(result)
      if (result.length === 0){ //if user not found in db
        db('doThings').insert({ //insert the user and their info
          email: email,
          password: hash
        })
        .then(function(result){
          var token = jwt.encode(email, 'gottadodat'); //then issue a token
          res.send({token: token})  //send user token
        })
      } else {
        var result = result[0].password;

        bcrypt.compare(pw, result, function(err, same) {
          if (same){
            console.log("token sending!")
            var token = jwt.encode({email:email,pw:hash}, 'gottadodat') 
            res.send({token: token}) 
          } else { //wrong password
            res.send({token: false})
          }
        })
      }
    })

})


app.post('/addItem', function(req,res){

})

app.get('/getItems', function(req,res){
  
})







