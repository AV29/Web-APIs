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
            src="https://r5---sn-f5f7lne7.googlevideo.com/videoplayback?id=o-ABZOqVcKvL7V804Tae5eieucxKR0dKThEkfaiPrGbk77&itag=18&source=youtube&requiressl=yes&pl=22&ei=-KrIXNbMFOOVlAPR17IY&mime=video%2Fmp4&gir=yes&clen=14113220&ratebypass=yes&dur=221.611&lmt=1547658005373450&fvip=4&beids=9466585&c=WEB&txp=5531432&ip=181.112.188.38&ipbits=0&expire=1556676440&sparams=clen,dur,ei,expire,gir,id,ip,ipbits,ipbypass,itag,lmt,mime,mip,mm,mn,ms,mv,pl,ratebypass,requiressl,source&key=cms1&signature=4E983DE3A81F80CEF2EB4448E5C500F00981042C.234D38788F299A70DB1D7FA306452CBB07FD8C56&video_id=7wfYIMyS_dI&title=Enya+-+Only+Time+%28Official+Music+Video%29&rm=sn-jou-0pvs7s,sn-jou-btxl7z,sn-hp5ze7l&fexp=9466585&req_id=f5bd467e35faa3ee&redirect_counter=3&cms_redirect=yes&ipbypass=yes&mip=178.121.80.172&mm=30&mn=sn-f5f7lne7&ms=nxu&mt=1556658894&mv=m"
            width="480"
            height="360"
          />
        </div>
      </div>
    );
  }
}

export default PageVisibility;
