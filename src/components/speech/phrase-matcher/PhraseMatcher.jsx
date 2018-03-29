import React from 'react';
import routesConfiguration from '../../../routing/routesConfiguration'
import * as styles from '../../../styles/global.less';

const {phraseMatcher} = routesConfiguration;

const PhraseMatcher = () => {
  return (
    <div className={styles.pageWrapper}>
      <h2>{phraseMatcher.title}</h2>
    </div>
  );
};

export default PhraseMatcher;
