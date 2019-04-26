import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import DirectionsHint from './DirectionsHint';
import home from '../../../assets/home.svg'
import routesConfiguration from '../../routing/routesConfiguration';
import './Header.less';

export default withRouter((props) => {
  return (
    <div className="header">
      {
        props.location.pathname === props.match.path ?
          <Fragment>
            <h2 className="appTitle">{routesConfiguration.root.title}</h2>
            <DirectionsHint
              currentStep={props.currentStep}
              totalSteps={props.totalSteps}
            />
          </Fragment> :
          <div
            className="homeIcon"
            dangerouslySetInnerHTML={{ __html: home }}
            onClick={() => props.history.push(routesConfiguration.root.path)}
          />
      }
    </div>
  );
});
