const express = require('express')
const app = express()
const MongoInstance = require('./persistance/mongoClient.js');
app.use(express.json());


app.get('/', (req, res) => res.send({name : 'Hello World!'}));

app.post('/newproduct', (req, res) => {
    MongoInstance.insertProduct(req.body,function(err,resp){
        if(err){
            res.sendStatus(500);
            return;
        }

        res.sendStatus(200);
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))