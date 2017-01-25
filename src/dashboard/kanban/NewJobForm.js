import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

import styles from "../Dashboard.css";

const tempReporters = [
  <MenuItem key={1} value={"Reporter A"} primaryText="Reporter A" />,
  <MenuItem key={2} value={"Reporter B"} primaryText="Reporter B" />,
  <MenuItem key={3} value={"Reporter C"} primaryText="Reporter C" />,
];

const statuses = [
  <MenuItem key={1} value={"To-Do"} primaryText="To-Do" />,
  <MenuItem key={2} value={"Doing"} primaryText="Doing" />,
  <MenuItem key={3} value={"For-Invoice"} primaryText="For-Invoice" />,
  <MenuItem key={4} value={"Done"} primaryText="Done" />
];

export default class NewJobForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateReceived: null,
      dateReturned: null,
      reporter: null,
      rush: false,
      fileName: "",
      pages: 0,
      status: "To-Do",
      notes: "",
      invoice: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.addJob = this.addJob.bind(this);
    this.dateReceivedChanged = this.dateReceivedChanged.bind(this);
    this.dateReturnedChanged = this.dateReturnedChanged.bind(this);
    this.reporterChanged = this.reporterChanged.bind(this);
    this.rushChanged = this.rushChanged.bind(this);
    this.fileNameChanged = this.fileNameChanged.bind(this);
    this.pagesChanged = this.pagesChanged.bind(this);
    this.statusChanged = this.statusChanged.bind(this);
    this.notesChanged = this.notesChanged.bind(this);
    this.invoiceChanged = this.invoiceChanged.bind(this);
  }

  handleSubmit() {
    var form = document.forms.newJob;
    this.addJob({
      dateReceived: this.state.dateReceived,
      reporter: this.state.reporter,
      fileName: this.state.fileName,
      pages: this.state.pages,
      rush: this.state.rush,
      dateReturned: this.state.dateReturned,
      invoice: this.state.invoice,
      datePaid: form.datePaid.value,
      value: form.value.value,
      status: this.state.status,
      notes: this.state.value
    });
  }

  dateReceivedChanged(event, date) {
    this.setState({
      dateReceived: date
    })
  }

  dateReturnedChanged(event, date) {
    this.setState({
      dateReturned: date
    })
  }

  reporterChanged(event, index, value) {
    this.setState({
      reporter: value
    })
  }

  rushChanged(event, isChecked) {
    this.setState({
      rush: isChecked
    })
  }

  fileNameChanged(event) {
    this.setState({
      fileName: event.target.value
    })
  }

  pagesChanged(event) {
    this.setState({
      pages: event.target.value
    })
  }

  statusChanged(event, index, value) {
    this.setState({
      status: value
    })
  }

  notesChanged(event) {
    this.setState({
      notes: event.target.value
    })
  }

  invoiceChanged(event) {
    this.setState({
      invoice: event.target.value
    })
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
    let forInvoiceInput = null;
    if (this.state.status === "For-Invoice" || this.state.status === "Done") {
      forInvoiceInput = <div>
        <DatePicker 
            hintText="Date Returned" 
            mode="landscape" 
            value={this.state.dateReturned} 
            onChange={this.dateReturnedChanged} />
      </div>
    }

    let doneInput = null;
    if (this.state.status === "Done") {
      doneInput = <div>
        <TextField
            floatingLabelText="Invoice No." 
            onChange={this.invoiceChanged} />
      </div>
    }

    return (
      <div>
        <form name="newJob">
          <DatePicker 
            hintText="Date Received" 
            mode="landscape" 
            value={this.state.dateReceived} 
            onChange={this.dateReceivedChanged} />
          <SelectField
            value={this.state.reporter}
            onChange={this.reporterChanged}
            floatingLabelText="Reporter">
              {tempReporters}
          </SelectField>
          <TextField
            floatingLabelText="File Name" 
            onChange={this.fileNameChanged} />
          <TextField
            floatingLabelText="Pages" 
            onChange={this.pagesChanged} />
          <Checkbox
            label="Rush"
            onCheck={this.rushChanged} />
          <SelectField
            value={this.state.status}
            onChange={this.statusChanged}
            floatingLabelText="Status">
              {statuses}
          </SelectField>
          <TextField
            floatingLabelText="Notes"
            onChange={this.notesChanged}
            multiLine={true}
            rows={1} 
            rowsMax={4} />
          {forInvoiceInput}
          {doneInput}
          <RaisedButton label="Add Job" primary={true} className={styles.addMargin} onClick={this.handleSubmit}/>
          <RaisedButton label="Cancel" primary={true} className={styles.addMargin} onClick={this.props.onCancel}/>
        </form>
      </div>
    );
  }
}