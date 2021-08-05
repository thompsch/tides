const fs = require("fs");
const MongoClient = require('mongodb').MongoClient;
const { Double } = require("mongodb");
const parser = require('xml2js').Parser({ explicitArray: false });

//var myArgs = process.argv.slice(2);

const uri = "mongodb+srv://caleb:bnl4270@cluster0.otvq3.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&ssl=true";
const client = new MongoClient(uri);
client.connect().then(() => {
    const database = client.db('tides');
    const collection = database.collection('Station');


    fs.readFile('stations.json', function (err, fileContents) {
        let boop = JSON.parse(fileContents);
        var batch = collection.initializeOrderedBulkOp();
        boop.stations.forEach(sta => {

            var newStation = {};
            newStation.Id = sta.id;
            newStation.Name = sta.name;
            newStation.State = sta.state;
            newStation.Latitude = sta.lat;
            newStation.Longitude = sta.lng;

            // console.log(newStation)
            batch.insert(newStation);

        });

        return batch.execute(function (err, result) {
            console.dir(err);
            console.dir(result);
        });
    });
})



/*
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
                    const collection = database.collection('Station');

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
});*/