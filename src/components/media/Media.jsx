import React from 'react';
import routesConfiguration from '../../routing/routesConfiguration'
import * as styles from '../../styles/global.less';

const {media} = routesConfiguration;

const Media = () => {
  return (
    <div className={styles.pageWrapper}>
      <h3
        className={styles.pageIdentificator}
      >
        {media.title}
      </h3>
      <h2>{media.title}</h2>
    </div>
  );
};

export default Media;
