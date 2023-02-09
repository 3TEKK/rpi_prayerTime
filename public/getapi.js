// get api for initial data: Jakarta city

var City = document.getElementById('City')
var DateM = document.getElementById('DateM')
var DateH = document.getElementById('DateH')
//
var DateHM = document.getElementById('DateHM')
//
var Fajar = document.getElementById('Fajr')
var Sunrise = document.getElementById('Sunrise')
var Duhur = document.getElementById('Duhur')
var Asar = document.getElementById('Asr')
var Maghrib = document.getElementById('Meghrib')
var Isha = document.getElementById('Isha')

// get API aladhan
city = City.textContent
console.log(city)
var url = `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=Indonesia&method=5`

fetch(url).then(function (response) {
    return response.json();
}).then(function (data) {
    DateM.innerHTML = `${data.data.date.gregorian.day} ${data.data.date.gregorian.month.en} ${data.data.date.gregorian.year}`
    DateH.innerHTML = `${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year}`  
    DateHM.innerHTML  =   `${data.data.date.hijri.month.en} `  
    /*  Fajar.innerHTML = `${data.data.timings.Fajar}`
    Sunrise.innerHTML = `${data.data.timings.Sunrise}`
    Duhur.innerHTML = `${data.data.timings.Dhuhr}`
    Asar.innerHTML = `${data.data.timings.Asr}`
    Maghrib.innerHTML = `${data.data.timings.Maghrib}`
    Isha.innerHTML = `${data.data.timings.Isha}`   */
    console.log(data);
}).catch(function (err) {
    console.warn('Something went wrong.', err);
});