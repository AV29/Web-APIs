import React, { Component } from 'react';
import { object } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import routesConfiguration from '../../routing/routesConfiguration';
import ContentList from './ContentList';
import PageVisibility from '../page-visibility/PageVisibility';
import DragAndDrop from '../drag-and-drop/DragAndDrop';
import Media from '../media/Media';
import Dialog from '../dialog/Dialog';
import ShapeDetection from '../shape-detection/ShapeDetection';
import NetworkInformation from '../network-information/NetworkInformation';
import Speech from '../speech/Speech';
import ExtendedRoute from '../common/extended-route/ExtendedRoute';
import DirectionsHint from './DirectionsHint';
import './App.less';

const { speechMain, pageVisibility, dragAndDrop, media, root, dialog, shapeDetection, networkInfo } = routesConfiguration;

const startStep = 0;

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
      step: startStep
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
    this.state.step < this.menuListSize && which === 40 && this.setState(({ step }) => ({ step: step + 1 }));
    this.state.step > startStep && which === 38 && this.setState(({ step }) => ({ step: step - 1 }));
  };

  redirect = path => {
    this.props.history.push(path);
  };

  render () {
    return (
      <div className="webApiDemoContainer">
        <div className="header">
          <h3
            className="app-title"
            onClick={() => this.redirect(root.path)}
          >
            {root.title}
          </h3>
          <DirectionsHint currentStep={this.state.step} totalSteps={this.menuListSize}/>
        </div>
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
