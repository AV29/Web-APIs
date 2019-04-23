import React, { Component } from 'react';
import { object, number } from 'prop-types';
import classNames from 'classnames';
import routesConfiguration from '../routing/routesConfiguration';
import './ContentList.less';

class ContentList extends Component {

  constructor(props) {
    super(props);

    this.sections = Object
      .values(routesConfiguration)
      .filter(({ step }) => step !== undefined)
      .sort((prev, next) => prev.step - next.step)
  }

  static propTypes = {
    history: object,
    step: number
  };

  redirect = path => {
    this.props.history.push(path);
  };

  renderSection = ({ step, path, title }) => {
    return this.props.step > step ?
      (
        <h1
          key={step}
          className={classNames(['sectionTitle', `sectionTitle-${step}`])}
          onClick={() => this.redirect(path)}
        >
          {title}
        </h1>
      ) :
      null;
  };

  render() {
    return <div className="content">{this.sections.map(this.renderSection)}</div>;
  }
}

export default ContentList;
