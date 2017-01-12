import styles from "../Dashboard.css";

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reporter: this.props.job.reporter,
      // dateDue: this.props.job.dateDue,
      fileName: this.props.job.fileName,
      pages: this.props.job.pages,
      // dateReturned: this.props.job.dateReturned
      // invoice: this.props.job.invoice
      // datePaid: this.props.job.datePaid
      value: this.props.job.value,
      notes: this.props.job.notes
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Add if statement later
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
    })
  }

  render() {
    return (
      <div className={styles.listItem}>
        <p>
          {this.state.reporter} {this.state.value} <br />
          {this.state.fileName} {this.state.pages} <br />
          {this.state.notes}
        </p>
      </div>
    );
  }
}