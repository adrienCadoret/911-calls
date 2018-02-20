var mongodb = require('mongodb');
var csv = require('csv-parser');
var fs = require('fs');

var MongoClient = mongodb.MongoClient;
var mongoUrl = 'mongodb://localhost:27017/911-calls';

var insertCalls = function(db, callback) {
    var collection = db.collection('calls');


    var calls = [];
    fs.createReadStream('../911.csv')
        .pipe(csv())
        .on('data', data => {
        // TODO créer l'objet call à partir de la ligne
        const call = {
             "loc" : {
                 type: "Point",
                 coordinates : [Number(data.lng),Number(data.lat)]
            },
            "desc": data.desc,
            "zip": data.zip,
            "title": data.title,
            "timeStamp": new Date(data.timeStamp),
            "twp": data.twp,
            "addr": data.addr,
            "e": data.e
        };
        calls.push(call);
    })
    .on('end', () => {
        collection.insertMany(calls, (err, result) => {
            callback(result);
            console.log(result)
        });
    });
}

MongoClient.connect(mongoUrl, (err, db) => {
    insertCalls(db, result => {
    console.log(`${result.insertedCount} calls inserted`);
db.close();
});
});
