var express = require("express");

var httpPort = 3000;

var app = require("./../dist/app");

app.listen(httpPort, function(){
    console.log("I'm listening on %s", httpPort);
});