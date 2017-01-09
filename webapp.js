import express from 'express';
import bodyParser from 'body-parser';
import MongoClient from 'mongodb';

var app = express();
var db;

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});

app.get('/api/jobs', (req, res) => {
	db.collection('jobs').find().toArray((err, docs) => {
		res.json(docs);
	});
});

app.use(bodyParser.json());
app.post('/api/jobs', (req, res) => {
	var newJob = req.body;
	db.collection('jobs').insertOne(newJob, (err, result) => {
		var newId = result.insertedId;
		db.collection('jobs').find({
			_id: newId
		}).next((err, doc) => {
			res.json(doc);
		});
	});
});

app.get('/api/reporters', (req, res) => {
	db.collection('reporters').find().toArray((err, docs) => {
		res.json(docs);
	});
});

app.use(bodyParser.json());
app.post('/api/reporters', (req, res) => {
	var newJob = req.body;
	db.collection('reporters').insertOne(newJob, (err, result) => {
		var newId = result.insertedId;
		db.collection('reporters').find({
			_id: newId
		}).next((err, doc) => {
			res.json(doc);
		});
	});
});


MongoClient.connect('mongodb://localhost/proofreading', (err, dbConnection) => {
	db = dbConnection;
	app.use(express.static('static'));
})
