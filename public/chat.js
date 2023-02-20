// socket io in front end

// Make connection
var socket = io.connect('http://192.168.114.65:1234/')
// var socket = io.connect('http://192.168.43.163:1234') 
// change with your RPi IP address

// Get value from html
var message = document.getElementById('message')
//
var iFajr = document.getElementById('iFajr')
//var iSunrise = document.getElementById('iSunrise')
var iDuhur = document.getElementById('iDuhur')
var iAsr = document.getElementById('iAsr')
var iMaghrib = document.getElementById('iMaghrib')
var iIsha = document.getElementById('iIsha')

//
var iMesjidName = document.getElementById('iMesjidName')
var ihadithEnglish = document.getElementById('ihadithEnglish')
var ihadithArabic = document.getElementById('ihadithArabic')
//
var send = document.getElementById('send')
var feedback = document.getElementById('feedback')

// output
var kota = document.getElementById('kota')
var Fajr = document.getElementById('Fajr')
var Sunrise = document.getElementById('Sunrise')
var Duhur = document.getElementById('Duhur')
var Asr = document.getElementById('Asr')
var Magrib = document.getElementById('Magrib')
var Isha = document.getElementById('Isha')
var tanggalM = document.getElementById('tanggalM')
var tanggalH = document.getElementById('tanggalH')

//
var mesjidName = document.getElementById('mesjidName')
var hadithEnglish = document.getElementById('hadithEnglish')
var hadithArabic = document.getElementById('hadithArabic')




function openModal(){
    $("#exampleModalLong").modal();
    setTimeout(function(){ $("#exampleModalLong").modal("hide"); }, 5000);
}

// emit button click events
send.addEventListener('click', ()=>{
    socket.emit('chat', {
        message: message.value,
        iFajr: iFajr.value,
        //iSunrise: iSunrise.value,
        iDuhur: iDuhur.value,
        iAsr: iAsr.value,
        iMaghrib: iMaghrib.value,
        iIsha: iIsha.value,

        iMesjidName: iMesjidName.value,
        ihadithEnglish:ihadithEnglish.value,
        ihadithArabic: ihadithArabic.value,
    })
})

// emit keypress input events: "Lintang is typing..."
message.addEventListener('keypress', ()=>{
    socket.emit('typing')
})

// listen for events
socket.on('chat', (data)=>{
    kota.innerHTML = `${data.message}`
    Fajr.innerHTML = `${data.iFajr}`
    //
    //Sunrise.innerHTML = `${data.iSunrise}`
    Duhur.innerHTML = `${data.iDuhur}`
    Asr.innerHTML = `${data.iAsr}`
    Maghrib.innerHTML = `${data.iMaghrib}`
    Isha.innerHTML = `${data.iIsha}`

    mesjidName.innerHTML = `${data.iMesjidName}`
    hadithArabic.innerHTML = `${data.ihadithArabic}`
    hadithEnglish.innerHTML = `${data.ihadithEnglish}`

    feedback.innerHTML = ''

    // get api for incoming city
    var url = `http://api.aladhan.com/v1/timingsByCity?city=${data.message}&country=Indonesia&method=5`

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        tanggalM.innerHTML = `${data.data.date.gregorian.day} ${data.data.date.gregorian.month.en} ${data.data.date.gregorian.year}`
        tanggalH.innerHTML = `${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year}`        
        //subuh.innerHTML = `${data.data.timings.Fajr}`
        Sunrise.innerHTML = `${data.data.timings.Sunrise}`
        //dzuhur.innerHTML = `${data.data.timings.Dhuhr}`
        // asar.innerHTML = `${data.data.timings.Asr}`
        // magrib.innerHTML = `${data.data.timings.Maghrib}`
        // isya.innerHTML = `${data.data.timings.Isha}`
        console.log(data);
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    });
})

socket.on('typing', (data)=>{
    feedback.innerHTML = `<i>User is typing...</i>`
})
