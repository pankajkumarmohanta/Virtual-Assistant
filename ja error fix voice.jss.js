let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    text_speak.lang = "hi-GB"
    
    // Set a female voice, if available
    let voices = window.speechSynthesis.getVoices()
    let femaleVoice = voices.find(voice => voice.name.includes("Female") || voice.name.includes("Google हिन्दी")) // Modify as needed for your environment
    if (femaleVoice) {
        text_speak.voice = femaleVoice
    }
    
    window.speechSynthesis.speak(text_speak)
}

function wishMe() {
    let day = new Date()
    let hours = day.getHours()
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir")
    }
    else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir")
    }
    else {
        speak("Good Evening Sir")
    }
}

window.addEventListener('load', () => {
    window.speechSynthesis.onvoiceschanged = () => {
        wishMe()
    }
})

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new SpeechRecognition()
recognition.onresult = (event) => {
    wishMe()
    let transcript = event.results[0][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click", () => {
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
})

function takeCommand(message) {
    btn.style.display = "flex"
    voice.style.display = "none"
    
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?")
    }
    else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Pankaj Sir.")
    }
    else if (message.includes("open youtube")) {
        speak("Opening YouTube")
        window.open("https://www.youtube.com/", "_blank")
    }
    else if (message.includes("open google")) {
        speak("Opening Google")
        window.open("https://www.google.com", "_blank")
    }
    else if (message.includes("open calculator")) {
        speak("Opening calculator")
        window.open("calculator://")
    }
    else {
        let finalText = "This is what I found on the internet regarding " + message.replace(/shipra|shifra/gi, "")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace(/shipra|shifra/gi, "")}`, "_blank")
    }
}
