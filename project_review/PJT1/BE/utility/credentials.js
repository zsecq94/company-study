const fs = require("fs");

var privateKey = fs.readFileSync("/etc/letsencrypt/live/k8c208.p.ssafy.io/privkey.pem");
var certificate = fs.readFileSync("/etc/letsencrypt/live/k8c208.p.ssafy.io/cert.pem");
var ca = fs.readFileSync("/etc/letsencrypt/live/k8c208.p.ssafy.io/chain.pem");

module.exports = { 
    key: privateKey, 
    cert: certificate, 
    ca: ca 
};