/* 
* @Author: Adrien
* @Date:   2015-10-15 18:14:27
* @Last Modified by:   thibault
* @Last Modified time: 2015-10-16 00:07:45
*/

	function sendRadio(num_prise, on_off){
		var SerialPort = require("serialport").SerialPort
		var serialPort = new SerialPort("/dev/ttyACM0", {
    		baudrate: 9600
		}		, false);
		var error = 'non';
		var send = '';
		if (String(num_prise) === '1'){
			if (String(on_off) === 'ON'){
				send = '1';
			}
			else if (String(on_off) === 'OFF'){
				send = '2';
			}
			else {
				error = 'oui';
			}
		}
		else if (String(num_prise) === '2'){
			if (String(on_off) === 'ON'){
				send = '3';
			}
			else if (String(on_off) === 'OFF'){
				send = '4';
			}
			else {
				error = 'oui';
			}
		}
		else {
			error = 'oui';
		}

		if (error === 'non'){
			serialPort.open(function (error) {
    		serialPort.write(send);
    		serialPort.close();
    		});
    	}
    	else {
    		console.log('Erreur d\'envoi');
    	}
	};
	sendRadio('2', 'OFF');