assert = require('assert');
module.exports = {

    MakeAccount :function(db,username,password, callback) {
        var collection = db.collection('Accounts');
    
        collection.insertMany([
          {
            username:username,
            password:password
          }
        ], function(err, result) {
          assert.equal(err, null);
          console.log("Account added!!!");
          callback(result);
        });
      }

};