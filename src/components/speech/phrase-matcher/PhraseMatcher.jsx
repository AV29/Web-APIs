import React, { Component } from 'react';
import routesConfiguration from '../../../routing/routesConfiguration';
import './PhraseMatcher.less';

class PhraseMatcher extends Component {
  constructor (props) {
    super(props);

    this.phrases = [
      'I love to sing because it\'s fun',
      'where are you going',
      'can I call you tomorrow',
      'why did you talk while I was talking',
      'she enjoys reading books and playing games',
      'where are you going',
      'have a great day',
      'she sells seashells on the seashore'
    ];

    this.state = {
      right: undefined,
      phrase: null,
      diagnostic: '',
      recognitionInProgress: false,
      result: null,
      confidence: undefined,
      diagnosticsError: null
    };
  }

  componentDidMount () {
    const SpeechRecognition = window.webkitSpeechRecognition;
    const SpeechGrammarList = window.webkitSpeechGrammarList;

    this.recognition = new SpeechRecognition();
    this.speechRecognitionList = new SpeechGrammarList();
  }

  componentWillUnmount () {
    this.resetTest();
  }

  resetTest = () => {
    this.recognition.stop();
    this.setState({
      phrase: null,
      recognitionInProgress: false,
      right: undefined,
      diagnosticsError: null,
      result: null
    });
  };

  testSpeech = () => {
    const phrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];

    const grammar = `#JSGF V1.0; grammar phrase; public <phrase> = ${phrase}`;
    this.speechRecognitionList.addFromString(grammar, 1);
    this.recognition.grammars = this.speechRecognitionList;
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.setState({
      phrase,
      recognitionInProgress: true,
      right: undefined,
      diagnosticsError: null,
      result: null
    });

    this.recognition.start();

    this.recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      const confidence = `${(event.results[0][0].confidence * 100).toFixed(1)}%`;
      this.setState({ right: speechResult === phrase, confidence, result: speechResult });
    };

    this.recognition.onspeechend = () => {
      this.recognition.stop();
      this.setState({ recognitionInProgress: false });
    };

    this.recognition.onerror = (event) => {
      this.setState({
        recognitionInProgress: false,
        diagnosticsError: 'Error occurred in recognition: ' + event.error
      });
    };

    this.recognition.onaudiostart = () => {
      //Fired when the user agent has started to capture audio.
      console.log('Recognition: onaudiostart');
    };

    this.recognition.onaudioend = () => {
      //Fired when the user agent has finished capturing audio.
      console.log('Recognition: onaudioend');
    };

    this.recognition.onend = () => {
      //Fired when the speech_ recognition service has disconnected.
      console.log('Recognition: onend');
    };

    this.recognition.onnomatch = () => {
      //Fired when the speech_ recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log('Recognition: onnomatch');
    };

    this.recognition.onsoundstart = () => {
      //Fired when any sound � recognisable speech_ or not � has been detected.
      console.log('Recognition: onsoundstart');
    };

    this.recognition.onsoundend = () => {
      //Fired when any sound � recognisable speech_ or not � has stopped being detected.
      console.log('Recognition: onsoundend');
    };

    this.recognition.onspeechstart = () => {
      //Fired when sound that is recognised by the speech_ recognition service as speech_ has been detected.
      console.log('Recognition: onspeechstart');
    };
    this.recognition.onstart = () => {
      //Fired when the speech_ recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log('Recognition: onstart');
    };
  };

  getResult = () => {
    if (this.state.right === undefined) {
      return <p className="result">Right or Wrong ? </p>;
    }
    return (
      <p className={`result ${this.state.right ? 'right' : 'wrong'}`}>
        {this.state.right ? 'I heard the correct phrase!' : 'That didn\'t sound right.'}
      </p>
    );
  };

  getDiagnostics = () => {
    if (this.state.recognitionInProgress || !this.state.result) {
      return <p className="receivedMessage">...diagnostic messages</p>
    } else if (this.state.diagnosticsError) {
      return <p>{this.state.diagnosticsError}</p>
    }

    return <p>Speech received: <strong>{this.state.result}</strong>. Match confidence - {this.state.confidence}</p>
  };

  render () {
    return (
      <div className="pageWrapper phraseMatcherWrapper">
        <h2>{routesConfiguration.phraseMatcher.title}</h2>
        <button
          onClick={this.testSpeech}
          disabled={this.state.recognitionInProgress}
        >
          {!this.state.recognitionInProgress ? 'Test' : '...in progress'}
        </button>
        <button onClick={this.resetTest}>Reset</button>
        <div className="output">
          <p className="phrase">{this.state.phrase || 'Phrase...'}</p>
          {this.getResult()}
          {this.getDiagnostics()}
        </div>
      </div>
    );
  }
}

export default PhraseMatcher;
