export default class NewReporterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    var form = document.forms.newReporter;
    this.addReporter({
      name: form.name.value,
      email: form.email.value,
      paymentType: form.payment.value,
      notes: form.notes.value
    });
  }

  addReporter(reporter) {
    $.ajax({
      type: 'POST',
      url: '/api/reporters',
      contentType: 'application/json',
      data: JSON.stringify(reporter),
      success: (data) => {  
        this.props.addReporterSuccess();
      },
      error: (xhr, status, err) => {
        console.log("Error adding reporter: ", err);
      } 
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
          <button type="button" onClick={this.props.onCancel}>Cancel</button>
        </form>
      </div>
    );
  }
}