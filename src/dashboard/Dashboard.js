import { Component } from 'react';
import Kanban from "./kanban/Kanban";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div>
        <p>Dashboard</p>
        <Kanban />
      </div>
    );
  }
}