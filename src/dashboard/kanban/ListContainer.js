import styles from "../Dashboard.css";
import ListItem from "./ListItem";

export default class ListContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		}
	}

	render() {
		return (
			<div className={styles.listContainer}>
				<ListItem />
			</div>
		);
	}
}