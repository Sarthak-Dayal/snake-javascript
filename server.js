var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var fs = require('fs');
var dataFile = 'data/ranking.json';

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', (process.env.PORT || 5000));
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'static/index.html'));
});

// app.get('/add', function(request, response) {
//
// });

app.get('/read', function(request, response) {
  console.log('going to read');


});

function comp(a, b) {
  return a.val < b.val;
}

server.listen((process.env.PORT || 5000), function() {
  console.log('Starting server on port 5000');

});

var objArray = [];

io.on('connection', function(socket) {

  socket.on('new player', function() {
    console.log('new player joined');
  });

  socket.on('result', function(data) {
    console.log('going to add');
    let obj = {
      name: data.name,
      val: data.val
    };

    fs.readFile(dataFile, 'utf8', function(err, data) {
      if (err) {
        throw err;
      }
      console.log("Reading file asynchronously");
      objArray = data? JSON.parse(data) : [];
      objArray.push(obj);
      fs.writeFile(dataFile, JSON.stringify(objArray, null, 2), function(err) {
        if (err) throw err;
      });
      objArray = [];
      // jsonArray.sort(comp);
      // for(let i in jsonArray) {
      //   let json = jsonArray[i];
      //   console.log(json.name + ' : ' + json.val);
      // }
    });


  });

});
