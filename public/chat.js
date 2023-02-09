// socket io in front end

// Make connection
var socket = io.connect('http://192.168.165.65:2443/')
// var socket = io.connect('http://192.168.43.163:1234') 
// change with your RPi IP address

// Get value from html
var message = document.getElementById('message')
//
var F = document.getElementById('Fajr')
var S = document.getElementById('Sunrise')
var D = document.getElementById('Duhur')
var A = document.getElementById('Asr')
var M = document.getElementById('Maghrib')
var I = document.getElementById('Isha')
//
var send = document.getElementById('send')
var feedback = document.getElementById('feedback')

// output
var City = document.getElementById('City')
var DateM = document.getElementById('DateM')
var DateH = document.getElementById('DateH')
//
var DateHM = document.getElementById('DateHM')
//
/*
var Fajr = document.getElementById('Fajr')
var Sunrise = document.getElementById('Sunrise')
var Duhur = document.getElementById('Duhur')
var Asr = document.getElementById('Asr')
var Maghrib = document.getElementById('Maghrib')
var Isha = document.getElementById('Isha')
*/

// emit button click events
send.addEventListener('click', ()=>{
    socket.emit('chat', {
        message: message.value,
        F: F.value,
        S: S.value,
        D: D.value,
        A: A.value,
        M: M.value,
        I: I.value,
    })
})

// emit keypress input events: "Lintang is typing..."
message.addEventListener('keypress', ()=>{
    socket.emit('typing')
})

// listen for events
socket.on('chat', (data)=>{
    City.innerHTML = `${data.message}`

    Fajr.innerHTML = `${data.F}`
    feedback.innerHTML = ''

    

    // get api for incoming city
    var url = `http://api.aladhan.com/v1/timingsByCity?city=${data.message}&country=Indonesia&method=5`

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        DateM.innerHTML = `${data.data.date.gregorian.day} ${data.data.date.gregorian.month.en} ${data.data.date.gregorian.year}`
        DateH.innerHTML = `${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year}`  
        DateHM.innerHTML  =   `${data.data.date.hijri.month.en} `
        /*   Fajar.innerHTML = `${data.data.timings.Fajr}`
        Sunrise.innerHTML = `${data.data.timings.Sunrise}`
        Duhur.innerHTML = `${data.data.timings.Dhuhr}`
        Asar.innerHTML = `${data.data.timings.Asr}`
        Maghrib.innerHTML = `${data.data.timings.Maghrib}`
        Isha.innerHTML = `${data.data.timings.Isha}`   */
        console.log(data);
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    });
    

    
})

socket.on('typing', (data)=>{
    feedback.innerHTML = `<i>User is typing...</i>`
})
