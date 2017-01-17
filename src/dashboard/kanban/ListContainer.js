import { Component } from 'react';
import { DropTarget } from 'react-dnd';

import styles from "../Dashboard.css";
import ListItem from "./ListItem";
import { DragConstants } from '../../app/DragConstants';

const containerTarget = {
  drop(props, monitor) {
    console.log(monitor.getItem(), props.id);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    item: monitor.getItem()
  }
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
      <div className={styles.listContainer}>
        {items}
      </div>
    );
  }
}

export default DropTarget(DragConstants.ITEM, containerTarget, collect)(ListContainer);