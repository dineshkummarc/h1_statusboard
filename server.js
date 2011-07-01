var express   = require('express'),
    app       = express.createServer(),
    nowjs     = require('now'),
    everyone  = nowjs.initialize(app);

var PORT = process.env.PORT || 3000;

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


