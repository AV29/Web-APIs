import React, {Component} from 'react';
import routesConfiguration from '../../../routing/routesConfiguration'
import * as styles from '../../../styles/global.less';
import * as ownStyles from './SpeechSynthesis.less';

const {speechSynthesis} = routesConfiguration;

class SpeechSynthesis extends Component {

  componentDidMount() {
    const synth = window.speechSynthesis;

    const inputForm = document.querySelector('form');
    const inputTxt = document.querySelector('.txt');
    const voiceSelect = document.querySelector('select');

    const pitch = document.querySelector('#pitch');
    const pitchValue = document.querySelector('.pitch-value');
    const rate = document.querySelector('#rate');
    const rateValue = document.querySelector('.rate-value');

    let voices = [];

    function populateVoiceList() {
      voices = synth.getVoices();
      const selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
      voiceSelect.innerHTML = '';
      for(let i = 0; i < voices.length ; i++) {
        const option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

        if(voices[i].default) {
          option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
      }
      voiceSelect.selectedIndex = selectedIndex;
    }

    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    function speak(){
      if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
      }
      if (inputTxt.value !== '') {
        const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
        utterThis.onend = function (event) {
          console.log('SpeechSynthesisUtterance.onend');
        };
        utterThis.onerror = function (event) {
          console.error('SpeechSynthesisUtterance.onerror');
        };
        const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
        for(let i = 0; i < voices.length ; i++) {
          if(voices[i].name === selectedOption) {
            utterThis.voice = voices[i];
          }
        }
        utterThis.pitch = pitch.value;
        utterThis.rate = rate.value;
        synth.speak(utterThis);
      }
    }

    inputForm.onsubmit = function(event) {
      event.preventDefault();

      speak();

      inputTxt.blur();
    };

    pitch.onchange = function() {
      pitchValue.textContent = pitch.value;
    };

    rate.onchange = function() {
      rateValue.textContent = rate.value;
    };

    voiceSelect.onchange = function(){
      speak();
    }
  }

  render() {
    return (
      <div className={`${styles.pageWrapper} ${ownStyles.speechSynthesisWrapper}`}>
        <h2>{speechSynthesis.title}</h2>
        <p>
          Enter some text in the input below and press return or the "play" button to hear it. change voices using the
          dropdown menu.
        </p>

        <form>
          <input type="text" className={ownStyles.txt}/>
          <div>
            <label htmlFor="rate">Rate</label><input type="range" min="0.5" max="2" value="1" step="0.1" id="rate"/>
            <div className={ownStyles.rateValue}>1</div>
            <div className={ownStyles.clearfix}/>
          </div>
          <div>
            <label htmlFor="pitch">Pitch</label><input type="range" min="0" max="2" value="1" step="0.1" id="pitch"/>
            <div className={ownStyles.pitchValue}>1</div>
            <div className={ownStyles.clearfix}/>
          </div>
          <select>

          </select>
          <div className={ownStyles.controls}>
            <button id="play" type="submit">Play</button>
          </div>
        </form>
      </div>
    );
  }
};

export default SpeechSynthesis;
