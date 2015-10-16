/* 
* @Author: joly_k
* @Date:   2015-10-16 20:51:43
* @Last Modified by:   joly_k
* @Last Modified time: 2015-10-16 20:53:11
*/

   function Listening(){
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

  }
   
   Listening();