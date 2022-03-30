import os
import random
import webbrowser
import speech_recognition as sr
from time import ctime
import playsound
from gtts import gTTS

r = sr.Recognizer()


def alexa_speak(audio_string):
    tts = gTTS(text=audio_string, lang='en')
    r = random.randint(1, 10000)
    audio_file = 'audio-'+str(r)+'.mp3'
    tts.save(audio_file)
    print(audio_string)
    playsound.playsound(audio_file)
    os.remove(audio_file)


def record_audio(ask=False):
    if ask:
        alexa_speak(ask)
    with sr.Microphone() as source:
        print("Say something")
        audio = r.listen(source)
        voice_data = ''
        try:
            voice_data = r.recognize_google(audio)
        except sr.UnknownValueError:
            alexa_speak("Sorry, your voice could not be recognized")
        except sr.RequestError:
            alexa_speak("The speech service is down")
        return (voice_data)


def respond(voice_data):
    if "hello" in voice_data:
        alexa_speak("Hello!")
        
    if "what is your name" in voice_data:
        alexa_speak("My name is Alexa")

    if 'what time is it' in voice_data:
        alexa_speak(ctime())
        
    if "search" in voice_data:
        search = record_audio("What do you want to search for?")
        url = "https://google.com/search?q=" + search
        webbrowser.get().open(url)
        alexa_speak("I found this for " + search)

    if 'find location' in voice_data:
        location = record_audio("What location do you want to search for?")
        url = "https://google.co.in/maps/place/"  + location + '/&amp;'
        webbrowser.get().open(url)
        alexa_speak("Here is the location of " + location)
        
    if 'exit' in voice_data:
        exit()


voice_data = record_audio()
print(voice_data)
respond(voice_data)
