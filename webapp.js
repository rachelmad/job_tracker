import express from 'express';
import bodyParser from 'body-parser';

var app = express();
var jobs = [
	{
		id: 1,
		dateReceived: "This date",
		reporter: "Reporter A",
		fileName: "filename.doc",
		pages: 123,
		rush: true,
		dateReturned: "That date",
		invoice: "1234",
		datePaid: "A date",
		value: 123.45,
		notes: "Notes"
	},
	{
		id: 2,
		dateReceived: "This date",
		reporter: "Reporter B",
		fileName: "filename.doc",
		pages: 123,
		rush: true,
		dateReturned: "That date",
		invoice: "1234",
		datePaid: "A date",
		value: 123.45,
		notes: "Notes"
	}
];

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});

app.get('/api/jobs', (req, res) => {
	res.json(jobs);
});

app.use(bodyParser.json());
app.post('/api/jobs', (req, res) => {
	console.log(req.body);

	var newJob = req.body;
	newJob.id = jobs.length + 1;
	jobs.push(newJob);
	res.json(newJob);
});

app.use(express.static('static'));