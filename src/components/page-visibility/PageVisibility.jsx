import React from 'react';
import routesConfiguration from '../../routing/routesConfiguration'

const {pageVisibility} = routesConfiguration;

const PageVisibility = () => {
  return (
    <div className="pageWrapper">
      <h3
        className="pageIdentificator"
      >
        {pageVisibility.title}
      </h3>
      <h2>{pageVisibility.title}</h2>
    </div>
  );
};

export default PageVisibility;
