async function getWeather(){ 
    let city = document.getElementById("searchCity").value;
    let state = document.getElementById("searchState").value;
    let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},US&units=imperial&appid=24411d29be6cf60408be9637d4700443`);
    let weatherInfo = await result.json();
    let currentTemp = parseInt(weatherInfo.main.temp)
    let high = parseInt(weatherInfo.main.temp_max)
    let low = parseInt(weatherInfo.main.temp_min)
    let windspeed = parseInt(weatherInfo.wind.speed)
    let feelsLike = parseInt(weatherInfo.main.feels_like)
    let humidity = parseInt(weatherInfo.main.humidity)
    document.getElementById('currTemp').innerHTML = "Temp: <br>" + currentTemp + "&deg"
    document.getElementById('highLow').innerHTML = "High/Low:  " + high + "&deg/" + low + "&deg"
    document.getElementById('wind').innerHTML = "Wind: " + "<br>" + windspeed + " mph"
    document.getElementById('feelsLike').innerHTML = "Feels Like: <br>" + feelsLike + "&deg"
    document.getElementById('humidity').innerHTML = "Humidity: <br>" + humidity

    console.log(weatherInfo);
    return 
}

// Iterate through this for the next 24 hours
async function getForecast(){
    let city = document.getElementById("searchCity").value;
    let state = document.getElementById("searchState").value;
    let resultForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},US&units=imperial&appid=24411d29be6cf60408be9637d4700443`);
    let forecastInfo = await resultForecast.json();
    let fcDay = []
    let fcTime = []
    let fcTemp = []
    for(let i = 0; i < 7; i++){
        let hourlyForecast = forecastInfo.list[i].dt_txt;
        var day = hourlyForecast.split(' ')[0].split('-')
        var time = hourlyForecast.split(' ')[1]
        var format_date = new Date(parseInt(day[0]), (parseInt(day[1])-1), parseInt(day[2]))
        var just_day = String(format_date).split(' ')[0]
        time = time.split(':');
        var hours = Number(time[0]);
        var timeValue;
        if (hours > 0 && hours <= 12) {
        timeValue= "" + hours;
        } else if (hours > 12) {
        timeValue= "" + (hours - 12);
        } else if (hours == 0) {
        timeValue= "12";
        }
        timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM
        let hourlyTemp = parseInt(forecastInfo.list[i].main.temp);
        fcDay.push(just_day);
        fcTime.push(timeValue);
        fcTemp.push(hourlyTemp)
    }
    console.log(fcTime)
    console.log(forecastInfo)

    document.getElementById("forecastHeader").getElementsByTagName("h3")[0].innerHTML = "Short-Term Forecast"

    for(let i=0; i<7; i++){
        document.getElementById(`forecast${i+1}`).getElementsByClassName('fcTime')[0].innerHTML = fcTime[i]
        document.getElementById(`forecast${i+1}`).getElementsByClassName('fcTemp')[0].innerHTML = fcTemp[i] + "&deg"
        document.getElementById(`forecast${i+1}`).getElementsByClassName('fcDay')[0].innerHTML = fcDay[i] + "<br><br>"
    }
}

// USING ENTER KEY TO "CLICK" THE GET WEATHER BUTTON - DOESN'T WORK AS IS
// var inputSc = document.getElementById("searchCity");
// inputSc.addEventListener("keyup", function(event) {
//   if (KeyboardEvent.keyCode === 13) {
//    event.preventDefault();
//    document.getElementById("getWeather").click();
//   } 
// });

// GENERATING HTML DIVS AND SUB-DIVS WITH FOR LOOPS IN JAVASCRIPT
    // I thought I would use this to produce the forecasts, but I realized it's hard to 
    // adjust HTML content that only exists when you generate an example. Plus, it's a 
    // lot more complicated than having the divs in place in the html and iterating through
    // by numbered IDs (forecast1, forecast2, etc.) The code below would be useful when you 
    // want to generate more divs than would be practical to have living in the HTML file.

    // var toAdd = document.createDocumentFragment();
    // for(i=0; i < 8; i++){
    //     let forecastDiv = document.createElement('div');
    //     forecastDiv.id = 'forecast'+i;
    //     toAdd.appendChild(forecastDiv);
    // document.getElementById('forecastHeader').appendChild(toAdd);}

    // var toAdd2 = document.createDocumentFragment();
    // for(i=0; i < 8; i++){
    //     let timeDiv = document.createElement('div');
    //     timeDiv.id = 'fcTime'+j;
    //     toAdd.appendChild(timeDiv);}
    // }