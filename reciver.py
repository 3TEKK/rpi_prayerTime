from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import datetime
import requests
import time as delay
from pygame import mixer, time
from datetime import datetime

# load azan.mp3
mixer.init()
# mixer.music.load('C:/Users/HP/Downloads/RasPi_Ramadhan_INDONESIA/azan.mp3')
mixer.music.load('/home/ahmed/Desktop/Git/rpi_prayerTime/azan.mp3')

Fajr = ""
Duhur = ""
Asr = ""
Meghrib = ""
Isha = ""



#<strong>#Set up Flask</strong>:
app = Flask(__name__)
#<strong>#Set up Flask to bypass CORS</strong>:
cors = CORS(app)

#<strong>#Create the receiver API POST endpoint</strong>:
@app.route("/receiver", methods=["POST"])
def postME():
    data = request.get_json()
    check(data)
    data = jsonify(data)
    return data 

def check(data):
    global Fajr 
    Fajr= data
    currentDateAndTime = datetime.now()
    currentTime = currentDateAndTime.strftime("%H:%M")
    while True:
        currentDateAndTime = datetime.now()
        currentTime = currentDateAndTime.strftime("%H:%M")
        
        if (Fajr == currentTime):
            #y = data+ x
            #print(Fajr)
            mixer.music.play()
        #print(Fajr)



if __name__ == "__main__": 
    app.run(debug=True)



    