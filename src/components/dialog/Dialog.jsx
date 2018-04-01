import React from 'react';
import routesConfiguration from '../../routing/routesConfiguration';
import * as styles from '../../styles/global.less';

const {dialog} = routesConfiguration;

const Dialog = () => {
  return (
    <div className={styles.pageWrapper}>
      <h3
        className={styles.pageIdentificator}
      >
        {dialog.title}
      </h3>
      <h2>{dialog.title}</h2>
    </div>
  );
};

export default Dialog;
