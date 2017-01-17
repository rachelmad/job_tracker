import express from 'express';
import bodyParser from 'body-parser';
import MongoClient from 'mongodb';
var ObjectId = require('mongodb').ObjectID;

var app = express();
var db;

function getFromCollection(collection, parameters) {
  return db.collection(collection).find().toArray();
};

function addToCollection(collection, parameters) {
  return db.collection(collection).insertOne(parameters.body).then((result) => {
    return db.collection(collection).find({
      _id: result.insertedId
    }).toArray();
  });
}

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});

app.get('/api/jobs', (req, res) => {
  getFromCollection("jobs", "").then((docs) => {
    res.json(docs);
  }); 
});

app.use(bodyParser.json());
app.post('/api/jobs', (req, res) => {
  addToCollection("jobs", req).then((result) => {
    res.json(result);
  })
});

app.use(bodyParser.json());
app.post('/api/jobStatus', (req, res) => {
  db.collection("jobs").findOneAndUpdate(
    { _id: ObjectId(req.body._id) },
    { $set: 
      { status: req.body.status }
    },
    { returnOriginal: false }
  ).then((result) => {
    res.json(result.value);
  })
});

app.get('/api/reporters', (req, res) => {
  getFromCollection("reporters", "").then((docs) => {
    res.json(docs);
  }); 
});

app.use(bodyParser.json());
app.post('/api/reporters', (req, res) => {
  addToCollection("reporters", req).then((result) => {
    res.json(result);
  })
});

MongoClient.connect('mongodb://localhost/proofreading', (err, dbConnection) => {
  db = dbConnection;
  app.use(express.static('static'));
})
