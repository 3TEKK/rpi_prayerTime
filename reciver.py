from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import datetime
import requests
import time 
from pygame import mixer, time
from datetime import datetime
import threading

# load azan.mp3
mixer.init()
# mixer.music.load('C:/Users/HP/Downloads/RasPi_Ramadhan_INDONESIA/azan.mp3')
mixer.music.load('C:/Users/azeem/OneDrive/Desktop/Git/rpi_prayerTime/azan.mp3')

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
    res = check(data)
    check_thread = threading.Thread(target=check, args=(data,))
    check_thread.start()
    data = jsonify(res)
    return data 

def check(data):
    global Fajr,Duhur,Asr,Meghrib,Isha
    Fajr,Duhur,Asr,Meghrib,Isha = data
    currentDateAndTime = datetime.now()
    currentTime = currentDateAndTime.strftime("%H:%M")
    while True:
        currentDateAndTime = datetime.now()
        currentTime = currentDateAndTime.strftime("%H:%M")
        
        if Fajr == currentTime or Duhur == currentTime or Asr == currentTime or Meghrib == currentTime or Isha == currentTime:
            mixer.music.play()
            return Temp1()
        else:
            return Temp2 ()      
            
            #y x= data+ x
            #print(Fajr)
            
            # enable threading to loop for next round checkup
            #thread = threading.Thread(target=check(), args=(data,))
            #thread.start()
            #return data


def Temp1():
    Temp = '23'
    return Temp


def Temp2():
    Temp = "Temperature: 23 "
    return Temp

if __name__ == "__main__": 
    app.run(debug=True)



    