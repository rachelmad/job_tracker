import JobsTable from "./JobsTable";

var data = [[1, 2], [3, 4]];

export default class JobsOverview extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			jobs: data
		}

		this.testNew = this.testNew.bind(this);
		this.addJob = this.addJob.bind(this);
	}

	testNew() {
		this.addJob([5, 6]);
	}
	
	addJob(job) {
		data.push(job);
		this.setState({
			jobs: data
		})
	}

	render() {
		return (
			<div>
				<p>This is the overview</p>
				<JobsTable jobs={this.state.jobs}/>
				<button onClick={this.testNew}>Add Job</button>
			</div>
		);
	}
}