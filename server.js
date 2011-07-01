var express   = require('express'),
    app       = express.createServer(),
    nowjs     = require('now'),
    everyone  = nowjs.initialize(app);

/////////////
//         //
// Express //
//         //
/////////////

// Set up ./public as the static folder
app.configure(function () {

  app.use(express.static(__dirname + '/public'));

});

app.listen(80);


/////////
//     //
// Now //
//     //
/////////


