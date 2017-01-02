import JobRow from "./JobRow";

export default class JobsTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			jobs: this.props.jobs
		}
	}

	render() {
		const rows = this.props.jobs.map((job, index) => {
			return <JobRow key={index} jobData={job} />
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
							<th>Returned</th>
							<th>Paid</th>
							<th>Value</th>
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