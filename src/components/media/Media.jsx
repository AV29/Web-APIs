import React, {Component} from 'react';
import routesConfiguration from '../../routing/routesConfiguration'
import './Media.less';

const {media} = routesConfiguration;

class Media extends Component {

  componentDidMount() {
    const videoElement = document.querySelector("#video");
    const audioElement = document.querySelector("#audio");
    const logElement = document.querySelector("#log");
    const audioList = document.querySelector("#audioList");
    const videoList = document.querySelector("#videoList");
    const startButton = document.querySelector("#start");
    const enumerateButton = document.querySelector("#enumerate");
    const stopButton = document.querySelector("#stop");
    const canvas = document.getElementById('canvas');
    const takePicture = document.getElementById('takePicture');

    let audioTrack = null;
    let videoTrack = null;
    let streaming = false;
    let width = 320;    // We will scale the photo width to this
    let height = 0;

    const constraints = {
      echoCancellation: true,
      video: {
        width: 160,
        height: 120,
        frameRate: 30
      },
      audio: false /*{
        sampleRate: 44100,
        sampleSize: 16,
        volume: 0.25
      }*/
    };

    enumerateButton.addEventListener('click', enumerateDevices);
    startButton.addEventListener("click", startStream);
    stopButton.addEventListener("click", stopStream);
    takePicture.addEventListener('click', function (ev) {
      takepicture();
      ev.preventDefault();
    }, false);


    function enumerateDevices() {
      navigator.mediaDevices.ondevicechange = handleDeviceChange;
    }

    function handleDeviceChange(event) {
      console.log('Changed', event);
      navigator.mediaDevices.enumerateDevices().then(displayDevices);
    }

    function startStream() {
      navigator.mediaDevices.getUserMedia(constraints)
        .then(applyStream)
        .catch(({name, message}) => log(`${name}: ${message}`));
    }

    function stopStream() {
      if (videoTrack) {
        videoTrack.stop();
      }
      if (audioTrack) {
        audioTrack.stop();
      }

      videoTrack = audioTrack = null;
      videoElement.srcObject = null;
      audioElement.srcObject = null;
    }

    function applyStream(stream) {
      videoElement.srcObject = stream;
      audioElement.srcObject = stream;
      getMediaTracks(stream);
    }

    function getMediaTracks(stream) {

      const audioTracks = stream.getAudioTracks();
      const videoTracks = stream.getVideoTracks();

      if (audioTracks.length) {
        audioTrack = audioTracks[0];
      }
      if (videoTracks.length) {
        videoTrack = videoTracks[0];
      }
    }

    function log(msg) {
      logElement.innerHTML += `<p>${msg}</p>`;
    }

    function displayDevices(devices) {
      console.log('Start');
      audioList.innerHTML = "";
      videoList.innerHTML = "";

      devices.forEach(function (device) {
        const elem = document.createElement("li");
        const [kind, type, direction] = device.kind.match(/(\w+)(input|output)/i);

        elem.innerHTML = `<strong>${device.label}</strong>(${direction})`;
        if (type === "audio") {
          audioList.appendChild(elem);
        } else if (type === "video") {
          videoList.appendChild(elem);
        }
      });
    }

    function takepicture() {
      const context = canvas.getContext('2d');
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
      }
    }

    video.addEventListener('canplay', () => {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);
        streaming = true;
      }
    }, false);
  }

  render() {
    return (
      <div className="pageWrapper mediaWrapper">
        <h3 className="pageIdentificator">{media.title}</h3>
        <h2>{media.title}</h2>
        <div className="controls">
          <button id="start">Start Stream</button>
          <button id="enumerate">Get Devices</button>
        </div>
        <video id="video" width="160" height="120" autoPlay/>
        {/*<audio id="audio" controls autoPlay/>*/}
        <div className="controls">
          <button id="stop">Stop Stream</button>
          <button id="takePicture">Take photo</button>
        </div>
        <canvas id="canvas">
        </canvas>
        <div className="devicesInfo">
          <div className="deviceList">
            <p>AudioList</p>
            <ul id="audioList"/>
          </div>
          <div className="deviceList">
            <p>VideoList</p>
            <ul id="videoList"/>
          </div>
        </div>
        <div id="log"/>
        <ul id="tracks"/>
      </div>
    );
  }
}

export default Media;
