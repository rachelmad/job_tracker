import ListContainer from "./ListContainer";
import styles from "../Dashboard.css";

export default class Kanban extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: [],
      doing: [],
      forinvoice: [],
      done: []
    }

    this.getJobs = this.getJobs.bind(this);
    this.sortJobs = this.sortJobs.bind(this);
    this.filterJobs = this.filterJobs.bind(this);
  }

  componentDidMount() {
    this.getJobs();
  }

  getJobs() {
    $.ajax('/api/jobs').done((jobs) => {
      this.sortJobs(jobs);
    });
  }

  sortJobs(jobs) {
    this.setState({
      todo: jobs.filter(this.filterJobs.bind(null, "To-Do")),
      doing: jobs.filter(this.filterJobs.bind(null, "Doing")),
      forinvoice: jobs.filter(this.filterJobs.bind(null, "For-Invoice")),
      done: jobs.filter(this.filterJobs.bind(null, "Done"))
    });
  }

  filterJobs(status, value) {
    return status.toLowerCase() === value.status.toLowerCase();
  }

  render() {
    return (
      <div className={styles.kanban}>
        <ListContainer jobs={this.state.todo}/>
        <ListContainer jobs={this.state.doing}/>
        <ListContainer jobs={this.state.forinvoice}/>
        <ListContainer jobs={this.state.done}/>
      </div>
    );
  }
}