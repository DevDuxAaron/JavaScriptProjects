const title = document.querySelector(".title")

let language = null
let read = null

const content = document.querySelector(".content")
const controls = document.querySelector(".controls")
const init = document.getElementById("start")

let text = null

let voice = 0
let allVoices = 1

let synth = window.speechSynthesis;

const removeElements = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

const start = () => {
    removeElements(content)
    text = document.createElement("input")
    text.type = "text"
    text.placeholder = "Write something funny here..."
    text.classList.add("input")

    language = document.createElement("button")
    language.classList.add("btn")

    read = document.createElement("button")
    read.classList.add("btn")
    read.textContent = "Read"

    content.appendChild(text)
    controls.appendChild(language)
    controls.appendChild(read)
}

const readText = (voices) => {
    allVoices = voices.length
    voice = localStorage.getItem('voice');
    let utterThis = new SpeechSynthesisUtterance(text.value);
    utterThis.voice = voices[voice];
    synth.speak(utterThis);
}
const updateLanguage = () => {
    voice = (voice + 1) % allVoices
    localStorage.setItem('voice', voice);
}

document.addEventListener('DOMContentLoaded', () => {
    voice = localStorage.getItem('voice');
    if (voice == null) {
        localStorage.setItem('voice','0');
        voice = localStorage.getItem('voice');
    }
})

document.addEventListener('click', (e) => {
    let voices = synth.getVoices();
    // voices.forEach(voice => console.log(voice))
    if (e.target == init) {
        start()
    } else if (e.target == read) {
        readText(voices)
    } else if (e.target == language) {
        updateLanguage()
    }
    language.textContent = voices[voice].name
})