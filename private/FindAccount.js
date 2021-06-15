var assert = require('assert');
module.exports={
   FindAccount : function(db,username,password, callback) {
       console.log(username);
       console.log(password);
    var collection = db.collection('Accounts');
    collection.find({username:username,password:password}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");

      callback(docs);
    });
  },
  FindExistingAccount : function(db,username, callback) {
        console.log(username);
                var collection = db.collection('Accounts');
                collection.find({username:username}).toArray(function(err, docs) {
                assert.equal(err, null);
                console.log("Found the following records");

                callback(docs);
                });
    } 
}