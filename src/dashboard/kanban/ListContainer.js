import { Component } from 'react';
import { DropTarget } from 'react-dnd';

import styles from "../Dashboard.css";
import ListItem from "./ListItem";
import { DragConstants } from '../../app/DragConstants';

const containerTarget = {
  drop(props, monitor) {
    var job = {
      "_id": monitor.getItem().id, 
      "status": props.id
    }
    moveJob(job, props.refresh);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    item: monitor.getItem()
  }
}

function moveJob(job, refresh) {
  $.ajax({
    type: 'POST',
    url: 'api/jobStatus',
    contentType: 'application/json',
    data: JSON.stringify(job),
    success: (data) => {
      refresh();
    },
    error: (xhr, status, err) => {
      console.log("Error moving job: ", err);
    }
  })
}

class ListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      jobs: props.jobs
    }

    this.connectDropTarget = this.props.connectDropTarget;
    this.item = this.props.item;
  }

  pushCard(card) {
    var jobsCopy = this.state.jobs;
    jobsCopy.push(card);
    this.setState({
      jobs: jobsCopy
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.jobs != this.state.jobs) {
      this.setState({
        jobs: this.props.jobs
      })
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.item != this.props.item) {
  //     console.log(this.props.id, this.props.item, nextProps.item);
  //   }
  // }

  render() {
    const items = this.state.jobs.map((job) => {
      return <ListItem key={job._id} job={job} />
    })
    return this.connectDropTarget(
      <div className={[styles.listContainer, "mdl-cell--3-col-desktop", "mdl-cell--2-col-tablet", "mdl-cell--2-col-phone"].join(' ')}>
        <span>{ this.state.id }</span>
        {items}
      </div>
    );
  }
}

export default DropTarget(DragConstants.ITEM, containerTarget, collect)(ListContainer);