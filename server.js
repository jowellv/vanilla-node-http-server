'use strict';

var http = require('http');

var server = http.createServer(function(req, res) {
  var pathParams = req.url.split('/');

  if(pathParams[1] === 'greet') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    if(pathParams[2] && req.method === 'GET' && pathParams[2].length > 0) {
      res.write(JSON.stringify({msg:'hello ' + pathParams[2]}));
      res.end();
    } else {
      if(req.method === 'POST') {
        req.on('data', function(data) {
          var body = JSON.parse(data.toString('utf-8'));
          res.write(JSON.stringify({msg:'hello ' + body.name}));
          res.end();
        });

      } else {
        res.write(JSON.stringify({msg:'hello no name~'}));
        res.end();
      }
    }
  } else if(pathParams[1] === 'time'){
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      var d = new Date();
      res.write(JSON.stringify({currentTime:d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()}));
      res.end();
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify({msg:'page not found'}));
    res.end();
  }
});

server.listen(3000, function() {
  console.log('server up');
});
