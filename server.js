// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const port = process.env.PORT || 3000

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  console.log("greeting : Hello API")
  res.json({greeting: 'hello API'});
});


// app.get("/api/whoami",((req,res) => {
//   res.json({
//      "ipaddress" : req.headers['host'],
//      "language" : req.headers["accept-language"],
//      "software" : req.headers["user-agent"]
//   })
// }))


app.get("/api/",((req,res) => {
  const currentDate = new Date();
  console.log(currentDate);
  res.json({
    "unix" : currentDate.getTime(),
    "utc" : currentDate.toUTCString()
  })
}))



 app.get("/api/:date?",((req,res) => {
    const dateString = req.params.date;

    if(parseInt(dateString) > 10000){
      let unixTime = new Date(parseInt(dateString));
      res.json({
        "unix" :  unixTime.getTime(),
        "utc"  : unixTime.toUTCString()
      })
    }

    const passedInValue = new Date(dateString);

    if(passedInValue == "Invalid Date" ){
      console.log(passedInValue,"<= wrong Format")

      res.json({
        "error" : "Invalid Date"
      })

    }else {
      res.json({
        "unix" : passedInValue.getTime(),
        "utc" : passedInValue.toUTCString()
      })
    }
   

 }))



// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
