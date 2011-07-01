//  Packages

var sys       = require('sys'),
    express   = require('express'),
    app       = express.createServer(),
    nowjs     = require('now'),
    everyone  = nowjs.initialize(app);

//  Configs

var PORT = process.env.PORT || 3000;

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


app.post('/incoming', function (req, res) {

  var message = req.body.Body;
  var from = req.body.From;

  sys.log('From: ' + from + ', Message: ' + message);
	var twiml = '<?xml version="1.0" encoding="UTF-8" ?>\n<Response>\n<Sms>Thanks for your text, we\'ll be in touch.</Sms>\n</Response>';
	res.send(twiml, {'Content-Type':'text/xml'}, 200);


});


app.listen(PORT);


/////////
//     //
// Now //
//     //
/////////


