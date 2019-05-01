import React, { Component } from 'react';
import routesConfiguration from '../../routing/routesConfiguration';
import { getFormattedTime } from './getFormattedTime';
import './PageVisibility.less';

const { pageVisibility } = routesConfiguration;

class PageVisibility extends Component {
  constructor (props) {
    super(props);

    this.videoElement = null;
    this.state = {
      visibilityState: [{
        state: document.visibilityState,
        time: getFormattedTime(new Date())
      }]
    };

    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handlePauseVideo = this.handlePauseVideo.bind(this);
    this.handlePlayVideo = this.handlePlayVideo.bind(this);
  }

  componentDidMount () {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  componentWillUnmount () {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    document.title = 'WEB API Demo';
  }

  handlePlayVideo () {
    document.title = 'Playing';
  }

  handlePauseVideo () {
    document.title = 'Paused';
  }

  handleVisibilityChange () {
    this.setState(
      ({ visibilityState }) => ({
        visibilityState: visibilityState.concat({
          state: document.visibilityState,
          time: getFormattedTime(new Date())
        })
      }),
      () => {
        document.hidden
          ? this.videoElement.pause()
          : this.videoElement.play().catch(console.log);
      }
    );
  }

  render () {
    const stateCount = this.state.visibilityState.length;
    return (
      <div className="pageWrapper pageVisibility">
        <h3 className="pageIdentificator">{pageVisibility.title}</h3>
        <h2>{pageVisibility.title}</h2>
        <div className="contentWrapper">
          <div className="stateContainer">
            {
              this.state.visibilityState.map((data, index) => (
                <strong key={index} className="state">
                  <span className="currentStateStatus">{data.state}</span>
                  {index === stateCount - 1 && <span className="current">(curr)</span>}
                  {index === stateCount - 2 && <span className="previous">(prev)</span>}
                  <span className="time">{data.time}</span>
                </strong>
              ))}
          </div>
          <video
            onPause={this.handlePauseVideo}
            onPlay={this.handlePlayVideo}
            autoPlay
            controls
            ref={video => this.videoElement = video}
            src={"assets/videoplayback.mp4"}
            width="480"
            height="360"
          />
        </div>
      </div>
    );
  }
}

export default PageVisibility;
