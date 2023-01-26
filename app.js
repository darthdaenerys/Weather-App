const iconElement=document.querySelector('.weather-icon');
const tempElement=document.querySelector('.temperature-value p');
const descElement=document.querySelector('.weather-description p');
const locationElement=document.querySelector('.location p');
const notificationElement=document.querySelector('.notification');

tempElement.addEventListener("click",changenotation)
function changenotation(){
    if(weather.temperature.value===undefined) return;
    if(weather.temperature.unit==='C'){
        let fahrenheit=celsiustofahrenheit(weather.temperature.value);
        weather.temperature.unit='F';
        tempElement.innerHTML=`<p>${fahrenheit}°<span>F</span></p>`;
    }
    else{
        weather.temperature.unit='C';
        tempElement.innerHTML=`<p>${weather.temperature.value}°<span>C</span></p>`;
    }
}
function celsiustofahrenheit(celsius){
    return Math.floor(celsius*9/5+32);
}
const weather={
    temperature:{
        'unit':'C',
        'value':NaN
    },
    location:{
        'city':NaN,
        'country':NaN
    },
    'description':NaN,
    'icon':NaN
};
const KELVIN=273;
const api='82005d27a116c2880c8f0fcb866998a0';
if('geolocation' in window.navigator){
    window.navigator.geolocation.getCurrentPosition(setPosition,showError);
}
else{
    notificationElement.style.display='block';
    notificationElement.innerHTML='<p>Browser dosen\'t support Geolocation</p>';
}

function setPosition(position){
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;
    getWeather(latitude,longitude);
}
function showError(error){
    notificationElement.style.display='block';
    notificationElement.innerHTML=`<p>${error.message}</p>`;
}

function getWeather(latitude,longitude){
    let key=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api}`;
    fetch(key)
        .then(
            function(response){
                return response.json();
            }
        )
        .then(
            function(data){
                weather.temperature.value=Math.floor(data.main.temp-KELVIN);
                weather.location.city=data.name;
                weather.location.country=data.sys.country;
                weather.description=data.weather[0].description;
                weather.icon=data.weather[0].icon;
            }
        )
        .then(
            function(){
                displayWeather();
            }
        )
}
function displayWeather(){
    iconElement.innerHTML=`<img src="icons/${weather.icon}.png" alt="${weather.description}">`;
    tempElement.innerHTML=`${weather.temperature.value}°<span>${weather.temperature.unit}</span>`;
    descElement.innerHTML=`${weather.description}`;
    locationElement.innerHTML=`${weather.location.city}, ${weather.location.country}`;
}