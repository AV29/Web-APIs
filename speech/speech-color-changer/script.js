const colors = ['aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;';
const recognition = new webkitSpeechRecognition();
const speechRecognitionList = new webkitSpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 5;

const diagnostic = document.querySelector('.output');
const bg = document.querySelector('html');

function stopRecognition() {
    recognition.stop();
    console.log('Stopped recognition.');
}

const getColors = () => colors.reduce((acc, color) => `${acc}<span class="color" style="background-color:${color};">${color}</span>`, '');

document.querySelector('.palette').innerHTML = getColors();

function startRecognition() {
    recognition.start();
    console.log('Ready to receive a color command.');
}

document.querySelector('#start').addEventListener('click', startRecognition);
document.querySelector('#stop').addEventListener('click', stopRecognition);

recognition.onresult = function (event) {
    const result = event.results[0][0].transcript;
    console.log(event.results);
    diagnostic.innerHTML = `<p>Result received</p><p><strong>${result.toUpperCase()}</strong></p>`;
    bg.style.backgroundColor = result.toLowerCase();
    stopRecognition();
};