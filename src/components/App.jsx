import React from 'react';
import {Route, Switch} from 'react-router-dom';
import routesConfiguration from '../routing/routesConfiguration'
import PageVisibility from './page-visibility/PageVisibility';
import Speech from './speech/Speech';
import PropTypes from 'prop-types';

const {speechMain, pageVisibility, root} = routesConfiguration;

const App = (props) => (
  <div>
    <h1 onClick={() => props.history.push(root.path)}>Hello from APP</h1>
    <button onClick={() => props.history.push(speechMain.path)}>GotTo Speech</button>
    <button onClick={() => props.history.push(pageVisibility.path)}>GotTo Page Visibility</button>
    <Switch>
      <Route path={speechMain.path} component={Speech}/>
      <Route exact path={pageVisibility.path} component={PageVisibility}/>
    </Switch>
  </div>
);

export default App;
