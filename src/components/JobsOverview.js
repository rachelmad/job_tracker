import JobsTable from "./JobsTable";
import NewJobForm from "./NewJobForm";

var data = [[1, 2], [3, 4]];

export default class JobsOverview extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			jobs: data
		}

		this.addJob = this.addJob.bind(this);
	}

	addJob(job) {
		console.log(job);
	}

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