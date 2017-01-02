export default class JobRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.jobData[0]}</td>
        <td>{this.props.jobData[1]}</td>
      </tr>
    );
  }
}