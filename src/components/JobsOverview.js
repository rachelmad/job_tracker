import JobsTable from "./JobsTable";
import NewJobForm from "./NewJobForm";

export default class JobsOverview extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			jobs: []
		}

		this.getJobs = this.getJobs.bind(this);
		this.addJob = this.addJob.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {
		this.getJobs();
	}

	getJobs() {
		$.ajax('/api/jobs').done((data) => {
			this.setState({
				jobs: data
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

	// updateJobs(job) {
	// 	console.log(job);
	// }

	render() {
		return (
			<div>
				<p>This is the overview</p>
				<JobsTable jobs={this.state.jobs} />
				<NewJobForm addJob={this.addJob} />
			</div>
		);
	}
}