assert = require('assert');
module.exports = {

    PutSignal :function(db,signal,user, callback) {
        var collection = db.collection('BiologiaProject');
    
        collection.insertMany([
          {
            Signal:signal,
            username:user
          }
        ], function(err, result) {
          assert.equal(err, null);
          console.log("Inserted a document into the collection");
          callback(result);
        });
      }

};