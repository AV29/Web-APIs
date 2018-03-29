import React from 'react';
import routesConfiguration from '../../../routing/routesConfiguration'
import * as styles from '../../../styles/global.less';

const {speechSynthesis} = routesConfiguration;

const SpeechSynthesis = () => {
  return (
    <div className={styles.pageWrapper}>
      <h2>{speechSynthesis.title}</h2>
    </div>
  );
};

export default SpeechSynthesis;
