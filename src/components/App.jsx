import React, { Component } from 'react';
import { object } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import routesConfiguration from '../routing/routesConfiguration';
import ContentList from './utils/ContentList';
import PageVisibility from './page-visibility/PageVisibility';
import DragAndDrop from './drag-and-drop/DragAndDrop';
import Media from './media/Media';
import Dialog from './dialog/Dialog';
import ShapeDetection from './shape-detection/ShapeDetection';
import NetworkInformation from './network-information/NetworkInformation';
import Speech from './speech/Speech';
import ExtendedRoute from './common/extended-route/ExtendedRoute';
import Header from './utils/Header';
import './App.less';

const { speechMain, pageVisibility, dragAndDrop, media, root, dialog, shapeDetection, networkInfo } = routesConfiguration;

const START_STEP = 0;

const getLastStep = () => {
  return Number(localStorage.getItem('lastDemoStep')) || START_STEP;
};

class App extends Component {
  static propTypes = {
    history: object
  };

  static getMenuListSize = () => {
    return Object.keys(routesConfiguration).filter(key => routesConfiguration[key].step !== undefined).length;
  };

  constructor (props) {
    super(props);
    this.menuListSize = App.getMenuListSize();
    this.state = {
      step: getLastStep()
    };
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({ which }) => {
    if ((which !== 38 && which !== 40) || this.props.location.pathname !== root.path) {
      return;
    }
    const { step } = this.state;
    step < this.menuListSize && which === 40 && this.changeStep(step + 1);
    step > START_STEP && which === 38 && this.changeStep(step - 1);
  };

  changeStep = (nextStep) => {
    this.setState({ step: nextStep });
    localStorage.setItem('lastDemoStep', nextStep);
  };

  render () {
    return (
      <div className="webApiDemoContainer">
        <Header currentStep={this.state.step} totalSteps={this.menuListSize}/>
        <div className="contentWrapper">
          <Switch>
            <ExtendedRoute
              exact
              path={root.path}
              step={this.state.step}
              component={ContentList}
            />
            <Route
              path={speechMain.path}
              component={Speech}
            />
            <Route
              exact
              path={pageVisibility.path}
              component={PageVisibility}
            />
            <Route
              exact
              path={dragAndDrop.path}
              component={DragAndDrop}
            />
            <Route
              exact
              path={media.path}
              component={Media}
            />
            <Route
              exact
              path={dialog.path}
              component={Dialog}
            />
            <Route
              exact
              path={networkInfo.path}
              component={NetworkInformation}
            />
            <Route
              exact
              path={shapeDetection.path}
              component={ShapeDetection}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
