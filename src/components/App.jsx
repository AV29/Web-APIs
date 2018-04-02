import React, {Component} from 'react';
import {object} from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import routesConfiguration from '../routing/routesConfiguration'
import ContentList from './ContentList';
import PageVisibility from './page-visibility/PageVisibility';
import DragAndDrop from './drag-and-drop/DragAndDrop';
import Media from './media/Media';
import Dialog from './dialog/Dialog';
import FaceDetection from './face-detection/FaceDetection';
import Speech from './speech/Speech';
import ExtendedRoute from './common/extended-route/ExtendedRoute';
import './App.less';

const {speechMain, pageVisibility, dragAndDrop, media, root, dialog, faceDetection} = routesConfiguration;

class App extends Component {
  static propTypes = {
    history: object
  };

  static getMenuListSize = () => {
    return Object.keys(routesConfiguration).filter(key => routesConfiguration[key].topLevel).length;
  };

  constructor(props) {
    super(props);
    this.menuListSize = App.getMenuListSize();
    this.state = {
      step: 0
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({which}) => {
    if ((which !== 38 && which !== 40) || this.props.location.pathname !== root.path) {
      return;
    }
    this.state.step < this.menuListSize && which === 40 && this.setState(({step}) => ({step: step + 1}));
    this.state.step > 0 && which === 38 && this.setState(({step}) => ({step: step - 1}));
  };

  redirect = path => {
    this.props.history.push(path);
  };

  render() {
    return (
      <div className="webApiDemoContainer">
        <div className="header">
          <h3 onClick={() => this.redirect(root.path)}>{root.title}</h3>
        </div>
        <div className="contentWrapper">
          <Switch>
            <ExtendedRoute exact path={root.path} step={this.state.step} component={ContentList}/>
            <Route path={speechMain.path} component={Speech}/>
            <Route exact path={pageVisibility.path} component={PageVisibility}/>
            <Route exact path={dragAndDrop.path} component={DragAndDrop}/>
            <Route exact path={media.path} component={Media}/>
            <Route exact path={dialog.path} component={Dialog}/>
            <Route exact path={faceDetection.path} component={FaceDetection}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
