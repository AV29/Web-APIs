import React, { Component } from 'react';
import routesConfiguration from '../../routing/routesConfiguration';
import visibilityChangeHandler from './visibilityChangeHandler';
import './PageVisibility.less';

const { pageVisibility } = routesConfiguration;

class PageVisibility extends Component {
  constructor (props) {
    super(props);

    this.videoElement = null;
    this.state = {
      visibilityState: [document.visibilityState]
    };

    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handlePauseVideo = this.handlePauseVideo.bind(this);
    this.handlePlayVideo = this.handlePlayVideo.bind(this);
  }

  componentDidMount () {
    this.subscribe();
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  handlePlayVideo () {
    document.title = 'Playing';
  }

  handlePauseVideo () {
    document.title = 'Paused';
  }

  handleVisibilityChange () {
    return visibilityChangeHandler(this);
  }

  subscribe () {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.videoElement.addEventListener('pause', this.handlePauseVideo);
    this.videoElement.addEventListener('play', this.handlePlayVideo);
  }

  unsubscribe () {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.videoElement.removeEventListener('pause', this.handlePauseVideo);
    this.videoElement.removeEventListener('play', this.handlePlayVideo);
  }

  render () {
    const stateCount = this.state.visibilityState.length;
    return (
      <div className="pageWrapper pageVisibility">
        <h3
          className="pageIdentificator"
        >
          {pageVisibility.title}
        </h3>
        <h2>{pageVisibility.title}</h2>
        <div className="contentWrapper">
          <div
            className="stateContainer"
          >
            {
              this.state.visibilityState.map((state, index) => {
                const textDecoration = stateCount > 2 && index < stateCount - 2 ? 'line-through' : 'none';
                return (
                  <strong
                    key={index}
                    className={`state ${index >= stateCount - 2 && 'marked-state'}`}
                    style={{ textDecoration }}
                  >
                    {`${index + 1}) `}
                    {state}
                    {index === stateCount - 1 &&
                    <span style={{ color: 'darkgreen', fontSize: '15px' }}>(last step)</span>}
                    {index === stateCount - 2 &&
                    <span style={{ color: 'darkred', fontSize: '15px' }}>(previous step)</span>}
                  </strong>
                );
              })}
          </div>
          <video
            ref={video => this.videoElement = video}
            width="1190"
            height="360"
          >
            <source
              src="https://r2---sn-4g5ednsl.googlevideo.com/videoplayback?id=o-AJDCyJDjAYjcK8azjfXFC6r1dpc9m7k7nrwqibPKk5hM&itag=18&source=youtube&requiressl=yes&pl=19&ei=j8vFXK_MNeGoz7sPzMeo0As&mime=video%2Fmp4&gir=yes&clen=10264094&ratebypass=yes&dur=247.338&lmt=1443298675445856&fvip=2&c=WEB&ip=59.91.123.94&ipbits=0&expire=1556488176&sparams=clen,dur,ei,expire,gir,id,ip,ipbits,ipbypass,itag,lmt,mime,mip,mm,mn,ms,mv,pl,ratebypass,requiressl,source&key=cms1&signature=6E1EB422F000FD6A4C61EC5D195C2A7646832BE3.780324EACA257DE5642BF797934C211F83D8310F&video_id=f56lELufeQE&title=Enigma+Return+to+Innocence+Music+Video+Official&rm=sn-qxay7d&req_id=55c397c701b8a3ee&ipbypass=yes&mip=46.56.230.230&cm2rm=sn-ivhxoxufvg3g0-hn9e7l,sn-gvnuxaxjvh-n8vk7d&redirect_counter=3&cms_redirect=yes&mm=30&mn=sn-4g5ednsl&ms=nxu&mt=1556466517&mv=m"
              type="video/mp4"
              media="all and (max-width:680px)"
            />
            <p>Oops!</p>
          </video>
        </div>
      </div>
    );
  }
}

export default PageVisibility;
