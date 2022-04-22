import subprocess
import speech_recognition as sr

def convert_and_split(filename):
    command = ['ffmpeg', '-i', filename, '-f', 'segment',
               '-segment_time', '15', './audio/out%09d.wav']
    subprocess.run(command, stdout=subprocess.PIPE, stdin=subprocess.PIPE)


def recognize(fileName):

    convert_and_split(fileName)

    r = sr.Recognizer()

    with sr.WavFile('./audio/out000000000.wav') as source:
        audio = r.record(source)
        try:
            transcript = r.recognize_google(audio)
            return transcript
        except:
            print("Not recognizable")
