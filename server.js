var express = require('express');

var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

var port = process.env.PORT || 1313;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://valeri:dodo2110@trial.xqsc2.mongodb.net/school?retryWrites=true&w=majority";

var assert = require('assert');

var InsertSignal = require('./private/PutSignal.js');
var FindSignal = require('./private/FindSignal.js');
var MakeAccount  = require('./private/Register.js');
var Account = require('./private/FindAccount.js');
server.listen(port, function(){

  console.log('Server listening at port %d',port);

});

app.use("/static",express.static("./public"));

app.get("/",function(req,res){

  res.sendfile(__dirname+'/public/html/login.html');

});




io.on('connection',function(socket){
      socket.on("PutSignal",function(signal){
        MongoClient.connect(url,function(err,client){
          var db = client.db("school");
          assert.equal(null,err);
          console.log("Connected");
          InsertSignal.PutSignal(db,signal.text,signal.username,function(){
            client.close();
          });
        });
      });
    socket.on('GiveInfo',function(){
      
      MongoClient.connect(url,function(err,client){
        var db = client.db("school");
        assert.equal(null,err);
        console.log("Connected");
        FindSignal.FindSignal(db,function(docs){
          console.log(docs);
          console.log(docs.length);
          io.emit('Info',docs);
          client.close();
        });
      });
    });
  

    socket.on('Account',function(account){

      MongoClient.connect(url,function(err,client){
        var db = client.db('school');
        assert.equal(err,null);
        console.log("Connected");
        var info = 0;
        Account.FindExistingAccount(db,account.username,function(docs){
          console.log(docs);
          console.log(docs.length);
          info = docs.length;
          if(docs.length <= 0){
            MakeAccount.MakeAccount(db,account.username,account.password,function(){
                client.close();
                io.emit('Info', info);
            });
          }else{
            io.emit('Info',info);
          }
          client.close();
        });
        
      });
    });


    socket.on('FAccount',function(account){
      MongoClient.connect(url,function(err,client){
        var db = client.db("school");
        assert.equal(null,err);
        console.log("Connected");
        Account.FindAccount(db,account.username,account.password,function(docs){
          console.log(docs);
          console.log(docs.length);
          io.emit("Acnt",docs);
          client.close();
        });
      });


      


    });
    socket.on('GiveMyInfo',function(username){
      console.log("OKs");
        MongoClient.connect(url,function(err,client){
          var db = client.db("school");
          assert.equal(null,err);
          console.log("Connected");
          FindSignal.FindMySignal(db,username,function(docs){
            console.log(docs);
            console.log(docs.length);
            io.emit('MyInfo',docs);
            client.close();
          });
        });
      });

});
