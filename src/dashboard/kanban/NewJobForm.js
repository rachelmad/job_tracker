export default class NewJobForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.addJob = this.addJob.bind(this);
  }

  handleSubmit() {
    var form = document.forms.newJob;
    this.addJob({
      dateReceived: form.dateReceived.value,
      reporter: form.reporter.value,
      fileName: form.fileName.value,
      pages: form.pages.value,
      rush: form.rush.checked,
      dateReturned: form.dateReturned.value,
      invoice: form.invoice.value,
      datePaid: form.datePaid.value,
      value: form.value.value,
      status: form.status.value,
      notes: form.notes.value
    });
  }

  addJob(job) {
    $.ajax({
      type: 'POST',
      url: '/api/jobs',
      contentType: 'application/json',
      data: JSON.stringify(job),
      success: (data) => {  
        this.props.onSuccess();
      },
      error: (xhr, status, err) => {
        console.log("Error adding job: ", err);
      } 
    });
  }

  render() {
    return (
      <div>
        <form name="newJob">
          <input type="datetime-local" name="dateReceived" placeholder="Date Received" />
          <input type="text" name="reporter" placeholder="Court Reporter" />
          <input type="text" name="fileName" placeholder="File Name" />
          <input type="number" name="pages" placeholder="Pages" />
          <input type="checkbox" name="rush" placeholder="Rush" />
          <input type="datetime-local" name="dateReturned" placeholder="Date Returned" />
          <input type="text" name="invoice" placeholder="Invoice No." />
          <input type="date" name="datePaid" placeholder="Date Paid" />
          <input type="number" name="value" placeholder="Value" step="0.01"/>
          <fieldset id="status">
            <input type="radio" name="status" value="To-Do" />To-Do<br />
            <input type="radio" name="status" value="Doing" />Doing<br />
            <input type="radio" name="status" value="For-Invoice" />For-Invoice<br />
            <input type="radio" name="status" value="Done" />Done<br />
          </fieldset>
          <input type="text" name="notes" placeholder="Notes" />
          <button type="button" onClick={this.handleSubmit} >Add Job</button>
          <button type="button" onClick={this.props.onCancel} >Cancel</button>
        </form>
      </div>
    );
  }
}