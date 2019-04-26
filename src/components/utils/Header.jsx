import React from 'react';
import { withRouter } from 'react-router-dom';
import DirectionsHint from './DirectionsHint';
import home from '../../../assets/home.svg'
import routesConfiguration from '../../routing/routesConfiguration';
import './Header.less';

const { root } = routesConfiguration;

function Header(props) {
  const isRootLocation = props.location.pathname === props.match.path;
  return (
    <div className="header">
      <h2
        className={`appTitle ${!isRootLocation ? 'withHintHome' : ''}`}
        onClick={() => !isRootLocation && props.history.push(root.path)}
      >
        {
          isRootLocation
          ? root.title
          : <div  className="homeIcon" dangerouslySetInnerHTML={{ __html: home }}       />
        }
      </h2>
      {
        isRootLocation &&
        <DirectionsHint
          currentStep={props.currentStep}
          totalSteps={props.totalSteps}
        />
      }
    </div>
  );
}

export default withRouter(Header);
