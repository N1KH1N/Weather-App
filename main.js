const app=document.querySelector('.weather-app')
const temp=document.querySelector('.temp')
const dateoutput=document.querySelector('.date')
const timeoutput=document.querySelector('.time')
const conditionoutput=document.querySelector('.condition')
const nameoutput=document.querySelector('.name')
const icon=document.querySelector('.icon')
const cloudoutput=document.querySelector('.cloud')
const humidityoutput=document.querySelector('.humidity')
const windoutput=document.querySelector('.wind')
const Form=document.getElementById('locationinput')
const search=document.querySelector('.search')
const btn=document.querySelector('.submit')
const cities=document.querySelectorAll('.city')

let cityInput="London";
cities.forEach((city)=>{city.addEventListener('click',(e)=>{
    cityInput=e.target.innerHTML;
    fetchWeatherData();
    app.style.opacity="1";
});
})
Form.addEventListener('submit',(e)=>{
    if(search.value.length==0){
        alert('Please Enter Any City Name:')
    }else{
        cityInput=search.value;
        fetchWeatherData();
        search.value="";
        app.style.opacity="1";
    }
    e.preventDefault();
});



function dayOfTheWeek(day,month,year){
    const Weekday=[
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
    ];
    return Weekday[new Date(`${day}/&{month}/&{year}`).getDay()]
};

function fetchWeatherData(){
    fetch(`http://api.weatherapi.com/v1/current.json?key=5dfd078dfcfb4fd4b22130407232104&q=${cityInput}`)
    // fetch(`https://api.openweathermap.org/data/2.5/weather?appid=8f9164d0bb1a347b51a7d0e25e247b6c&q=${cityInput}&units=metric`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        temp.innerHTML=data.current.temp_c+"&#176;";
        conditionoutput.innerHTML=data.current.condition.text;

        const date=data.location.localtime;
        const y=parseInt(date.substr(0,4));
        const m=parseInt(date.substr(5,2));
        const d=parseInt(date.substr(8,2));
        const time=date.substr(11);

        dateoutput.innerHTML=`${dayOfTheWeek(d,m,y)} ${d},${m},${y}`
        timeoutput.innerHTML=time;
        nameoutput.innerHTML=data.location.name;

        const iconId=data.current.condition.icon.substr("//cdn.weather/64*64/".length);
        icon.src="./icons/"+iconId;

        cloudoutput.innerHTML=data.current.cloud+"%";
        humidityoutput.innerHTML=data.current.humidity+"%";
        windoutput.innerHTML=data.current.wind_kph+"km/hr";


        let timeofDay="day";
        const code=data.current.condition.code;
        if(!data.current.is_day){
            timeofDay="night";
        }
if (code==1000){
    app.style.background=`url(./images/${timeofDay}/clear.jpg)`
    btn.style.background="e5ba92";
    if(timeofDay=="night"){
        btn.style.background="#181e27";
    }
}
else if(code==1003||
    code==1006||
    code==1009||
    code==1030||
    code==1069||
    code==1087||
    code==1135||
    code==1273||
    code==1276||
    code==1279||
    code==1282){
        app.style.backgroundImage=`url(./images/${timeofDay}/cloudy.jpg)`;
        btn.style.background="#fa6d1b";
        if(timeofDay=="night"){btn.style.background="#181e27";}
    }
else if(
    code==1063||
    code==1069||
    code==1072||
    code==1150||
    code==1153||
    code==1180||
    code==1183||
    code==1186||
    code==1189||
    code==1195||
    code==1204||
    code==1207||
    code==1240||
    code==1243||
    code==1246||
    code==1249||
    code==1252
){
    app.style.backgroundImage=`url(./images/${timeofDay}/rainy.jpg)`;
    btn.style.background="#647d75";
    if(timeofDay=="night"){
        btn.style.background="#325c280";
    }}
else{
    app.style.backgroundImage=`url(./images/${timeofDay}/snowy.jpg)`
    btn.style.background="#4d72aa";
    if(timeofDay=="night"){
        btn.style.background="#1b1b1b";
    }}
})
.catch(()=>{
    alert('City Not Found,Please Try Again');
    app.style.opacity="1";
});
}

fetchWeatherData();
app.style.opacity="1";