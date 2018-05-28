const express = require('express')
const app = express()
const MongoInstance = require('./persistance/mongoClient.js');

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(express.json());
app.use(allowCrossDomain);




app.get('/product/:customername', (req, res) => {
  MongoInstance.findAll(req.params, function(err, resp) {
    if (err) {
      res.sendStatus(500);
      return;
    }



    var activeFormList = {};

    resp.forEach((obj)=>{
        activeFormList[obj.formname] = true;
    });

    res.send(activeFormList);
  });
});


app.get('/product/:customername/:formname', (req, res) => {
  MongoInstance.findProduct(req.params, function(err, resp) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(resp);
  });
});

app.post('/newproduct', (req, res) => {
  MongoInstance.insertProduct(req.body, function(err, resp) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
});



app.listen(3000, () => console.log('Example app listening on port 3000!'))