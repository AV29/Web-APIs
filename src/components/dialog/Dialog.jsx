import React from 'react';
import routesConfiguration from '../../routing/routesConfiguration';

const {dialog} = routesConfiguration;

const Dialog = () => {
  return (
    <div className="pageWrapper">
      <h3
        className="pageIdentificator"
      >
        {dialog.title}
      </h3>
      <h2>{dialog.title}</h2>
    </div>
  );
};

export default Dialog;
