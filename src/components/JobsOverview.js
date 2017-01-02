import JobsTable from "./JobsTable";

const data = [[1, 2], [3, 4]];

export default class JobsOverview extends React.Component {
  render() {
    return (
      <div>
      	<p>This is the overview</p>
      	<JobsTable jobs={data}/>
      </div>
    );
  }
}