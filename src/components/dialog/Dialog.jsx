import React, { Component } from 'react';
import routesConfiguration from '../../routing/routesConfiguration';
import './Dialog.less';

const { dialog } = routesConfiguration;

class Dialog extends Component {
  constructor (props) {
    super(props);

    this.state = {
      chosenValue: 'Not chosen',
      currentValue: null
    };

    this.values = ['Watchmen', 'Guardians of the Galaxy', 'will decide later'];

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount () {
    this.dialog.addEventListener('close', this.handleClose);
  }

  componentWillUnmount () {
    this.dialog.removeEventListener('close', this.handleClose);
  }

  handleClose () {
    this.setState({ chosenValue: this.dialog.returnValue });
  }

  handleOpenModal () {
    this.setState(
      ({ chosenValue }) => ({ currentValue: chosenValue }),
      () => this.dialog.showModal()
    );
  }

  handleCancel () {
    this.dialog.close(this.state.chosenValue);
  }

  handleSelect (event) {
    const { target: { name } } = event;
    this.setState({ currentValue: name });
    this.dialog.returnValue = name;
  }

  render () {
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
          <h3 className="dialogHeader">Choose an option</h3>
          <form
            method="dialog"
            className="dialogForm"
          >
            <div className="formBody">
              <div className="controls">
                <div className="innerWrapper">
                  {
                    this.values.map((value, index) => {
                      return (
                        <div
                          key={index}
                          className="dialogInput checkboxInput toggler"
                        >
                          <input
                            id={value}
                            type="radio"
                            name={value}
                            className="toggler"
                            checked={this.state.currentValue === value}
                            value={value}
                            onChange={this.handleSelect}
                          />
                          <label
                            htmlFor={value}
                            className="toggler"
                          >
                            <span className="toggler"/>
                            <span className="labelText">{value}</span>
                          </label>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
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
        <button onClick={this.handleOpenModal}>Press me!</button>
        <h2 className="result">{this.state.chosenValue}</h2>
      </div>
    );
  }
}

export default Dialog;
