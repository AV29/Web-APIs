import React from 'react';
import routesConfiguration from '../../routing/routesConfiguration';
import './FaceDetection.less';

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
    document.querySelectorAll('.dropTarget').forEach(this.addListenersForDropping);
    this.faceDetector = new window.FaceDetector();
    this.startVideo();
  }

  addListenersForDropping = element => {
    element.addEventListener('drop', this.handleDrop);
    element.addEventListener('dragover', this.handleDragOver);
    element.addEventListener('dragleave', this.handleDragLeave);
  };

  handleDragOver = event => {
    event.preventDefault(); // preventing touch and pointer events
    event.target.classList.add('isOver');
    event.dataTransfer.dropEffect = 'move';
  };

  handleDragLeave = event => {
    event.target.classList.remove('isOver');
  };

  handleDrop = (event, addListenersAfterDrop) => {
    event.preventDefault();
    const dataItems = event.dataTransfer.items; //DataTransferItemList object
    for (let i = 0; i < dataItems.length; i += 1) {
      if (dataItems[i].kind === 'string' && dataItems[i].type.match('^text/plain')) {
        dataItems[i].getAsString(function (s) {
          console.log('... Drop: Text');
          const draggableItem = document.getElementById(s);
          if(event.target.id === 'trash') {
            draggableItem.parentElement.removeChild(draggableItem);
          } else {
            document.getElementById(s) && event.target.appendChild(document.getElementById(s));
          }
        });
      } else if (dataItems[i].kind === 'string' && dataItems[i].type.match('^text/html')) {
        console.log('... Drop: HTML');
      } else if (dataItems[i].kind === 'string' && dataItems[i].type.match('^text/uri-list')) {
        console.log('... Drop: URI');
      } else if (dataItems[i].kind === 'file' && dataItems[i].type.match('^image/')) {
        const f = dataItems[i].getAsFile();
        const reader = new FileReader();
        reader.onload = ({target: {result}}) => {
          const image = document.createElement('img');
          image.src = result;
          image.draggable = true;
          image.id = `fileImg-${Date.now()}`;
          //addListenersForDragging(image);
          event.target.appendChild(image);
        };

        reader.readAsDataURL(f);
        console.log('... Drop: File ');
      }
    }
    event.target.classList.remove('isOver');
  };

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
        className="pageWrapper faceDetection"
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
        <div className="imageDetection dropTarget">

        </div>
      </div>
    );
  }
}

export default FaceDetection;
