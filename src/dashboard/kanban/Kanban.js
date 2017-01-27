import { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ListContainer from "./ListContainer";
import styles from "../Dashboard.css";

class Kanban extends Component {
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
      <div className={[styles.kanban, "mdl-grid"].join(' ')}>
        <ListContainer id="To-Do" jobs={this.state.todo} refresh={this.getJobs} />
        <ListContainer id="Doing" jobs={this.state.doing} refresh={this.getJobs} />
        <ListContainer id="For-Invoice" jobs={this.state.forinvoice} refresh={this.getJobs} />
        <ListContainer id="Done" jobs={this.state.done} refresh={this.getJobs} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Kanban);