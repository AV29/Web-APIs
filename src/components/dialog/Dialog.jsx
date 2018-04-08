import React, {Component} from 'react';
import routesConfiguration from '../../routing/routesConfiguration';
import './Dialog.less';

const {dialog} = routesConfiguration;

class Dialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenCrypto: '',
      currentCrypto: null
    };

    this.cryptos = ['BuzCoin', 'BitCoin', 'CoCoin'];

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.dialog.addEventListener('close', this.handleClose);
  }

  handleClose() {
    this.setState({chosenCrypto: this.dialog.returnValue});
  }

  handleOpenModal() {
    this.dialog.showModal();
  }

  handleCancel() {
    this.dialog.close('Browser not chosen');
  }

  handleSelect(event) {
    const {target: {name}} = event;
    this.setState({currentCrypto: name});
    this.dialog.returnValue = name;
  }

  render() {
    return (
      <div className="pageWrapper dialogWrapper">
        <h3
          className="pageIdentificator"
        >
          {dialog.title}
        </h3>
        <dialog
          className="browserDialog"
          ref={dialog => this.dialog = dialog}
        >
          <h3 className="dialogHeader">Crypto Currency</h3>
          <form
            method="dialog"
            className="dialogForm"
          >
            <div className="formBody">
              <section>
                {
                  this.cryptos.map((crypto, index) => {
                    return (
                      <div
                        key={index}
                        className="dialogInput"
                      >
                        <input
                          id={crypto}
                          name={crypto}
                          type="radio"
                          checked={this.state.currentCrypto === crypto}
                          onChange={this.handleSelect}
                        />
                        <label htmlFor={crypto}>{crypto}</label>
                      </div>
                    );
                  })
                }
              </section>
              <section>
                This is an extremely important decision in your life. Choose now and never regret!!!
              </section>
            </div>
            <div className="submitSection">
              <button
                type="submit"
                className="primary"
              >
                Confirm
              </button>
              <button
                type="reset"
                className="secondary"
                onClick={this.handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </dialog>
        <button onClick={this.handleOpenModal}>Update details</button>
        <h2>{this.state.chosenCrypto}</h2>
      </div>
    );
  }
}

export default Dialog;
