import React, {Component} from 'react';
import {object} from 'prop-types';
import classNames from 'classnames';
import {Route, Switch} from 'react-router-dom';
import routesConfiguration from '../routing/routesConfiguration'
import ContentList from './ContentList';
import PageVisibility from './page-visibility/PageVisibility';
import NetworkInformation from './network-information/NetworkInformation';
import Media from './media/Media';
import Dialog from './dialog/Dialog';
import Speech from './speech/Speech';
import * as appStyles from './App.less';
import * as styles from '../styles/global.less';

const {speechMain, pageVisibility, networkInformation, media, root, dialog} = routesConfiguration;

class App extends Component {

  static propTypes = {
    history: object
  };

  redirect = path => {
    this.props.history.push(path);
  };

  render() {
    return (
      <div className={appStyles.webApiDemoContainer}>
        <div className={classNames(styles.header)}>
          <h3 onClick={() => this.redirect(root.path)}>{root.title}</h3>
        </div>
        <div className={appStyles.contentWrapper}>
          <Switch>
            <Route exact path={root.path} component={ContentList}/>
            <Route path={speechMain.path} component={Speech}/>
            <Route exact path={pageVisibility.path} component={PageVisibility}/>
            <Route exact path={networkInformation.path} component={NetworkInformation}/>
            <Route exact path={media.path} component={Media}/>
            <Route exact path={dialog.path} component={Dialog}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
