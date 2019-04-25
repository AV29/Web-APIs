import React, { Fragment } from 'react';
import routesConfiguration from '../../routing/routesConfiguration';
import './ShapeDetection.less';

const { shapeDetection } = routesConfiguration;

class FaceDetection extends React.Component {
  constructor (props) {
    super(props);

    this.videoTrack = null;
    this.state = {
      imageAppeared: null,
      videoPlaying: false,
      codes: [],
      codesTop: 0
    };
  }

  _videoRef = video => {
    this.video = video;
  };

  _mediaContainer = container => {
    this.mediaContainer = container;
  };

  _faceBox = faceBox => {
    this.faceBox = faceBox;
  };

  _trash = trash => {
    this.trash = trash;
  };

  componentWillUnmount () {
    clearInterval(this.inverval);
  }

  componentDidMount () {
    if (typeof window.FaceDetector === 'undefined') {
      alert('No face detection!');
      this.props.history.push('/');
    } else {
      document.querySelectorAll('.dropTarget').forEach(this.addListenersForDropping);
      this.faceDetector = new window.FaceDetector();
      this.barcodeDetector = new window.BarcodeDetector();
      this.addListenersForDropping(this.trash);
    }
  }

  addListenersForDragging = element => {
    element.addEventListener('dragstart', this.handleDragStart);
    element.addEventListener('drag', this.handleDrag);
    element.addEventListener('dragend', this.handleDragEnd);
  };

  addListenersForDropping = element => {
    element.addEventListener('drop', this.handleDrop);
    element.addEventListener('dragover', this.handleDragOver);
    element.addEventListener('dragleave', this.handleDragLeave);
  };

  handleDragStart = event => {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.target.classList.add('isDragStarted');
  };

  handleDrag = event => {
    event.target.classList.add('isDragged');
  };

  handleDragEnd = event => {
    event.target.classList.remove('isDragged');
    event.target.classList.remove('isDragStarted');
  };

  handleDragOver = event => {
    event.preventDefault(); // preventing touch and pointer events
    event.target.classList.add('isOver');
    event.dataTransfer.dropEffect = 'move';
  };

  handleDragLeave = event => {
    event.target.classList.remove('isOver');
  };

  handleDrop = event => {
    event.preventDefault();
    const dataItems = event.dataTransfer.items; //DataTransferItemList object
    for (let i = 0; i < dataItems.length; i += 1) {
      if (dataItems[i].kind === 'string' && dataItems[i].type.match('^text/plain')) {
        dataItems[i].getAsString((s) => {
          console.log('... Drop: Text');
          const draggableItem = document.getElementById(s);
          if (event.target === this.trash) {
            draggableItem.parentElement.removeChild(draggableItem);
            this.setState({ imageAppeared: null, codes: [], codesTop: 0 });
            document.querySelectorAll('.detected-face-box').forEach(el => el.parentElement.removeChild(el));
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
        reader.onload = ({ target: { result } }) => {
          const image = document.createElement('img');
          image.src = result;
          image.draggable = true;
          image.id = `fileImg-${Date.now()}`;
          this.addListenersForDragging(image);
          event.target.appendChild(image);
          this.setState({ imageAppeared: image });
        };

        reader.readAsDataURL(f);
        console.log('... Drop: File ');
      }
    }
    event.target.classList.remove('isOver');
  };

  startVideo = () => {
    const constrains = {
      echoCancellation: true,
      video: {
        width: 480,
        height: 360,
        frameRate: 30
      },
      audio: false
    };
    this.setState({ videoPlaying: true });
    navigator.mediaDevices.getUserMedia(constrains)
      .then(this.applyStream)
      .catch(({ name, message }) => console.error(name, message));
  };

  applyStream = stream => {
    const videoTracks = stream.getVideoTracks();

    if (videoTracks.length) {
      this.videoTrack = videoTracks[0];
    }
    this.video.srcObject = stream;
    setTimeout(() => {
      this.inverval = setInterval(() => {
        this.detectFaces(this.video, this.handleVideoDetection);
      }, 150);
    }, 500);
  };

  detectFaces = (target, successCallback) => {
    this.faceDetector.detect(target)
      .then(successCallback)
      .catch(err => {
        console.log('Handled Error', err);
        this.stopVideo();
      });
  };

  detectBarcode = (target) => {
    if (!target) {
      return;
    }
    this.barcodeDetector.detect(target)
      .then(this.handleBarCodeDetection)
      .catch(err => {
        console.log('Handled Error', err);
        this.stopVideo();
      });
  };

  getOffsetsForMediaContainer (type) {
    const { top: topMediaContainer } = this.mediaContainer.getBoundingClientRect();
    const { left, top } = this.mediaContainer.querySelector(type).getBoundingClientRect();

    return {
      leftOffset: left,
      topOffset: top - topMediaContainer
    };
  }

  setFaceBoxStyles (boxElement, face, offsets) {
    const { width, height, top, left } = face.boundingBox;
    const { leftOffset, topOffset } = offsets;
    boxElement.style.cssText = `width: ${width}px; height: ${height}px; top: ${top + topOffset}px; left: ${left + leftOffset}px;`;
  }

  handleVideoDetection = faces => {
    const offsets = this.getOffsetsForMediaContainer('video');
    faces.forEach(face => {
      this.setFaceBoxStyles(this.faceBox, face, offsets)
    });
  };

  handleBarCodeDetection = codes => {
    this.handleImageDetection(codes);
    const codesTop = this.mediaContainer.querySelector('img').getBoundingClientRect().bottom + 10;
    this.setState({
      codes: [...codes],
      codesTop
    });
  };

  handleImageDetection = faces => {
    const offsets = this.getOffsetsForMediaContainer('img');
    faces.forEach(face => {
      const faceBox = document.createElement('div');
      this.mediaContainer.appendChild(faceBox);
      faceBox.classList.add('detected-face-box');
      this.setFaceBoxStyles(faceBox, face, offsets);
    });
  };

  stopVideo = () => {
    if (this.videoTrack) {
      this.videoTrack.stop();
    }
    this.videoTrack = null;
    this.video.srcObject = null;
    clearInterval(this.inverval);
    this.setState({ videoPlaying: false });
  };

  renderButton () {
    if (this.state.imageAppeared) {
      return (
        <Fragment>
          <button onClick={() => this.detectFaces(this.state.imageAppeared, this.handleImageDetection)}>
            Detect face/faces
          </button>
          <button onClick={() => this.detectBarcode(this.state.imageAppeared)}>
            Detect Code
          </button>
        </Fragment>
      );
    } else if (this.state.videoPlaying) {
      return <button onClick={this.stopVideo}>Stop Video</button>
    } else {
      return <button onClick={this.startVideo}>Start Video</button>;
    }
  }

  render () {
    return (
      <div
        id="wrapper"
        className="pageWrapper shapeDetection"
      >
        <h3 className="pageIdentificator">
          {shapeDetection.title}
        </h3>
        <h2>{shapeDetection.title}</h2>
        <div className="controls">
          {
            this.renderButton()
          }
        </div>
        <div ref={this._mediaContainer} className="media-container dropTarget">
          <video
            style={{ display: this.state.videoPlaying ? 'block' : 'none' }}
            ref={this._videoRef}
            autoPlay
          />
          {
            (this.state.videoPlaying || this.state.imageAppeared) &&
            <div
              ref={this._faceBox}
              className="video-detected-face-box"
              style={{ display: this.state.videoPlaying ? 'block' : 'none' }}
            />
          }
          {
            this.state.imageAppeared &&
            <div className="codes" style={{top: this.state.codesTop}}>
              {
                this.state.codes.map((code, index) => (
                  <a target="_blank" key={index} href={code.rawValue}> {code.rawValue}</a>
                ))
              }
            </div>
          }
          <div ref={this._trash}
               className="trash"
               style={{ visibility: this.state.videoPlaying ? 'hidden' : 'visible' }}
          />
        </div>
      </div>
    );
  }
}

export default FaceDetection;
