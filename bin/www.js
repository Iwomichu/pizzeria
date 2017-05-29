"use strict";

//deps

var server = require("../dist/server.js");
var express = require("express");
var http = require("http");

//config

var httpPort = 8080;
var app = server.Server.bootstrap().app;
app.set("port", httpPort);
var httpServer = http.createClient(app);

//list

httpServer.listen(httpPort, function(){
    console.log("App is running on port no. %s", httpPort);
});