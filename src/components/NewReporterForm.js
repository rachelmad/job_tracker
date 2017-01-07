export default class NewReporterForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {
		var form = document.forms.newReporter;
		this.props.addReporter({
			name: form.name.value,
			email: form.email.value,
			paymentType: form.payment.value,
			notes: form.notes.value
		});
	}

	render() {
		return (
			<div>
				<form name="newReporter">
					<input type="text" name="name" placeholder="Name" />
					<input type="email" name="email" placeholder="E-mail" />
					<fieldset id="payment">
						<input type="radio" name="payment" value="Check" />Check<br />
						<input type="radio" name="payment" value="Bank transfer" />Bank transfer<br />
						<input type="radio" name="payment" value="Paypal" />Paypal<br />
						<input type="radio" name="payment" value="Other" />Other<br />
					</fieldset>
					<input type="text" name="notes" placeholder="Notes" />
					<button type="button" onClick={this.handleSubmit}>Add Reporter</button>
  				<input type="reset" />
				</form>
			</div>
		);
	}
}