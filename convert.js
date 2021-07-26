const fs = require("fs");
const MongoClient = require('mongodb').MongoClient;
const { Double } = require("mongodb");
const parser = require('xml2js').Parser({ explicitArray: false });

//var myArgs = process.argv.slice(2);
fs.readdir('.', function (err, files) {
    files.forEach(function (file, index) {
        if (file.endsWith('.xml')) {
            console.log('processing', file)
            var splitter = file.split('_');
            fs.readFile(file, async function (err, data) {
                parser.parseString(data, async function (err, result) {
                    const uri = "mongodb+srv://user.pass@cluster0.otvq3.mongodb.net/tides?retryWrites=true&w=majority";
                    const client = new MongoClient(uri);
                    await client.connect();
                    const database = client.db('tides');
                    const collection = database.collection('Tide');

                    var batch = collection.initializeOrderedBulkOp();
                    result.datainfo.data.item.forEach(function (item) {
                        var foo = (item.date + " " + item.time).toString();
                        item.locale = splitter[0];
                        item.datetime = new Date(foo);
                        item.pred_in_ft = Double(item.pred_in_ft);
                        item.pred_in_cm = Double(item.pred_in_cm);
                        batch.insert(item);
                    });

                    // Execute the operations
                    return batch.execute(function (err, result) {
                        console.dir(err);
                        console.dir(result);
                    });

                    client.close();
                });
            });
        }
    });
});