export default class JobRow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dateReceived: this.props.jobData.dateReceived,
			reporter: this.props.jobData.reporter,
			fileName: this.props.jobData.fileName,
			pages: this.props.jobData.pages,
			rush: this.props.jobData.rush,
			dateReturned: this.props.jobData.dateReturned,
			invoice: this.props.jobData.invoice,
			datePaid: this.props.jobData.datePaid,
			value: this.props.jobData.value,
			notes: this.props.jobData.notes
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.jobData[0] != this.state.one) {
			this.setState({
				dateReceived: this.props.jobData.dateReceived,
				reporter: this.props.jobData.reporter,
				fileName: this.props.jobData.fileName,
				pages: this.props.jobData.pages,
				rush: this.props.jobData.rush,
				dateReturned: this.props.jobData.dateReturned,
				invoice: this.props.jobData.invoice,
				datePaid: this.props.jobData.datePaid,
				value: this.props.jobData.value,
				notes: this.props.jobData.notes
			});
		}
	}

	render() {
		return (
			<tr>
				<td>{this.state.dateReceived}</td>
				<td>{this.state.reporter}</td>
				<td>{this.state.fileName}</td>
				<td>{this.state.pages}</td>
				<td>{this.state.rush.toString()}</td>
				<td>{this.state.dateReturned}</td>
				<td>{this.state.invoice}</td>
				<td>{this.state.datePaid}</td>
				<td>{this.state.value}</td>
				<td>{this.state.notes}</td>
			</tr>
		);
	}
}