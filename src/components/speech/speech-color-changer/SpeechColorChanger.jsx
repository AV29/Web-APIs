import React from 'react';
import routesConfiguration from '../../../routing/routesConfiguration'
import * as styles from '../../../styles/global.less';

const {speechColorChanger} = routesConfiguration;

const SpeechColorChanger = () => {
  return (
    <div className={styles.pageWrapper}>
      <h2>{speechColorChanger.title}</h2>
    </div>
  );
};

export default SpeechColorChanger;
