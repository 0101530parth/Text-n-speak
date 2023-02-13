//Init Speech API
const synth =window.speechSynthesis;
//DOM Elements
const textForm =document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//Init voice array
let voices =[];

const getVoices = ()=> {
    voices = synth.getVoices();

    //loop through voices and create ann option for one
    voices.forEach(voice=>{
        //create option element
        const option = document.createElement('option');
        //fill option with voice and lan
        option.textContent = voice.name + '('+ voice.lang + ')';
        //set needed option attributes
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voiceSelect.appendChild(option);
    });

};

getVoices();
//add background animation 

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}
//spaek 
const speak =() => {
    body.style.background = '#141414 url("js\wave.gif")';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%'
    if(synth.speaking) {
  console.error('Already speaking...');
  return;
    }
    if(textInput.value !== ''){
        //get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //speak end
        speakText.onend = e =>{
            console.log('Done speaking...');
                }
            //speak error
            speakText.oneerror = e => {
                console.error('Something went wrong');
            }
            //Selected voice
            const selectedVoice = voiceSelect.selectedOptions[0]
            .getAttribute('data-name');
            //Loop through voices
            voices.forEach(voice => {
                if(voice.name === selectedVoice){
                    speakText.voice = voice;
                }
            });
            //set pitch and rate
            speakText.rate = rate.value;
            speakText.pitch = pitch.value;
            //speak
            synth.speak(speakText);
     
    }
};
//Text form submit
textForm.addEventListener('submit',e=>{
    e.preventDefault();
    speak();
    textInput.blur();
});

//rate value change
rate.addEventListener('change', e => rateValue.textContent =
   rate.value);

   //pitch value change
   pitch.addEventListener('change', e =>pitchValue.textContent = pitch.value);

   //Voice select change  change
voiceSelect.addEventListener('change', e =>speak());

