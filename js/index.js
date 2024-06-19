var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

var recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'zh-TW';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var button = document.getElementById('button');
button.onclick = function() {
  recognition.start();
  console.log('Listening voice.');
}


recognition.onresult = function(event) {
  //var transcript = event.results[0][0].transcript;
  var transcript = event.results;
  console.log(transcript);
}

recognition.onend = () => {
  console.log('Speech recognition service disconnected');
  restartRecognition(); // Restart the recognition service
};

recognition.onerror = (event) => {
  console.error('Speech recognition error detected:', event.error);
  restartRecognition(); // Restart on error
};

recognition.onerror = (event) => {
  console.error(`Speech recognition error detected: ${event.error}`);
};

const restartRecognition = () => {
  setTimeout(() => {
    recognition.stop();
    recognition.start();
  }, 1000); // Restart after a short delay
};
