// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const { format } = require('date-fns');

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
  res.json({greeting: 'hello API'});
});
app.get("/api/:date?",(req,res)=>{
  const dateParam = req.params.date;

  let inputDate;

  if (!dateParam) {
    // If the date parameter is empty, use the current time
    inputDate = new Date();
  } else if (!isNaN(dateParam) && !isNaN(parseFloat(dateParam))) {
    inputDate = new Date(parseInt(dateParam));
  } else {
    inputDate = new Date(dateParam);
  }
  // Check if the input date is valid
  if (isNaN(inputDate.getTime())) {
    return res.status(400).json({ error: 'Invalid Date' });
  }

  // Convert the input date to a Unix timestamp in milliseconds
  const unixTimestamp = inputDate.getTime();
  const utcFormattedDate = format(inputDate, 'EEE, dd MMM yyyy HH:mm:ss \'GMT\'', { timeZone: 'GMT' });

  // Create the JSON response with the 'unix' key
  const responseJson = { unix: unixTimestamp, utc: utcFormattedDate };

  // Send the JSON response
  res.json(responseJson);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
