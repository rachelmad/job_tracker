import { Component } from 'react';
import { DragSource } from 'react-dnd';
import { Card, CardHeader, CardText} from 'material-ui/Card';

import { DragConstants } from '../../app/DragConstants';
import styles from "../Dashboard.css";

const itemSource = {
  beginDrag(props) {
    return {
      id: props.job._id
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class ListItem extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      reporter: props.job.reporter,
      // dateDue: props.job.dateDue,
      fileName: props.job.fileName,
      pages: props.job.pages,
      // dateReturned: props.job.dateReturned
      // invoice: props.job.invoice
      // datePaid: props.job.datePaid
      value: props.job.value,
      notes: props.job.notes
    }

    this.didDataChange = this.didDataChange.bind(this);
    this.connectDragSource = this.props.connectDragSource;
    this.isDragging = this.props.isDragging;
  }

  componentWillReceiveProps(nextProps) {
    if (this.didDataChange(nextProps)) {
      this.setState({
        reporter: this.props.job.reporter,
        // dateDue: this.props.job.dateDue,
        fileName: this.props.job.fileName,
        pages: this.props.job.pages,
        // dateReturned: this.props.job.dateReturned
        // invoice: this.props.job.invoice
        // datePaid: this.props.job.datePaid
        value: this.props.job.value,
        notes: this.props.job.notes
      });
    }
  }

  didDataChange(newData) {
    return (
      newData.reporter != this.state.reporter ||
      newData.fileName != this.state.fileName ||
      newData.pages != this.state.pages ||
      newData.value != this.state.value ||
      newData.notes != this.state.notes
    );
  }

  render() {
    return this.connectDragSource(
      <div className={styles.addMargin} >
        <Card>
          <CardHeader
            title={this.state.reporter}
            subtitle={this.state.fileName}
            actAsExpander={true}
            showExpandableButton={true} />
          <CardText expandable={true}>
            Value: {this.state.value} <br />
            Pages: {this.state.pages} <br />
            {this.state.notes}
          </CardText>
        </Card>
      </div>
    );
  }
}

export default DragSource(DragConstants.ITEM, itemSource, collect)(ListItem);