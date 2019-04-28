import React, { Component } from 'react';
import routesConfiguration from '../../routing/routesConfiguration';
import './NetworkInformation.less';

const { networkInfo } = routesConfiguration;

class NetworkInformation extends Component {

  componentDidMount () {
    const currentConnectionInfo = document.getElementById('currentConnectionInfo');
    const changedConnectionInfo = document.getElementById('changedConnectionInfo');
    const videoInfo = document.getElementById('videoInfo');
    const video = document.getElementById('video');

    const currentConnection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    let oldType;
    let oldEffectiveType;

    currentConnection.addEventListener('change', updateConnectionInfo);

    updateCurrentConnectionInfo();
    setupOldConnectionProperties();
    setupVideoProperties();

    function updateCurrentConnectionInfo () {
      currentConnectionInfo.innerHTML = `<p>Connection type: <strong>${getValue(currentConnection.type)}</strong></p>`;
      currentConnectionInfo.innerHTML += `<p>Connection effective type: <strong>${getValue(currentConnection.effectiveType)}</strong></p>`;
      currentConnectionInfo.innerHTML += `<p>Download speed:<strong> ${getValue(currentConnection.downlink)} Mbps</strong></p>`;
      currentConnectionInfo.innerHTML += `<p>Rtt:<strong> ${getValue(currentConnection.rtt)}</strong></p>`;
      currentConnectionInfo.innerHTML += `<p>Download max speed: <strong>${getValue(currentConnection.downlinkMax)} Mbps</strong></p>`;
    }

    function setupOldConnectionProperties () {
      oldType = currentConnection.type;
      oldEffectiveType = currentConnection.effectiveType;
    }

    function setupVideoProperties () {
      video.autoplay = currentConnection.type !== 'cellular';
      if (video.autoplay) {
        video.play();
      } else {
        video.pause();
      }
      videoInfo.innerHTML = `<p>Video autoplay is <strong>${video.autoplay ? 'ON' : 'OFF'}</strong> (Off only for 'cellular' connection type)</p>`;
    }

    function getValue (value) {
      return value || 'N/A';
    }

    function updateConnectionInfo () {
      updateCurrentConnectionInfo();
      if (currentConnection.effectiveType || currentConnection.type) {
        if (oldType !== currentConnection.type) {
          logTypeChanges();
        } else if (oldEffectiveType !== currentConnection.effectiveType) {
          logEffectiveTypeChanges();
        }
        setupOldConnectionProperties();
        setupVideoProperties();
      }
    }

    function logTypeChanges () {
      changedConnectionInfo.innerHTML += `<p>${new Date().toLocaleString()} Type changed from <strong>${getValue(oldType)}</strong> to <strong>${getValue(currentConnection.type)}</strong><p>`;
    }

    function logEffectiveTypeChanges () {
      changedConnectionInfo.innerHTML += `<p>${new Date().toLocaleString()} Effective type changed from <strong>${getValue(oldEffectiveType)}</strong> to <strong>${getValue(currentConnection.effectiveType)}</strong><p>`;
    }
  }

  render () {
    return (
      <div className="pageWrapper networkInfoWrapper">
        <h3 className="pageIdentificator">
          {networkInfo.title}
        </h3>
        <div id="currentConnectionInfo"/>
        <video id="video" muted loop width="1480" height="360">
          <source
            src="https://r2---sn-4g5ednsl.googlevideo.com/videoplayback?id=o-AJDCyJDjAYjcK8azjfXFC6r1dpc9m7k7nrwqibPKk5hM&itag=18&source=youtube&requiressl=yes&pl=19&ei=j8vFXK_MNeGoz7sPzMeo0As&mime=video%2Fmp4&gir=yes&clen=10264094&ratebypass=yes&dur=247.338&lmt=1443298675445856&fvip=2&c=WEB&ip=59.91.123.94&ipbits=0&expire=1556488176&sparams=clen,dur,ei,expire,gir,id,ip,ipbits,ipbypass,itag,lmt,mime,mip,mm,mn,ms,mv,pl,ratebypass,requiressl,source&key=cms1&signature=6E1EB422F000FD6A4C61EC5D195C2A7646832BE3.780324EACA257DE5642BF797934C211F83D8310F&video_id=f56lELufeQE&title=Enigma+Return+to+Innocence+Music+Video+Official&rm=sn-qxay7d&req_id=55c397c701b8a3ee&ipbypass=yes&mip=46.56.230.230&cm2rm=sn-ivhxoxufvg3g0-hn9e7l,sn-gvnuxaxjvh-n8vk7d&redirect_counter=3&cms_redirect=yes&mm=30&mn=sn-4g5ednsl&ms=nxu&mt=1556466517&mv=m"
            type="video/mp4"
            media="all and (max-width:680px)"
          />
        </video>
        <div id="videoInfo"/>
        <div id="changedConnectionInfo"/>
      </div>
    );
  }
}

export default NetworkInformation;
