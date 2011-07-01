//  Packages

var sys       = require('sys'),
    express   = require('express'),
    app       = express.createServer(),
    nowjs     = require('now'),
    everyone  = nowjs.initialize(app);

//  Configs

var PORT = process.env.PORT || 3000,
    PIVITOL_GUID = "62cef81b16ebe06becb9dd2e7ad668bc",
    HOST = "http://severe-lightning-442.herokuapp.com";

/////////////
//         //
// Express //
//         //
/////////////

app.configure(function () {

  // Set up ./public as the static folder
  app.use(express.static(__dirname + '/public'));

  // Parse XML
  app.use(express.bodyParser());

  // Not sure what these do....
  app.use(express.methodOverride());
  app.use(app.router);
  

});


app.post('/sms/incoming', function (req, res) {

  var message = req.body.Body;
  var from = req.body.From;

  sys.log('From: ' + from + ', Message: ' + message);

	var twiml = '<?xml version="1.0" encoding="UTF-8" ?>\n<Response>\n<Sms>We got your text! Check the TV in front of you to see your message. Vote Nodify!</Sms>\n</Response>';
	res.send(twiml, {'Content-Type':'text/xml'}, 200);

  // This will fail if no clients are connected yet
  try {
    everyone.now.onMessage(message, from);
  } catch (e) {}

});


var froms = {};


app.post('/voice/incoming', function (req, res) {

  froms[req.body.CallSid] = req.body.From;
  sys.log('ID: ' + req.body);
  sys.log('FROM: ' + req.body.Caller);

  var twiml = '<?xml version="1.0" encoding="UTF-8" ?>\n<Response>\n<Say>Please record your message</Say>\n<Record action="' + HOST + '/voice/record" /><Say>Please hang up and try again</Say></Response>';
  res.send(twiml, {'Content-Type':'text/xml'}, 200);

});


app.post('/voice/record', function (req, res) {

  var url = req.body.RecordingUrl;
  var from = froms[req.body.CallSid];
  sys.log('URL: ' + url);
  sys.log('FROM: ' + from);
  sys.log('ID: ' + req.body.CallSid);
  sys.log('FROM: ' + req.body.Caller);

  var twiml = '<?xml version="1.0" encoding="UTF-8" ?>\n<Response>\n<Say>Thanks. Your recording will be played to the office now.</Say>\n<Hangup/>\n</Response>';

  res.send(twiml, {'Content-Type':'text/xml'}, 200);

  try {

    everyone.now.onRecording(url, '911');

  } catch (e) {}

});


app.listen(PORT);
