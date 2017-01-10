import ListContainer from "./ListContainer";

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		}
	}

	render() {
		return (
			<div>
				<p>Dashboard</p>
				<ListContainer />
			</div>
		);
	}
}