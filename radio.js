/* 
* @Author: joly_k
* @Date:   2015-10-16 20:49:49
* @Last Modified by:   joly_k
* @Last Modified time: 2015-10-16 21:42:37
*/

function startListening(code, callback){

        var lastTimeDataReceived = [];
        var serialport = require("serialport");
        var SerialPort = serialport.SerialPort; 
        
          var sp = new SerialPort("/dev/ttyACM0", {
              parser: serialport.parsers.readline("\n")
          }, false);

        sp.on('error', function(err) {
          console.log(err);
        });

        sp.open(function (err) {
          if (err) {
             console.log(err);
             return;
          }

          // each time a serial port message is received
          sp.on("data", function (data) {
         
            try
            {
              // trying to parse JSON received
               var  result = JSON.parse(data);
            }
            catch(e)
            {
               console.log('Invalid JSON received from serial port');
            }
            
            if(result && result[0]['action'] == "received")
            {
                var actual_time = (new Date()).getTime();
                if (code == result[0]['value']){
                	callback();
                	sp.close();
                }
                //console.log(result[0]['value']);
                lastTimeDataReceived[result[0]['value']] = (new Date()).getTime();
            }

		});

  });
}

module.exports = {

	 Listen : function(code, callback){
	 	startListening(code, callback);
	 },

   Listening : function(callback){
        var lastTimeDataReceived = [];
        var serialport = require("serialport");
        var SerialPort = serialport.SerialPort; 
        
          var sp = new SerialPort("/dev/ttyACM0", {
              parser: serialport.parsers.readline("\n")
          }, false);

        sp.on('error', function(err) {
          console.log(err);
        });

        sp.open(function (err) {
          if (err) {
             console.log(err);
             return;
          }
          // each time a serial port message is received
          sp.on("data", function (data) {
            try
            {
              // trying to parse JSON received
               var  result = JSON.parse(data);
            }
            catch(e)
            {
               console.log('Invalid JSON received from serial port');
            }
            
            if(result && result[0]['action'] == "received")
            {
                var actual_time = (new Date()).getTime();
                lastTimeDataReceived[result[0]['value']] = (new Date()).getTime();
            }
          //sp.close();
        });

  });
},

   Send : function(num_prise, on_off){
    var SerialPort = require("serialport").SerialPort
    var serialPort = new SerialPort("/dev/ttyACM0", {
        baudrate: 9600
    }   , false);
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
   }
};