/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var http = require('http');
http.createServer(function(req, res){
   res.writeHead(200);
   res.write("Server wacht auf");
   setTimeout(function(){
        res.write("Server schläft ein");
        res.end();

   },2000);


}).listen(8080);

