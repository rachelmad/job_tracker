import ListContainer from "./ListContainer";
import styles from "../Dashboard.css";

export default class Kanban extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		}

		$.ajax('/api/jobs').done((data) => {
			console.log("Data: ", data);
		});
	}

	render() {
		return (
			<div className={styles.kanban}>
				<ListContainer />
				<ListContainer />
				<ListContainer />
			</div>
		);
	}
}