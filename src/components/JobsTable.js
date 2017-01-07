import JobRow from "./JobRow";

export default class JobsTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			jobs: this.props.jobs
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.jobs != this.state.jobs) {
			this.setState({
				jobs: this.props.jobs
			})
		}
	}

	render() {
		const rows = this.state.jobs.map((job) => {
			return <JobRow key={job._id} jobData={job} />
		});

		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Date Received</th>
							<th>Court Reporter</th>
							<th>File Name</th>
							<th>Pages</th>
							<th>Rush</th>
							<th>Date Returned</th>
							<th>Invoice Number</th>
							<th>Date Paid</th>
							<th>Value</th>
							<th>Notes</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>
		);
	}
}