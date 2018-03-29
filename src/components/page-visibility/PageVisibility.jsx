import React from 'react';
import routesConfiguration from '../../routing/routesConfiguration'
import * as styles from '../../styles/global.less';

const {pageVisibility} = routesConfiguration;

const PageVisibility = () => {
  return (
    <div className={styles.pageWrapper}>
      <h3
        className={styles.pageIdentificator}
      >
        {pageVisibility.title}
      </h3>
      <h2>{pageVisibility.title}</h2>
    </div>
  );
};

export default PageVisibility;
