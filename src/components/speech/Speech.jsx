import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import PhraseMatcher from './phrase-matcher/PhraseMatcher';
import SpeechSynthesis from './speech-synthesis/SpeechSynthesis';
import routesConfiguration from '../../routing/routesConfiguration'

const {phraseMatcher, speechSynthesis} = routesConfiguration;

const Speech = (props) => (
  <div>
    <h1>Hello from Speech Main</h1>
    <button onClick={() => props.history.push(phraseMatcher.path)}>GotTo Phrase Matcher</button>
    <button onClick={() => props.history.push(speechSynthesis.path)}>GotTo Speech Synthesis</button>
    <Switch>
      <Route exact path={phraseMatcher.path} component={PhraseMatcher}/>
      <Route exact path={speechSynthesis.path} component={SpeechSynthesis}/>
    </Switch>
  </div>
);

export default Speech;
