var assert = require('assert');
module.exports={
   FindSignal : function(db, callback) {
    var collection = db.collection('BiologiaProject');
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");

      callback(docs);
    });
  },
  FindMySignal : function(db,user,callback) {
    var collection = db.collection('BiologiaProject');
    collection.find({username:user}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");

      callback(docs);
    });
  }
}