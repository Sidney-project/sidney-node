/* 
* @Author: thibault
* @Date:   2015-10-15 23:22:23
* @Last Modified by:   joly_k
* @Last Modified time: 2015-10-16 21:44:43
*/

var radio = require('./radio.js');

function test(){
	radio.Listening();

	setTimeout(function(){

	radio.Send("2", "ON");
	}, 2000);
	//radio.Send("2", "ON");
}
test();