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
			<div className="mdl-grid">
        <div className="mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col">
          <Kanban />
        </div>
			</div>
		);
	}
}