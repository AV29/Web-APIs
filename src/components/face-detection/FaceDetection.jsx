import React from 'react';
import routesConfiguration from '../../routing/routesConfiguration';

const {faceDetection} = routesConfiguration;

class FaceDetection extends React.Component {
  constructor(props) {
    super(props);

    this.videoTrack = null;
    this.state = {
      videoStarted: false
    };
  }

  _videoRef = video => {
    this.video = video;
  };

  _faceBox = faceBox => {
    this.faceBox = faceBox;
  };

  componentWillUnmount() {
    clearInterval(this.inverval);
  }

  componentDidMount() {
    if (typeof window.FaceDetector === 'undefined') {
      alert('No face detection!');
      return;
    }
    this.faceDetector = new window.FaceDetector();
    this.startVideo();
  }

  startVideo = () => {
    const constrains = {audio: false, video: {width: 1280, height: 720}};
    navigator.mediaDevices.getUserMedia(constrains).then(this.applyStream);
    this.setState({videoStarted: true});
  };

  applyStream = stream => {
    const videoTracks = stream.getVideoTracks();

    if (videoTracks.length) {
      this.videoTrack = videoTracks[0];
    }
    this.video.srcObject = stream;
    setTimeout(() => {
      this.inverval = setInterval(() => {
        this.faceDetector.detect(this.video)
          .then(this.handleDetectFaces)
          .catch(err => {
            console.log('Handled Error', err);
            this.stopVideo();
          });
      }, 150);
    }, 500);
  };

  handleDetectFaces = faces =>
    faces.forEach(face => {
      const {width, height, top, left} = face.boundingBox;

      this.faceBox.style.cssText = `
                position: absolute;
                z-index: 2;
                width: ${width}px;
                height: ${height}px;
                top: ${top}px;
                left: ${left}px;
              `;

      face.landmarks.forEach((landmark, index) => {
        if (landmark.type !== 'eye') {
          return;
        }

        const {x, y} = landmark.location;
        const div = document.getElementById(`eye-${index}`);
        div.style.cssText = `
                  z-index: 2;
                  width: 35%;
                  height: 35%;
                  position: absolute;
                  background-size: cover;
                  top: ${y - top}px;
                  left: ${x - left}px;
                  background-image: url('https://orig00.deviantart.net/39bb/f/2016/217/1/0/free_googly_eye_by_terrakatski-dacmqt2.png');
                `;
      });
    });

  stopVideo = () => {
    if (this.videoTrack) {
      this.videoTrack.stop();
    }
    this.videoTrack = null;
    this.video.srcObject = null;
    clearInterval(this.inverval);
    this.setState({videoStarted: false});
  };

  render() {
    return (
      <div
        id="wrapper"
        style={{position: 'relative'}}
        className="pageWrapper"
      >
        <h3
          className="pageIdentificator"
        >
          {faceDetection.title}
        </h3>
        <h2>{faceDetection.title}</h2>

        <video
          ref={this._videoRef}
          autoPlay
        />
        <div ref={this._faceBox}>
          <div id="eye-0"/>
          <div id="eye-1"/>
        </div>
        <div className="controls">
          {this.state.videoStarted && <button onClick={this.stopVideo}>Stop Video</button>}
          {!this.state.videoStarted && <button onClick={this.startVideo}>Start Video</button>}
        </div>
      </div>
    );
  }
}

export default FaceDetection;
