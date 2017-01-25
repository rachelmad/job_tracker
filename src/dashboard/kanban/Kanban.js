import { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import ListContainer from "./ListContainer";
import styles from "../Dashboard.css";
import NewJobForm from "./NewJobForm";
import NewReporterForm from "./NewReporterForm";

const kanbanStyle = {
  backgroundColor: "#C5C7C9",
  display: "flex",
  flexDirection: "column"
}

class Kanban extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: [],
      doing: [],
      forinvoice: [],
      done: [],
      showJobForm: false,
      showReporterForm: false
    }

    this.getJobs = this.getJobs.bind(this);
    this.sortJobs = this.sortJobs.bind(this);
    this.filterJobs = this.filterJobs.bind(this);
    this.toggleJobArea = this.toggleJobArea.bind(this);
    this.toggleReporterArea = this.toggleReporterArea.bind(this);
    this.jobAdded = this.jobAdded.bind(this);
    this.reporterAdded = this.reporterAdded.bind(this);
    this.closeJobForm = this.closeJobForm.bind(this);
    this.closeReporterForm = this.closeReporterForm.bind(this);
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

  toggleJobArea() {
    this.setState({
      showJobForm: !this.state.showJobForm
    })
  }

  toggleReporterArea() {
    this.setState({
      showReporterForm: !this.state.showReporterForm
    })
  }

  jobAdded() {
    this.getJobs();
    this.closeJobForm();
  }

  reporterAdded() {
    console.log("Reporter added");
    this.closeReporterForm();
  }

  closeJobForm() {
    this.setState({
      showJobForm: false
    })
  }

  closeReporterForm() {
    this.setState({
      showReporterForm: false
    })
  }

  render() {
    let buttonArea = null;
    if (!this.state.showJobForm && !this.state.showReporterForm) {
      buttonArea = <div>
        <RaisedButton label="New Job" primary={true} className={styles.addMargin} onClick={this.toggleJobArea}/>
        <RaisedButton label="New Reporter" primary={true} className={styles.addMargin} onClick={this.toggleReporterArea}/>
      </div>
    } 

    let jobFormArea = null;
    if (this.state.showJobForm) {
      jobFormArea = <NewJobForm onSuccess={this.jobAdded} onCancel={this.closeJobForm}/>
    }

    let reporterFormArea = null;
    if (this.state.showReporterForm) {
      reporterFormArea = <NewReporterForm onSuccess={this.reporterAdded} onCancel={this.closeReporterForm}/>
    }

    return (
      <div>
        <Paper style={kanbanStyle} zDepth={2}>
          <div className={styles.flex}>
            { buttonArea }
            { reporterFormArea }
            { jobFormArea }
          </div>
          <div className={styles.flex}>
            <ListContainer id="To-Do" jobs={this.state.todo} refresh={this.getJobs} />
            <ListContainer id="Doing" jobs={this.state.doing} refresh={this.getJobs} />
            <ListContainer id="For-Invoice" jobs={this.state.forinvoice} refresh={this.getJobs} />
            <ListContainer id="Done" jobs={this.state.done} refresh={this.getJobs} />
          </div>
        </Paper>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Kanban);