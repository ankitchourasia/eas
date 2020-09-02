const compression = require('compression');
const express = require('express');
const fs = require('fs');
const proxy = require('http-proxy-middleware');

const app = express();

//setting app to compress data
console.log("using compression");
app.use(compression());

let NGB_DIST_PATH = 'C:/nodeworkspace/eas/dist';
console.log("using NGB DIST FOLDER PATH as " + NGB_DIST_PATH);

//running the app by serving the static files
//from dist folder
app.use(express.static(NGB_DIST_PATH));

// Add middleware for http proxying 
const DEVELOPMENT_BACKEND_SERVER = 'http://10.98.4.114:8080';

const LOCAL_BACKEND_SERVER = 'http://localhost:8080';

//app.use('/mppkvvcl/nextgenbilling/', proxy({target: '', changeOrigin: true}));
app.use('/ROOT/backend/*', proxy({
  target: DEVELOPMENT_BACKEND_SERVER,
  xfwd: true
}));


//for local testing
//app.use('/mppkvvcl/nextgenbilling/', proxy({target: LOCAL_BACKEND_SERVER, changeOrigin: true}));

const path = require('path');
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function (req, res) {
  console.log("Server request on process Id " + process.pid);
  console.log(JSON.stringify(req.headers));
  res.sendFile(path.join(NGB_DIST_PATH + '/index.html'));
});

/*var key = fs.readFileSync('ssl/privatekey.pem');
var cert = fs.readFileSync( 'ssl/ngbmpwincoin.pem' );*/

console.log("Requiring https ");
var http = require('http');
var httpServer = http.createServer(app);
console.log("Created https server");

console.log("Starting Node Server with ngb frontend application");

let port = 4201;

httpServer.listen(port, () => {
 if (DEVELOPMENT_BACKEND_SERVER) {
    console.log("using development backend server as " + DEVELOPMENT_BACKEND_SERVER);
  } else {
    console.log("Unknown Backend Server url");
  }
  console.log("Started Server at port " + port + " with process Id " + process.pid);
});


