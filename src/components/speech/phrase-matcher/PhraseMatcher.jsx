import React, {Component} from 'react';
import routesConfiguration from '../../../routing/routesConfiguration'
import * as styles from '../../../styles/global.less';
import * as ownStyles from './PhraseMatcher.less';

const {phraseMatcher} = routesConfiguration;

class PhraseMatcher extends Component {

  componentDidMount() {
    const SpeechRecognition = window.webkitSpeechRecognition;//SpeechRecognition || webkitSpeechRecognition;
    const SpeechGrammarList = window.webkitSpeechGrammarList;
    const SpeechRecognitionEvent = window.webkitSpeechRecognitionEvent;

    const phrases = [
      'I love to sing because it\'s fun',
      'where are you going',
      'can I call you tomorrow',
      'why did you talk while I was talking',
      'she enjoys reading books and playing games',
      'where are you going',
      'have a great day',
      'she sells seashells on the seashore'
    ];

    const phrasePara = document.querySelector('.phrase');
    const resultPara = document.querySelector('.result');
    const diagnosticPara = document.querySelector('.output');

    const testBtn = document.querySelector('button');

    function randomPhrase() {
      return Math.floor(Math.random() * phrases.length);
    }

    testBtn.addEventListener('click', testSpeech);

    function testSpeech() {
      testBtn.disabled = true;
      testBtn.textContent = 'Test in progress';

      const phrase = phrases[randomPhrase()];
      phrasePara.textContent = phrase;
      resultPara.textContent = 'Right or wrong?';
      resultPara.style.background = 'rgba(0,0,0,0.2)';
      diagnosticPara.textContent = '...diagnostic messages';

      const grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase + ';';
      const recognition = new SpeechRecognition();
      const speechRecognitionList = new SpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.start();

      recognition.onresult = function (event) {
        const speechResult = event.results[0][0].transcript;
        diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';
        if (speechResult === phrase) {
          resultPara.textContent = 'I heard the correct phrase!';
          resultPara.style.background = 'lime';
        } else {
          resultPara.textContent = 'That didn\'t sound right.';
          resultPara.style.background = 'red';
        }
        console.log('SpeechRecognition.onresult');
        console.log('Confidence: ' + event.results[0][0].confidence);
      };

      recognition.onspeechend = function () {
        recognition.stop();
        testBtn.disabled = false;
        testBtn.textContent = 'Start new test';
      };

      recognition.onerror = function (event) {
        testBtn.disabled = false;
        testBtn.textContent = 'Start new test';
        diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
      };

      recognition.onaudiostart = function (event) {
        //Fired when the user agent has started to capture audio.
        console.log('SpeechRecognition.onaudiostart');
      };

      recognition.onaudioend = function (event) {
        //Fired when the user agent has finished capturing audio.
        console.log('SpeechRecognition.onaudioend');
      };

      recognition.onend = function (event) {
        //Fired when the speech recognition service has disconnected.
        console.log('SpeechRecognition.onend');
      };

      recognition.onnomatch = function (event) {
        //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
        console.log('SpeechRecognition.onnomatch');
      };

      recognition.onsoundstart = function (event) {
        //Fired when any sound � recognisable speech or not � has been detected.
        console.log('SpeechRecognition.onsoundstart');
      };

      recognition.onsoundend = function (event) {
        //Fired when any sound � recognisable speech or not � has stopped being detected.
        console.log('SpeechRecognition.onsoundend');
      };

      recognition.onspeechstart = function (event) {
        //Fired when sound that is recognised by the speech recognition service as speech has been detected.
        console.log('SpeechRecognition.onspeechstart');
      };
      recognition.onstart = function (event) {
        //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
        console.log('SpeechRecognition.onstart');
      };
    }
  }

  render() {
    return (
      <div className={`${styles.pageWrapper} ${ownStyles.phraseMatcherWrapper}`}>
        <h2>{phraseMatcher.title}</h2>
        <p>Press the button then say the phrase to test the recognition.</p>

        <button>Start new test</button>

        <div>
          <p className={ownStyles.phrase}>Phrase...</p>
          <p className={ownStyles.result}>Right or wrong?</p>
          <p className={ownStyles.output}>...diagnostic messages</p>
        </div>
      </div>
    );
  }
}

export default PhraseMatcher;
