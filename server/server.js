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

  db('doThings').select('password')
  .where('email',email)
  .then(function(resultg){
    var result = result[0].password;
    bcrypt.compare(pw, result, function(err, same) {
      if (same){
        var token = jwt.encode({email:email,pw:hash}, 'gottadodat') 
        res.send({token: token}) 
      } else {
        res.send({token:false})
      }
    })
  })
})


app.get('/signup', function(req,res){
  var email = req.query.email,
      pw = req.query.password,
      salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync(pw, salt);

  db('doThings').insert({
    email:email,
    password: hash
  })  
  .then(function(result){
    var token = jwt.encode(email, 'gottadodat'); //then issue a token
    res.send({token: token})  //send user token
  })
})


app.get('/getItems', function(req,res){
  var email = req.query.email;

  db('doThings').select('id')
  .where('email', email)
  .then(function(id){
    var newId = id[0].id
    db('listItems').select('*')
    .where('userId', newId)
    .then(function(items){
      console.log('items',items)
      res.send({items:items})
    })
  })
})

app.post('/addItem', function(req,res){
  var item = req.query.item,
      email = req.query.email;
  
  db('doThings').select('id')
  .where('email', email)
  .then(function(id){
    var newId = id[0].id
    db('listItems').insert({ 
      item: item,
      userId: newId
    })
    .then(function(){
      res.send({added:true})
    })
  })

})

app.post('/removeItem', function(req,res){
  var item = req.query.item,
      email = req.query.email;

  db('doThings')
  .where('email',email)
  .then(function(id){
    var newId = id[0].id
    db('listItems')
    .where({'userId':newId, 'item': item})
    .del()
    .then(function(){
      res.send({removed:true})
    })
  })
})










