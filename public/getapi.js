// get api for initial data: Jakarta city

var kota = document.getElementById('kota')
var tanggalM = document.getElementById('tanggalM')
var tanggalH = document.getElementById('tanggalH')
var subuh = document.getElementById('subuh')
var sunrise = document.getElementById('sunrise')
var dzuhur = document.getElementById('dzuhur')
var asar = document.getElementById('asar')
var sunset = document.getElementById('sunset')
var magrib = document.getElementById('magrib')
var isya = document.getElementById('isya')

// get API aladhan
city = kota.textContent
console.log(city)
var url = `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=Finalnd&method=2`

fetch(url).then(function (response) {
    return response.json();
}).then(function (data) {
    tanggalM.innerHTML = `${data.data.date.gregorian.day} ${data.data.date.gregorian.month.en} ${data.data.date.gregorian.year}`
    tanggalH.innerHTML = `${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year}`    
    subuh.innerHTML = `${data.data.timings.Fajr}`
    sunrise.innerHTML = `${data.data.timings.Sunrise}`
    dzuhur.innerHTML = `${data.data.timings.Dhuhr}`
    asar.innerHTML = `${data.data.timings.Asr}`
    sunset.innerHTML = `${data.data.timings.Sunset}`
    magrib.innerHTML = `${data.data.timings.Maghrib}`
    isya.innerHTML = `${data.data.timings.Isha}`
    console.log(data);
}).catch(function (err) {
    console.warn('Something went wrong.', err);
});
