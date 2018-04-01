import React, {Component} from 'react';
import {object, number} from 'prop-types';
import routesConfiguration from '../routing/routesConfiguration';
import * as styles from '../styles/global.less';

const {speechMain, pageVisibility, networkInformation, media, dialog, faceDetection} = routesConfiguration;

class ContentList extends Component {

  static propTypes = {
    history: object,
    step: number
  };

  redirect = path => {
    this.props.history.push(path);
  };

  render() {
    const {step} = this.props;
    return (
      <div className={styles.content}>
        {
          step > 0 &&
          <h1
            className={styles.sectionTitle}
            onClick={() => this.redirect(speechMain.path)}
          >
            {speechMain.title}
          </h1>
        }
        {
          step > 1 &&
          <h1
            className={styles.sectionTitle}
            onClick={() => this.redirect(pageVisibility.path)}
          >
            {pageVisibility.title}
          </h1>
        }
        {
          step > 2 &&
          <h1
            className={styles.sectionTitle}
            onClick={() => this.redirect(networkInformation.path)}
          >
            {networkInformation.title}
          </h1>
        }
        {
          step > 3 &&
          <h1
            className={styles.sectionTitle}
            onClick={() => this.redirect(media.path)}
          >
            {media.title}
          </h1>
        }
        {
          step > 4 &&
          <h1
            className={styles.sectionTitle}
            onClick={() => this.redirect(dialog.path)}
          >
            {dialog.title}
          </h1>
        }
        {
          step > 5 &&
          <h1
            className={styles.sectionTitle}
            onClick={() => this.redirect(faceDetection.path)}
          >
            {faceDetection.title}
          </h1>
        }
      </div>
    );
  }
}

export default ContentList;
