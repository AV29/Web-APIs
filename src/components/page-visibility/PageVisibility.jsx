import React, {Component} from 'react';
import routesConfiguration from '../../routing/routesConfiguration';
import './PageVisibility.less';

const {pageVisibility} = routesConfiguration;

class PageVisibility extends Component {

  componentDidMount() {
    const videoElement = document.getElementById('videoElement');

    function handleVisibilityChange() {
      if (!document.hidden) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange, false);
    videoElement.addEventListener('pause', function () {
      document.title = 'Paused';
    }, false);
    videoElement.addEventListener('play', function () {
      document.title = 'Playing';
    }, false);

  }

  render() {
    return (
      <div className="pageWrapper pageVisibility">
        <h3
          className="pageIdentificator"
        >
          {pageVisibility.title}
        </h3>
        <h2>{pageVisibility.title}</h2>
        <main>
          <video id="videoElement" width="1480" height="360">
            <source
              src="https://s3-ap-northeast-1.amazonaws.com/daniemon/demos/The%2BVillage-Mobile.mp4"
              type="video/mp4"
              media="all and (max-width:680px)"
            />
            <source
              src="https://s3-ap-northeast-1.amazonaws.com/daniemon/demos/The%2BVillage-Mobile.webm"
              type="video/webm"
              media="all and (max-width:680px)"
            />
            <source
              src="https://s3-ap-northeast-1.amazonaws.com/daniemon/demos/The%2BVillage-SD.mp4"
              type="video/mp4"
            />
            <source
              src="https://s3-ap-northeast-1.amazonaws.com/daniemon/demos/The%2BVillage-SD.webm"
              type="video/webm"
            />
            <p>Oops!</p>
          </video>
        </main>
      </div>
    );
  }
}

export default PageVisibility;
