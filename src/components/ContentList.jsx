import React, {Component} from 'react';
import {object} from 'prop-types';
import routesConfiguration from '../routing/routesConfiguration'
import * as styles from '../styles/global.less';

const {speechMain, pageVisibility, networkInformation, media, dialog} = routesConfiguration;

class ContentList extends Component {

  static propTypes = {
    history: object
  };

  redirect = path => {
    this.props.history.push(path);
  };

  render() {
    const {step} = this.props;
    return (
      <div className={styles.content}>
          <h1
            className={styles.sectionTitle}
            onClick={() => this.redirect(speechMain.path)}
          >
            {speechMain.title}
          </h1>
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
      </div>
    );
  }
}

export default ContentList;
