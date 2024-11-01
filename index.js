const search_bar = document.querySelector("#search_bar");
const search_bar_error = document.querySelector("#search_bar_error");
const search_button = document.querySelector("#search_button");

const weather_location = document.querySelector("#location");

const forecast_icon = document.querySelector("#forecast_icon");
const forecast_temp = document.querySelector("#forecast_temp");
const forecast_feelslike = document.querySelector("#forecast_feelslike");

const wind_speed = document.querySelector("#wind_speed");
const wind_gust_speed = document.querySelector("#wind_gust_speed");
const wind_dir = document.querySelector("#wind_dir");
const wind_dir_img = document.querySelector("#wind_dir_img");

const day_1 = document.querySelector("#next_1").querySelector("#day");
const day_1_img = document.querySelector("#next_1").querySelector("img");
const day_1_temp = document.querySelector("#next_1").querySelector("#temp");

const day_2 = document.querySelector("#next_2").querySelector("#day");
const day_2_img = document.querySelector("#next_2").querySelector("img");
const day_2_temp = document.querySelector("#next_2").querySelector("#temp");

const day_3 = document.querySelector("#next_3").querySelector("#day");
const day_3_img = document.querySelector("#next_3").querySelector("img");
const day_3_temp = document.querySelector("#next_3").querySelector("#temp");

const day_4 = document.querySelector("#next_4").querySelector("#day");
const day_4_img = document.querySelector("#next_4").querySelector("img");
const day_4_temp = document.querySelector("#next_4").querySelector("#temp");

const day_5 = document.querySelector("#next_5").querySelector("#day");
const day_5_img = document.querySelector("#next_5").querySelector("img");
const day_5_temp = document.querySelector("#next_5").querySelector("#temp");

const humidity_percentage = document.querySelector("#humidity_percentage");
const humidity_visibility = document.querySelector("#humidity_visibility");

const weather_info_container = document.querySelector("#weather_info_container");
const invisible_container = document.querySelector("#invisible_container");

let weather = {};

function setWeatherImage(condition) {
    return `images/${condition}.png`;
}

function convertTemperature(temp, isCelcius, dec) {
    if (!isCelcius) {
        const toCelcius = (temp - 32) * 5 / 9;
        return `${toCelcius.toFixed(dec)}°C`;
    } else {
        const toFahrenheit = (temp * 9 / 5) + 32;
        return `${toFahrenheit.toFixed(dec)}°F`;
    }
}

function getDirection(degrees) {
    console.log(`Degrees: ${degrees}`);
    if (degrees >= 350 && degrees <= 360 || degrees >= 0 && degrees <= 10) {
        return "N";
    } else if (degrees > 10 && degrees < 40) {
        return "N/NE";
    } else if (degrees >= 40 && degrees < 60) {
        return "NE";
    } else if (degrees >= 60 && degrees < 80) {
        return "E/NE";
    } else if (degrees >= 80 && degrees < 110) {
        return "E";
    } else if (degrees >= 110 && degrees < 130) {
        return "E/SE";
    } else if (degrees >= 130 && degrees < 150) {
        return "SE";
    } else if (degrees >= 150 && degrees < 170) {
        return "S/SE";
    } else if (degrees >= 170 && degrees < 200) {
        return "S";
    } else if (degrees >= 200 && degrees < 220) {
        return "S/SW";
    } else if (degrees >= 220 && degrees < 240) {
        return "SW";
    } else if (degrees >= 240 && degrees < 260) {
        return "W/SW";
    } else if (degrees >= 260 && degrees < 290) {
        return "W";
    } else if (degrees >= 290 && degrees < 310) {
        return "W/NW";
    } else if (degrees >= 310 && degrees < 330) {
        return "NW";
    } else if (degrees >= 330 && degrees < 350) {
        return "S/SE";
    }
    console.log("no directions");
}

function convertToDay(date) {
    const dateObj = new Date(date);
    const day = dateObj.getDay();
    console.log(day);
    if (day == 0) {
        return "Sun";
    } else if (day == 1) {
        return "Mon";
    } else if (day == 2) {
        return "Tue";
    } else if (day == 3) {
        return "Wed";
    } else if (day == 4) {
        return "Thu";
    } else if (day == 5) {
        return "Fri";
    } else if (day == 6) {
        console.log("hello");
        return "Sat";
    }
}

function displayDaysData() {

    console.log(weather.days[0].datetime);
    day_1.textContent = convertToDay(weather.days[0].datetime);
    day_1_img.src = setWeatherImage(weather.days[0].icon);
    day_1_temp.textContent = convertTemperature(weather.days[0].temp, false, 0);

    day_2.textContent = convertToDay(weather.days[1].datetime);
    day_2_img.src = setWeatherImage(weather.days[1].icon);
    day_2_temp.textContent = convertTemperature(weather.days[1].temp, false, 0);

    day_3.textContent = convertToDay(weather.days[2].datetime);
    day_3_img.src = setWeatherImage(weather.days[2].icon);
    day_3_temp.textContent = convertTemperature(weather.days[2].temp, false, 0);

    day_4.textContent = convertToDay(weather.days[3].datetime);
    day_4_img.src = setWeatherImage(weather.days[3].icon);
    day_4_temp.textContent = convertTemperature(weather.days[3].temp, false, 0);

    day_5.textContent = convertToDay(weather.days[4].datetime);
    day_5_img.src = setWeatherImage(weather.days[4].icon);
    day_5_temp.textContent = convertTemperature(weather.days[4].temp, false, 0);
    // day_2.textContent = convertToDay(weather.days[1].datettime);
    // day_3.textContent = convertToDay(weather.days[2].datettime);
    // day_4.textContent = convertToDay(weather.days[3].datettime);
    // day_5.textContent = convertToDay(weather.days[4].datettime);
}

function handleError(err) {
    console.log('Ohhhh nooo');
    console.log(err);
}

async function getWeatherData(input) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?key=KTWLZE4A3AXSXE9H4ECPU5QA7`, { mode: "cors" })

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const weatherData = await response.json();



    invisible_container.remove();

    weather_info_container.setAttribute("style", "display: flex;");
    //weather = JSON.parse(`{"resolvedAddress":${weatherData.resolvedAddress}, "conditions": ${weatherData.currentConditions.condition}, "temp": ${weatherData.currentConditions.temp}, "feelslike": ${weatherData.currentConditions.feelslike}, "windspeed": ${weatherData.currentConditions.windspeed}, "windgust": ${weatherData.currentConditions.windgust}, "winddir": ${weatherData.currentConditions.winddir}}`)
    console.log(weatherData);

    weather = JSON.parse(JSON.stringify({ "resolvedAddress": weatherData.resolvedAddress, "conditions": weatherData.currentConditions.conditions, "icon": weatherData.currentConditions.icon, "temp": weatherData.currentConditions.temp, "feelslike": weatherData.currentConditions.feelslike, "windspeed": weatherData.currentConditions.windspeed, "windgust": weatherData.currentConditions.windgust, "winddir": weatherData.currentConditions.winddir, "humidity": weatherData.currentConditions.humidity, "visibility": weatherData.currentConditions.visibility, "days": [{ "datetime": weatherData.days[1].datetime, "conditions": weatherData.days[1].conditions, "icon": weatherData.days[1].icon, "temp": weatherData.days[1].temp }, { "datetime": weatherData.days[2].datetime, "conditions": weatherData.days[2].conditions, "icon": weatherData.days[2].icon, "temp": weatherData.days[2].temp }, { "datetime": weatherData.days[3].datetime, "conditions": weatherData.days[3].conditions, "icon": weatherData.days[3].icon, "temp": weatherData.days[3].temp }, { "datetime": weatherData.days[4].datetime, "conditions": weatherData.days[4].conditions, "icon": weatherData.days[4].icon, "temp": weatherData.days[4].temp }, { "datetime": weatherData.days[5].datetime, "conditions": weatherData.days[5].conditions, "icon": weatherData.days[5].icon, "temp": weatherData.days[5].temp }] }));
    console.log(weather.days);

    delete weatherData;
    weather_location.textContent = weather.resolvedAddress;

    forecast_icon.src = setWeatherImage(weather.icon);
    forecast_temp.textContent = convertTemperature(weather.temp, false, 1);
    forecast_feelslike.innerHTML = `Feels like&nbsp;<span>${convertTemperature(weather.feelslike, false, 1)}</span>`;

    wind_speed.textContent = `${weather.windspeed} mph`;
    wind_gust_speed.textContent = `${weather.windgust} mph`;
    wind_dir.textContent = getDirection(weather.winddir);
    wind_dir_img.setAttribute("style", `transform: rotate(${weather.winddir}deg)`);

    humidity_percentage.textContent = `${weather.humidity}%`;
    humidity_visibility.textContent = `VIS: ${weather.visibility} miles`;



    displayDaysData();
}

search_button.addEventListener("click", () => {
    console.log("clicked");
    console.log(search_bar.value);
    if (search_bar.value.length !== 0) {
        const promise = getWeatherData(search_bar.value);
        promise.then(() => {
            if (search_bar_error.textContent !== "") {
                search_bar_error.textContent = "";
            }
        })
        promise.catch((error) => {
            console.error(`Please enter a valid place: ${error}`);
            search_bar_error.textContent = `Please enter a valid place: ${error}`;
        });
    } else {
        search_bar_error.textContent = "Please enter a place.";
    }
})