import { Component } from 'react';
import Kanban from "./kanban/Kanban";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <p>Dashboard</p>
          <Kanban />
        </div>
      </MuiThemeProvider>
    );
  }
}