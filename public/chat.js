// socket io in front end

// Make connection

var socket = io.connect('http://192.168.56.1:1234/')


// var socket = io.connect('http://192.168.43.163:1234') 
// change with your RPi IP address

// Get value from html
var message = document.getElementById('message')
//
var iFajr = document.getElementById('iFajr')
var AFajr = document.getElementById('AFajr')

//var iSunrise = document.getElementById('iSunrise')
var iDuhur = document.getElementById('iDuhur')
var ADuhur = document.getElementById('ADuhur')

var iAsr = document.getElementById('iAsr')
var AAsr = document.getElementById('AAsr')

var iMaghrib = document.getElementById('iMaghrib')
var AMaghrib = document.getElementById('AMaghrib')

var iIsha = document.getElementById('iIsha')
var AIsha = document.getElementById('AIsha')

var iJuma = document.getElementById('iJuma')
var AJuma = document.getElementById('AJuma')

//
var iMesjidName = document.getElementById('iMesjidName')
var ihadithEnglish = document.getElementById('ihadithEnglish')
var ihadithArabic = document.getElementById('ihadithArabic')
var iDCB = document.getElementById('iDCB')

//
var send = document.getElementById('send')
var feedback = document.getElementById('feedback')

// output
var kota = document.getElementById('kota')
var Fajr = document.getElementById('Fajr')
var Sunrise = document.getElementById('Sunrise')
var Duhur = document.getElementById('Duhur')
var Asr = document.getElementById('Asr')
var Sunset = document.getElementById('Sunset')
var Maghrib = document.getElementById('Maghrib')
var Isha = document.getElementById('Isha')
var Juma = document.getElementById('Juma')
var tanggalM = document.getElementById('tanggalM')
var tanggalH = document.getElementById('tanggalH')

//
var mesjidName = document.getElementById('mesjidName')
var hadithEnglish = document.getElementById('hadithEnglish')
var hadithArabic = document.getElementById('hadithArabic')
//Donation counter
var DCB = document.getElementById('DCB')

//To obtain current date:
const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Note that month is zero-indexed, so add 1 and zero-pad to 2 digits
  const day = currentDate.getDate().toString().padStart(2, '0'); // Zero-pad to 2 digits
  const formattedDate = `${year}-${month}-${day}`;
  //console.log(formattedDate); // Output: "2023-03-01"

fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const CurrentDateData = data.filter(item => item.Date === formattedDate);// This function fetches data from the excel sheet)
      if (formattedDate==data[0].Date){
        fromExcel(CurrentDateData);
      }
    })
    

function fromExcel(CurrentDateData) {

      let Prayer = "Prayer - "
      let Azan = "Azan - "
      Fajr.innerHTML = `${Prayer} ${CurrentDateData[0]["Fajr (Prayer)"]}`;
      AFajr.innerHTML = `${Azan} ${CurrentDateData[0]["Fajr (Azan) "]}`;
      Duhur.innerHTML = `${Prayer} ${CurrentDateData[0]["Dhuhr (Prayer)"]}`;
      ADuhur.innerHTML = `${Azan} ${CurrentDateData[0]["Dhuhr (Azan)"]}`;
      Asr.innerHTML = `${Prayer} ${CurrentDateData[0]["Asr (Prayer)"]}`;
      AAsr.innerHTML = `${Azan} ${CurrentDateData[0]["Asr (Azan)"]}`;
      Maghrib.innerHTML = `${Prayer} ${CurrentDateData[0]["Maghrib (Prayer)"]}`;
      AMaghrib.innerHTML = `${Azan} ${CurrentDateData[0]["Maghrib (Azan)"]}`;
      Isha.innerHTML = `${Prayer} ${CurrentDateData[0]["Isha'a (Prayer)"]}`;
      AIsha.innerHTML = `${Azan} ${CurrentDateData[0]["Isha'a (Azan)"]}`;
      Juma.innerHTML = `${Prayer} ${CurrentDateData[0]["Jumm'ah"]}`;
}


function openModal() {
  $("#exampleModalLong").modal();
  setTimeout(function () { $("#exampleModalLong").modal("hide"); }, 5000);
}

// emit button click events
send.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    iFajr: iFajr.value,
    //iSunrise: iSunrise.value,
    iDuhur: iDuhur.value,
    iAsr: iAsr.value,
    iMaghrib: iMaghrib.value,
    iIsha: iIsha.value,
    iJuma: iJuma.value,

    iMesjidName: iMesjidName.value,
    ihadithEnglish: ihadithEnglish.value,
    ihadithArabic: ihadithArabic.value,
    iDCB: iDCB.value,

  })
})

// emit keypress input events: "Lintang is typing..."
message.addEventListener('keypress', () => {
  socket.emit('typing')
})

// listen for events
socket.on('chat', (data) => {
  kota.innerHTML = `${data.message}`
  Fajr.innerHTML = `Prayer ${data.iFajr}`
  //Sunrise.innerHTML = `${data.iSunrise}`
  Duhur.innerHTML = `Prayer ${data.iDuhur}`
  Asr.innerHTML = `Prayer ${data.iAsr}`
  Maghrib.innerHTML = `Prayer ${data.iMaghrib}`
  Isha.innerHTML = `Prayer ${data.iIsha}`
  Juma.innerHTML = `Prayer ${data.iJuma}`


  mesjidName.innerHTML = `${data.iMesjidName}`
  hadithArabic.innerHTML = `${data.ihadithArabic}`
  hadithEnglish.innerHTML = `${data.ihadithEnglish}`
  DCB.innerHTML = `€${data.iDCB}`


  //pop up chec
  var date = new Date()
  var hr = date.getHours()
  var min = date.getMinutes()
  if (`${hr}:${min}` == Fajr.innerHTML.value) {
    openModal()
  }
  console.log(`${hr}:${min}`)

  //end pop up check
  feedback.innerHTML = ''

 // function fromAPI() {
    // get api for incoming city

    var url = `http://api.aladhan.com/v1/timingsByCity?city=${data.message}&country=Indonesia&method=5`

    fetch(url).then(function (response) {
      return response.json();
    }).then(function (data) {
      tanggalM.innerHTML = `${data.data.date.gregorian.day} ${data.data.date.gregorian.month.en} ${data.data.date.gregorian.year}`
      tanggalH.innerHTML = `${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year}`
      AFajr.innerHTML = `Azan ${data.data.timings.Fajr}`
      Sunrise.innerHTML = `${data.data.timings.Sunrise}`
      Sunset.innerHTML = `${data.data.timings.Sunset}`
      ADuhur.innerHTML = `Azan ${data.data.timings.Dhuhr}`
      AAsr.innerHTML = `Azan ${data.data.timings.Asr}`
      AMaghrib.innerHTML = `Azan ${data.data.timings.Maghrib}`
      AIsha.innerHTML = `Azan ${data.data.timings.Isha}`
      console.log(data);
    }).catch(function (err) {
      console.warn('Something went wrong.', err);
    });
 // }



  //py server
  const prayerTimes = [`${data.iFajr}`, `${data.iDuhur}`, `${data.iAsr}`, `${data.iMaghrib}`, `${data.iIsha}`]


  // while (true) {
  function sendPrayerTimes() {
    fetch("http://127.0.0.1:5000/receiver", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(prayerTimes)
    }).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        alert("something is wrong")
      }
    }).then(jsonResponse => {
      // Log the response data in the console
      openModal()
      console.log(jsonResponse)
    }).catch((err) => console.error(err)).finally(() => {
      setTimeout(sendPrayerTimes, 100000); // Send the request again after 5 seconds
    });
  }

  sendPrayerTimes(); // Call the function to start sending requests

  // }
  //end py server
})

socket.on('typing', (data) => {
  feedback.innerHTML = `<i>User is typing...</i>`
})
