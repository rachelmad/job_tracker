import { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ListContainer from "./ListContainer";
import styles from "../Dashboard.css";
import NewJobForm from "../../app/shared/NewJobForm";
import NewReporterForm from "../../app/shared/NewReporterForm";

class Kanban extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: [],
      doing: [],
      forinvoice: [],
      done: [],
      showJobForm: false,
      showReportForm: false
    }

    this.getJobs = this.getJobs.bind(this);
    this.sortJobs = this.sortJobs.bind(this);
    this.filterJobs = this.filterJobs.bind(this);
    this.addJobSuccess = this.addJobSuccess.bind(this);
    this.toggleJobForm = this.toggleJobForm.bind(this);
    this.toggleReportForm = this.toggleReportForm.bind(this);
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

  addJobSuccess() {
    this.getJobs();
  }

  addReporterSuccess() {
    console.log("Added reporter");
  }

  toggleJobForm() {
    this.setState({
      showJobForm: !this.state.showJobForm
    })
  }

  toggleReportForm() {
    this.setState({
      showReportForm: !this.state.showReportForm
    })
  }

  render() {
    var jobForm = null;
    if (this.state.showJobForm) {
      jobForm = <div>
        <NewJobForm addJobSuccess={this.addJobSuccess} onCancel={this.toggleJobForm}/>
      </div>
    } else {
      jobForm = <div>
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
          onClick={this.toggleJobForm}>Add Job</button>
      </div>
    }

    var reportForm = null;
    if (this.state.showReportForm) {
      reportForm = <div>
        <NewReporterForm addReporterSuccess={this.addReporterSuccess} onCancel={this.toggleReportForm} />
      </div>
    } else {
      reportForm = <div>
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
          onClick={this.toggleReportForm}>Add Reporter</button>
      </div>
    }

    return (
      <div className={[styles.kanban, "mdl-grid"].join(' ')}>
        <div>
          { jobForm }
          { reportForm }
        </div>
        <ListContainer id="To-Do" jobs={this.state.todo} refresh={this.getJobs} />
        <ListContainer id="Doing" jobs={this.state.doing} refresh={this.getJobs} />
        <ListContainer id="For-Invoice" jobs={this.state.forinvoice} refresh={this.getJobs} />
        <ListContainer id="Done" jobs={this.state.done} refresh={this.getJobs} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Kanban);