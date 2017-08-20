var http = require('http');

app = require('./app') ();
var routes = require('./routes/couponWalletRoute'); //importing route
routes(app); 

app.listen(8000);
console.log('Listening on port 8000...');