(function(){
    document.addEventListener('DOMContentLoaded', function() {
        const videoElement = document.querySelector("#video");
        const logElement = document.querySelector("#log");
        const audioList = document.querySelector("#audioList");
        const videoList = document.querySelector("#videoList");
        const startButton = document.querySelector("#start");
        const stopButton = document.querySelector("#stop");

        let audioTrack = null;
        let videoTrack = null;

        const constraints = {
            video: {
                width: 160,
                height: 120,
                frameRate: 30
            },
            audio: {
                sampleRate: 44100,
                sampleSize: 16,
                volume: 0.25
            }
        };

        startButton.addEventListener("click", startStream);
        stopButton.addEventListener("click", stopStream);

        navigator.mediaDevices.ondevicechange = handleDeviceChange;

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
        }

        function applyStream(stream) {
            videoElement.srcObject = stream;
            getMediaTracks(stream);
            updateDeviceList();
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

        function updateDeviceList() {
            navigator.mediaDevices.enumerateDevices().then(displayDevices);
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

        function handleDeviceChange(event) {
            console.log('Changed', event);
            updateDeviceList();
        }
    });
})();

