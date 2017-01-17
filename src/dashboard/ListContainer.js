import { Component } from 'react';
import styles from "./Dashboard.css";

export default class ListContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
		}
	}

	render() {
		return (
			<div className={styles.test}>
				<p>This is a list container</p>
			</div>
		);
	}
}