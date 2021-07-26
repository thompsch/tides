const fs = require("fs");
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://user:pass@cluster0.otvq3.mongodb.net/tides?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect().then(() => {
    const database = client.db('tides');
    const collection = database.collection('Tide');

    collection.updateMany({}, { $set: { "_part": "tide" } });

    /*
    var batch = collection.initializeOrderedBulkOp();

    batch.find({}).update({
        "_part": "tide"
    });

    // Execute the operations
    batch.execute(function (err, result) {
        console.dir(err);
        console.dir(result);
    });*/

})
