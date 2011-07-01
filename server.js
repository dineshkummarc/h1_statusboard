//  Packages

var express   = require('express'),
    app       = express.createServer(),
    nowjs     = require('now'),
    everyone  = nowjs.initialize(app);

//  Configs

var PORT = process.env.PORT || 3000,
    TWILIO_SID = "ACa9ac2b83e4340ae8bbc6a38bd8a35376",
    TWILIO_TOKEN = "b0ec1cdf09ab21517fd39cef12bffb86",
    TWILIO_HOST = "http://severe-lightning-442.herokuapp.com/",
    TWILIO_NUM = "+18052146633";

/////////////
//         //
// Express //
//         //
/////////////

// Set up ./public as the static folder
app.configure(function () {

  app.use(express.static(__dirname + '/public'));

});


app.listen(PORT);


/////////
//     //
// Now //
//     //
/////////


//  Twilio  //

var TwilioClient = require('twilio/client'),
    client = new TwilioClient(sid, authToken, hostname, opts);

var phoneNumber = getPhoneNumber(TWILIO_NUM);

phoneNumber.on('incomingSms', function (smsParams, response) {

  console.log(smsParams, response);

});
