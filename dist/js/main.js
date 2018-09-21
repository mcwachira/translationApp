const synth = window.speechSynthesis;

//Dom Elements

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body")

//iNITIALIZE VOICES ARRAY


let voices = [];


const getVoices = () => {
    voices = synth.getVoices();

    //LOOP THROUGH THE VOICES

    voices.forEach(voice => {
        const option = document.createElement("option");

        //fill option with voice name and language
        option.textContent = voice.name + "(" + voice.lang + ")";

        //Set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);

    })
};


getVoices();

if (synth.onvoiceschanged != undefined) {
    synth.onvoiceschanged = getVoices;
}


//Speak

const speak = () => {
    //check if speaking

    if (synth.speaking) {
        console.error("Already speaking");
        return;
    }
    if (textInput.value !== '') {

        //background animation

        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        //get speach text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        //Speak 
        speakText.onend = e => {
            console.log("done speaking ..")
            body.style.background = '#141414';
        }

        speakText.onerror = e => {
            console.error("something went wrong");
        }


        // Select voices
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");

        //Loop through the voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }

        });

        //Set pitch and Rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;


        //Speak

        synth.speak(speakText);
    }
};



//Event Listners
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

//RATE VALUE CHANGE

rate.addEventListener("change", e => rateValue.textContent = rate.value);
pitch.addEventListener("change", e => pitchValue.textContent = pitch.value);

//Voice select

voiceSelect.addEventListener("change", e => speak());