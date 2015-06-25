/**
 * Created by aaron.jin on 15/6/25.
 */

var express=require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var app=express();

app.use('/bower_components',express.static(__dirname+'/bower_components'));
app.use('/asserts',express.static(__dirname+'/asserts'));
app.use('/src',express.static(__dirname+'/src'));
app.use('/views',express.static(__dirname+'/views'));


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data


app.get('/*',function(req,res){
    res.sendfile(__dirname+'/index.html');
});



app.listen(3000,function(){
    console.log('server start at 3000!');
});
