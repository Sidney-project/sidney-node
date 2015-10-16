/* 
* @Author: thibaultneveu
* @Date:   2015-10-15 23:28:52
* @Last Modified by:   thibaultneveu
* @Last Modified time: 2015-10-16 21:06:42
*/

var exec = require("exec");
var speed = 0;

module.exports = {

	setSpeed : function(value){
		speed = value;
	},

	say : function(text, callback){
  		var text = text.split(' ');
  		var param = "";
  		var i = 0
  		for (el in text){
    		if (i != 0)
      			param += "+"
    		param += text[el];
    		i = i + 1;
  		}
  		var url = "http://translate.google.com/translate_tts?q="+ param +"&tl=en-us&ie=UTF-8&client=tw-ob"
  		var commande = 'mpg123 "' + url + '"';
  		console.log("Launch commande >");
		exec(commande, function(err, out, code) {
  			if (err instanceof Error)
    			throw err;
  			process.stderr.write(err);
  			process.stdout.write(out);
  			if (callback)
  				callback();
		});
	}	
};