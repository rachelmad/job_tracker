import JobRow from "./JobRow";

export default class JobsTable extends React.Component {
  render() {
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
						<JobRow jobData={this.props.jobs[0]} />
						<JobRow jobData={this.props.jobs[1]} />
					</tbody>
				</table>
  	  </div>
    );
  }
}