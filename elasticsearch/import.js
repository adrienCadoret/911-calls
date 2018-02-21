var elasticsearch = require('elasticsearch');
var csv = require('csv-parser');
var fs = require('fs');

var esClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
});

let calls = [];
let nb_calls = 0;
fs.createReadStream('../911.csv')
    .pipe(csv())
    .on('data', data => {
      calls.push({
        index: {
          _index: '911-calls',
          _type: 'calls'
        }
      });

      calls.push({
        "location" : { lat: data.lat, lon: data.lng },
        "desc": data.desc,
        "zip": data.zip,
        "title": data.title,
        "timeStamp": data.timeStamp,
        "twp": data.twp,
        "addr": data.addr,
        "e": data.e,
        "type": getType(data.title),
        "month": data.timeStamp.split('-')[1].trim() + "/" + data.timeStamp.split('-')[0].trim()
      });

      nb_calls++;
    })
    .on('end', () => {
      esClient.bulk({
        body: calls
      }, function (err, response) {
        if (err) {
          console.log(err);
          return;
        }

        console.log(`Inside bulk3...`);
        let errorCount = 0;
        response.items.forEach(item => {
          if (item.index && item.index.error) {
            console.log(++errorCount, item.index.error);
          }
        });
      });
    });

function getType(title) {
  var type = title.split(':')[0];
  
  return type;
}