import JobsTable from "./JobsTable";
import NewJobForm from "./NewJobForm";
import NewReporterForm from "./NewReporterForm";

export default class JobsOverview extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			jobs: [],
			reporters: []
		}

		this.getJobs = this.getJobs.bind(this);
		this.getReporters = this.getReporters.bind(this);
		this.addJob = this.addJob.bind(this);
		this.addReporter = this.addReporter.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {
		this.getJobs();
		this.getReporters();
	}

	getJobs() {
		$.ajax('/api/jobs').done((data) => {
			this.setState({
				jobs: data
			});
		});
	}

	getReporters() {
		$.ajax('/api/reporters').done((data) => {
			this.setState({
				reporters: data
			});
		});
	}

	addJob(job) {
		$.ajax({
			type: 'POST',
			url: '/api/jobs',
			contentType: 'application/json',
			data: JSON.stringify(job),
			success: (data) => {	
				this.getJobs();
			},
			error: (xhr, status, err) => {
				console.log("Error adding job: ", err);
			} 
		});
	}

	addReporter(reporter) {
		$.ajax({
			type: 'POST',
			url: '/api/reporters',
			contentType: 'application/json',
			data: JSON.stringify(job),
			success: (data) => {	
				this.getReporters();
			},
			error: (xhr, status, err) => {
				console.log("Error adding reporter: ", err);
			} 
		});
	}

	render() {
		return (
			<div>
				<p>This is the overview</p>
				<JobsTable jobs={this.state.jobs} />
				<NewJobForm addJob={this.addJob} />
				<NewReporterForm addReporter={this.addReporter} />
			</div>
		);
	}
}