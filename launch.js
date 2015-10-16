/* 
* @Author: thibaultneveu
* @Date:   2015-10-12 20:39:12
* @Last Modified by:   joly_k
* @Last Modified time: 2015-10-16 21:45:32
*/

var express = require('express');
var app = express();
var radio = require('./radio.js');
var tts = require('./tts.js')

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

var io = require('socket.io')(server);
	radio.Listening();
io.on('connection', function(socket){
	console.log("Service connected");
	
	socket.emit("services/ears/listen_for_ever", "hello");
	var tw = 0;
	socket.on("services/ears/listen_for_ever_response", function(data){
		if (tw > 0){
			return 0;
		}
		tw = tw + 1;
		if (data.status == 200){
			tts.say("Hi Thibault, What can i do for you ?");
			socket.emit("services/ears/listen_for_ever", "turn_on_light");
			socket.on("services/ears/listen_for_ever_response", function(data){
				tts.say("Ok, il will turn on light");
				//radio.Listening();
				radio.Send("2", "ON");
			});
		}
	});
});
