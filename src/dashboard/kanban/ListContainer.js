import { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Paper from 'material-ui/Paper';

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

const containerStyle = {
  backgroundColor: "#E2E4E6",
  width: "275px",
  padding: "8px",
  margin: "8px",
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
      <div>
        <Paper style={containerStyle} zDepth={1}>
          {items}
        </Paper>
      </div>
    );
  }
}

export default DropTarget(DragConstants.ITEM, containerTarget, collect)(ListContainer);