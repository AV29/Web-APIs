import React from 'react';
import routesConfiguration from '../../routing/routesConfiguration'
import * as styles from '../../styles/global.less';

const {networkInformation} = routesConfiguration;

const NetworkInformation = () => {
  return (
    <div className={styles.pageWrapper}>
      <h3
        className={styles.pageIdentificator}
      >
        {networkInformation.title}
      </h3>
      <h2>{networkInformation.title}</h2>
    </div>
  );
};

export default NetworkInformation;
