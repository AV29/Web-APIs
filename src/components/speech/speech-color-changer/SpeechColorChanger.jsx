import React, { Component } from 'react';
import routesConfiguration from '../../../routing/routesConfiguration';
import './SpeechColorChanger.less';

const { speechColorChanger } = routesConfiguration;

class SpeechColorChanger extends Component {

  constructor (props) {
    super(props);

    this.colors = ['aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
    this.state = {
      result: '',
      recognitionInProgress: false
    };
  }

  componentDidMount () {
    const grammar = `#JSGF V1.0; grammar colors; public <color> = ${this.colors.join(' | ')};`;
    this.recognition = new window.webkitSpeechRecognition();
    this.speechRecognitionList = new window.webkitSpeechGrammarList();
    this.speechRecognitionList.addFromString(grammar, 1);
    this.recognition.grammars = this.speechRecognitionList;
    this.recognition.continuous = true;
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 5;

    this.recognition.onresult = ({ results }) => {
      this.setState({ result: results[0][0].transcript });
      this.stopRecognition();
    };
  }

  startRecognition = () => {
    this.setState({ recognitionInProgress: true });
    this.recognition.start();
    console.log('Ready to receive a color command.');
  };

  stopRecognition = () => {
    this.setState({ recognitionInProgress: false });
    this.recognition.stop();
    console.log('Stopped recognition.');
  };

  render () {
    return (
      <div className="pageWrapper colorChanger">
        <h2>{speechColorChanger.title}</h2>
        <div className="controls">
          <button onClick={this.startRecognition} disabled={this.state.recognitionInProgress}>Start</button>
          <button onClick={this.stopRecognition}>Stop</button>
        </div>
        <div id="palette" className="palette">
          {
            this.colors.map(color => (
              <span
                key={color}
                className="color"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))
          }
        </div>
        <div className="output" style={{ backgroundColor: this.state.result.toLowerCase() }}>
          <p>{this.state.result.toUpperCase()}</p>
        </div>
      </div>
    );
  }
}

export default SpeechColorChanger;
