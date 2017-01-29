import styles from "../../dashboard/Dashboard.css";

export default class NewReporterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
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
      <div className={["mdl-grid", styles.secondLevelBackground, styles.addMargin].join(' ')} >
        <form name="newReporter" className={[styles.fullWidth, "mdl-grid"].join(' ')} >
          <div className={[styles.flexColumn, styles.flexCenter, "mdl-cell--6-col-desktop", "mdl-cell--4-col-tablet", "mdl-cell--2-col-phone"].join(' ')}>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" name="name" id="name"/>
              <label className="mdl-textfield__label" htmlFor="name">Name</label>
            </div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" name="email" id="email"/>
              <label className="mdl-textfield__label" htmlFor="email">E-mail</label>
            </div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" name="notes" id="notes"/>
              <label className="mdl-textfield__label" htmlFor="notes">Notes</label>
            </div>
          </div>
          
          <ul className={[styles.flexColumn, styles.flexCenter, "mdl-list", "mdl-cell--6-col-desktop", "mdl-cell--4-col-tablet", "mdl-cell--2-col-phone"].join(' ')}>
            <li className="mdl-list__item">
              <span className="mdl-list__item-primary-content">Check</span>
              <span className="mdl-list__item-secondary-action">
                <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="check">
                  <input type="radio" id="check" className="mdl-radio__button" name="payment" value="Check" />
                </label>
              </span>
            </li>
            <li className="mdl-list__item">
              <span className="mdl-list__item-primary-content">Bank transfer</span>
              <span className="mdl-list__item-secondary-action">
                <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="bank-transfer">
                  <input type="radio" id="bank-transfer" className="mdl-radio__button" name="payment" value="Bank transfer" />
                </label>
              </span>
            </li>
            <li className="mdl-list__item">
              <span className="mdl-list__item-primary-content">Paypal</span>
              <span className="mdl-list__item-secondary-action">
                <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="paypal">
                  <input type="radio" id="paypal" className="mdl-radio__button" name="payment" value="Paypal" />
                </label>
              </span>
            </li>
            <li className="mdl-list__item">
              <span className="mdl-list__item-primary-content">Other</span>
              <span className="mdl-list__item-secondary-action">
                <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="other">
                  <input type="radio" id="other" className="mdl-radio__button" name="payment" value="Other" />
                </label>
              </span>
            </li>
          </ul>

          <div className={styles.flexEnd} >
            <button className={[styles.addMargin, "mdl-button", "mdl-js-button", "mdl-button--raised", "mdl-button--colored", "mdl-js-ripple-effect"].join(' ')} 
            onClick={this.handleSubmit}>Add</button>
            <button className={[styles.addMargin, "mdl-button", "mdl-js-button", "mdl-button--raised", "mdl-button--colored", "mdl-js-ripple-effect"].join(' ')} 
            onClick={this.props.onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}