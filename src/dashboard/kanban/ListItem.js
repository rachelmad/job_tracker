import styles from "../Dashboard.css";

export default class ListItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		}
	}

	render() {
		return (
			<div className={styles.listItem}>
				<p>This is a list item</p>
			</div>
		);
	}
}