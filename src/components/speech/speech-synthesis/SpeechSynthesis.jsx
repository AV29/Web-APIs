import React, { Component } from 'react';
import routesConfiguration from '../../../routing/routesConfiguration'
import './SpeechSynthesis.less';

const { speechSynthesis } = routesConfiguration;

class SpeechSynthesis extends Component {
  constructor (props) {
    super(props);
    this.synth = window.speechSynthesis;

    this.state = {
      pitch: 1,
      rate: 1,
      text: '',
      voice: '',
      voices: this.synth.getVoices()
    };

    this.synth.onvoiceschanged = () => {
      this.setState({ voices: window.speechSynthesis.getVoices() });
    };
  }

  speak = () => {
    if (this.synth.speaking) {
      return;
    }
    if (this.state.text !== '') {
      const utterThis = new SpeechSynthesisUtterance(this.state.text);
      for (let i = 0; i < this.state.voices.length; i++) {
        if (this.state.voices[i].name === this.state.voice) {
          utterThis.voice = this.state.voices[i];
        }
      }

      utterThis.pitch = this.state.pitch;
      utterThis.rate = this.state.rate;
      this.synth.speak(utterThis);
    }
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleSelectChange = ({ target: { value } }) => {
    this.setState({ voice: value }, this.speak);
  };

  render () {
    return (
      <div className="pageWrapper speechSynthesisWrapper">
        <h2>{speechSynthesis.title}</h2>
        <input
          type="text"
          name="text"
          className="txt"
          onChange={this.handleChange}
        />
        <div className="speechControl">
          <label htmlFor="rate">Rate</label>
          <input
            onChange={this.handleChange}
            name="rate"
            type="range"
            min="0.5"
            max="2"
            value={this.state.rate}
            step="0.1"
          />
        </div>
        <div className="speechControl">
          <label htmlFor="pitch">Pitch</label>
          <input
            onChange={this.handleChange}
            name="pitch"
            type="range"
            min="0"
            max="2"
            value={this.state.pitch}
            step="0.1"
          />
        </div>
        <select
          name="voice"
          onChange={this.handleSelectChange}
          value={this.state.voice}
        >
          {
            this.state.voices.map((voice, index) =>
              <option key={index} value={voice.name}>{`${voice.name} ${voice.lang}`}</option>
            )
          }
        </select>
        <div className="controls">
          <button onClick={this.speak}>Play</button>
        </div>
      </div>
    );
  }
}

export default SpeechSynthesis;
