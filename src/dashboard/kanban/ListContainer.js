import styles from "../Dashboard.css";
import ListItem from "./ListItem";

export default class ListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: this.props.jobs
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.jobs != this.state.jobs) {
      this.setState({
        jobs: this.props.jobs
      })
    }
  }

  render() {
    const items = this.state.jobs.map((job) => {
      return <ListItem key={job._id} job={job} />
    })
    return (
      <div className={styles.listContainer}>
        {items}
      </div>
    );
  }
}