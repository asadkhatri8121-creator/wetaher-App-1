/*=========================================
   SKYCAST PRO ULTRA 2026
   PART 3.1.1
   API • DOM • LOADER • WEATHER FETCH
=========================================*/

// =========================
// API CONFIG
// =========================

const API_KEY = "2190d4059cdc449c88e73303261507";

const BASE_URL =
"https://api.weatherapi.com/v1/forecast.json";

// =========================
// DOM ELEMENTS
// =========================

const searchInput =
document.getElementById("searchInput");

const searchBtn =
document.getElementById("searchBtn");

const locationBtn =
document.getElementById("locationBtn");

const loader =
document.getElementById("loader");

const city =
document.getElementById("city");

const country =
document.getElementById("country");

const condition =
document.getElementById("condition");

const temp =
document.getElementById("temp");

const feelsLike =
document.getElementById("feelsLike");

const weatherIcon =
document.getElementById("weatherIcon");

const humidity =
document.getElementById("humidity");

const wind =
document.getElementById("wind");

const pressure =
document.getElementById("pressure");

const visibility =
document.getElementById("visibility");

const uv =
document.getElementById("uv");

const aqi =
document.getElementById("aqi");

const sunrise =
document.getElementById("sunrise");

const sunset =
document.getElementById("sunset");

const greeting =
document.getElementById("greeting");

const liveClock =
document.getElementById("liveClock");

const date =
document.getElementById("date");

const hourlyContainer =
document.getElementById("hourlyContainer");

const weeklyContainer =
document.getElementById("weeklyContainer");

// =========================
// GLOBAL VARIABLES
// =========================

let weatherData = null;

let currentUnit = "C";

let clockInterval = null;

// =========================
// LOADER
// =========================

function showLoader(){

    if(loader){

        loader.style.display="flex";

    }

}

function hideLoader(){

    if(loader){

        loader.style.display="none";

    }

}

// =========================
// GET WEATHER
// =========================

async function getWeather(query){

    showLoader();

    try{

        const response = await fetch(

            `${BASE_URL}?key=${API_KEY}&q=${query}&days=7&aqi=yes&alerts=yes`

        );

        if(!response.ok){

            throw new Error("Network Error");

        }

        const data = await response.json();

        if(data.error){

            throw new Error(data.error.message);

        }

        weatherData = data;

        // Next Part
        refreshUI(data);

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

    finally{

        hideLoader();

    }

}

console.log("✅ Part 3.1.1 Loaded");
/*=========================================
   SKYCAST PRO ULTRA 2026
   PART 3.1.2
   SEARCH • LOCATION • LOCAL STORAGE
=========================================*/

// =========================
// SEARCH WEATHER
// =========================

function searchWeather(){

    const cityName = searchInput.value.trim();

    if(cityName===""){

        alert("Please enter a city name.");

        return;

    }

    saveLastCity(cityName);

    getWeather(cityName);

}

// =========================
// SEARCH BUTTON
// =========================

searchBtn.addEventListener("click",searchWeather);

// =========================
// ENTER KEY
// =========================

searchInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        searchWeather();

    }

});

// =========================
// CURRENT LOCATION
// =========================

locationBtn.addEventListener("click",()=>{

    if(!navigator.geolocation){

        alert("Geolocation not supported.");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        (position)=>{

            const lat = position.coords.latitude;

            const lon = position.coords.longitude;

            getWeather(`${lat},${lon}`);

        },

        ()=>{

            alert("Location permission denied.");

        },

        {

            enableHighAccuracy:true,

            timeout:10000

        }

    );

});

// =========================
// LOCAL STORAGE
// =========================

function saveLastCity(cityName){

    localStorage.setItem(

        "lastCity",

        cityName

    );

}

function loadLastCity(){

    return localStorage.getItem("lastCity");

}

// =========================
// INITIAL LOAD
// =========================

window.addEventListener("load",()=>{

    const lastCity = loadLastCity();

    if(lastCity){

        getWeather(lastCity);

    }

    else{

        getWeather("Karachi");

    }

});

console.log("✅ Part 3.1.2 Loaded");
/*=========================================
   SKYCAST PRO ULTRA 2026
   PART 3.1.3
   UTILITIES • UNIT • REFRESH UI
=========================================*/

// =========================
// TEMPERATURE UNIT
// =========================

const unitBtn = document.getElementById("unitBtn");

unitBtn.addEventListener("click",()=>{

    if(!weatherData) return;

    currentUnit =
    currentUnit==="C" ? "F" : "C";

    updateCurrentWeather(weatherData);

});

// =========================
// FORMAT DATE
// =========================

function formatDate(localTime){

    return new Date(localTime).toLocaleDateString(

        "en-US",

        {

            weekday:"long",

            year:"numeric",

            month:"long",

            day:"numeric"

        }

    );

}

// =========================
// FORMAT TIME
// =========================

function formatTime(time){

    return new Date(time).toLocaleTimeString(

        "en-US",

        {

            hour:"2-digit",

            minute:"2-digit",

            hour12:true

        }

    );

}

// =========================
// AQI TEXT
// =========================

function getAQIText(index){

    switch(index){

        case 1: return "Good";
        case 2: return "Moderate";
        case 3: return "Sensitive";
        case 4: return "Poor";
        case 5: return "Very Poor";
        case 6: return "Hazardous";

        default:
        return "Unknown";

    }

}

// =========================
// REFRESH UI
// =========================
function refreshUI(data){

    updateCurrentWeather(data);

    updateTheme(data);

    updateGreeting(data);

    updateClock(data);

    updateHourlyForecast(data);

    updateWeeklyForecast(data);

    updateDashboardCards(data);

    updateWeatherEffects(data);

}

// =========================
// PLACEHOLDER FUNCTIONS
// (Next Parts)
// =========================

function updateCurrentWeather(data){}

function updateTheme(data){}

function updateGreeting(data){}

function updateClock(data){}

function updateHourlyForecast(data){}

function updateWeeklyForecast(data){}

function updateWeatherEffects(data){

    document.body.classList.remove(
        "rainy",
        "snowy",
        "foggy",
        "thunder"
    );

    const condition =
    data.current.condition.text.toLowerCase();

    // Rain
    if(
        condition.includes("rain") ||
        condition.includes("drizzle") ||
        condition.includes("shower")
    ){
        document.body.classList.add("rainy");
        createRain(300);
    }

    // Snow
    if(condition.includes("snow")){
        document.body.classList.add("snowy");
    }

    // Fog
    if(
        condition.includes("fog") ||
        condition.includes("mist")
    ){
        document.body.classList.add("foggy");
    }

    // Thunder
    if(
        condition.includes("thunder")
    ){
        document.body.classList.add("thunder");
    }
}
function createRain(count){

    const rain =
    document.getElementById("rain");

    if(!rain) return;

    rain.innerHTML = "";

    for(let i=0;i<count;i++){

        const drop =
        document.createElement("div");

        drop.className = "drop";

        drop.style.left =
        Math.random()*100 + "vw";

        drop.style.height =
        15 + Math.random()*30 + "px";

        drop.style.animationDuration =
        (0.4 + Math.random()*0.5) + "s";

        drop.style.animationDelay =
        Math.random()*2 + "s";

        rain.appendChild(drop);

    }

}

console.log("✅ Part 3.1.3 Loaded");
/*=========================================
   SKYCAST PRO ULTRA 2026
   PART 3.2.1
   CURRENT WEATHER UI
=========================================*/

function updateCurrentWeather(data){

    const current = data.current;
    const location = data.location;
    const astro = data.forecast.forecastday[0].astro;

    // City
    city.textContent = location.name;

    // Country
    if(country){
        country.textContent = location.country;
    }

    // Weather Condition
    condition.textContent = current.condition.text;

    // Temperature
    if(currentUnit === "C"){

        temp.textContent =
        `${Math.round(current.temp_c)}°`;

        unitBtn.textContent = "°C";

        feelsLike.textContent =
        `Feels Like ${Math.round(current.feelslike_c)}°C`;

    }else{

        temp.textContent =
        `${Math.round(current.temp_f)}°`;

        unitBtn.textContent = "°F";

        feelsLike.textContent =
        `Feels Like ${Math.round(current.feelslike_f)}°F`;

    }

    // Weather Icon
    weatherIcon.src =
    "https:" + current.condition.icon;

    weatherIcon.alt =
    current.condition.text;

    // Details
    humidity.textContent =
    current.humidity + "%";

    wind.textContent =
    current.wind_kph + " km/h";

    pressure.textContent =
    current.pressure_mb + " mb";

    visibility.textContent =
    current.vis_km + " km";

    uv.textContent =
    current.uv;

    // AQI
    if(current.air_quality){

        const aqiIndex =
        Math.round(current.air_quality["us-epa-index"]);

        aqi.textContent =
        getAQIText(aqiIndex);

    }

    // Sunrise & Sunset
    sunrise.textContent =
    astro.sunrise;

    sunset.textContent =
    astro.sunset;

    // Date
    date.textContent =
    formatDate(location.localtime);

}
/*=========================================
   SKYCAST PRO ULTRA 2026
   PART 3.2.2
   LIVE CLOCK • GREETING • AUTO THEME
=========================================*/

// =========================
// LIVE CLOCK
// =========================

function updateClock(data){

    if(clockInterval){

        clearInterval(clockInterval);

    }

    let localTime = new Date(data.location.localtime);

    function tick(){

        liveClock.textContent =
        localTime.toLocaleTimeString("en-US",{

            hour:"2-digit",
            minute:"2-digit",
            second:"2-digit",
            hour12:true

        });

        localTime.setSeconds(
            localTime.getSeconds()+1
        );

    }

    tick();

    clockInterval = setInterval(tick,1000);

}

// =========================
// GREETING
// =========================

function updateGreeting(data){

    const hour = new Date(
        data.location.localtime
    ).getHours();

    if(hour>=5 && hour<12){

        greeting.innerHTML =
        "🌅 Good Morning";

    }

    else if(hour>=12 && hour<17){

        greeting.innerHTML =
        "☀️ Good Afternoon";

    }

    else if(hour>=17 && hour<19){

        greeting.innerHTML =
        "🌇 Good Evening";

    }

    else{

        greeting.innerHTML =
        "🌙 Good Night";

    }

}

// =========================
// AUTO THEME
// =========================

function updateTheme(data){

    const hour = new Date(
        data.location.localtime
    ).getHours();

    document.body.classList.remove(

        "morning",
        "day",
        "evening",
        "night"

    );

    if(hour>=5 && hour<10){

        document.body.classList.add(
            "morning"
        );

    }

    else if(hour>=10 && hour<17){

        document.body.classList.add(
            "day"
        );

    }

    else if(hour>=17 && hour<19){

        document.body.classList.add(
            "evening"
        );

    }

    else{

        document.body.classList.add(
            "night"
        );

    }

}
/*=========================================
   SKYCAST PRO ULTRA 2026
   PART 3.3.1A
   TODAY'S HOURLY FORECAST
=========================================*/

function updateHourlyForecast(data){

    hourlyContainer.innerHTML = "";

    const hours = data.forecast.forecastday[0].hour;

    const currentHour = new Date(
        data.location.localtime
    ).getHours();

    for(let i = currentHour; i < Math.min(currentHour + 8, 24); i++){

        const hour = hours[i];

        const card = document.createElement("div");

        card.className = "hour-card";

        const hourTemp =
        currentUnit === "C"
        ? `${Math.round(hour.temp_c)}°`
        : `${Math.round(hour.temp_f)}°`;

        const time = new Date(hour.time)
        .toLocaleTimeString("en-US",{

            hour:"numeric",
            hour12:true

        });

        card.innerHTML = `

            <small>${time}</small>

            <img
            src="https:${hour.condition.icon}"
            alt="${hour.condition.text}">

            <h3>${hourTemp}</h3>

            <p>${hour.condition.text}</p>

            <span>

                💧 ${hour.humidity}%

            </span>

        `;

        hourlyContainer.appendChild(card);

    }

}
/*=========================================
   SKYCAST PRO ULTRA 2026
   PART 3.3.1B
   PREMIUM HOURLY FORECAST
=========================================*/

function getWeatherColor(condition){

    condition = condition.toLowerCase();

    if(condition.includes("sun"))
        return "#FFD54F";

    if(condition.includes("clear"))
        return "#4FC3F7";

    if(condition.includes("cloud"))
        return "#90A4AE";

    if(condition.includes("rain"))
        return "#42A5F5";

    if(condition.includes("storm"))
        return "#7E57C2";

    if(condition.includes("snow"))
        return "#E1F5FE";

    if(condition.includes("fog"))
        return "#B0BEC5";

    return "#29B6F6";

}

// Replace previous updateHourlyForecast()

function updateHourlyForecast(data){

    hourlyContainer.innerHTML="";

    const hours =
    data.forecast.forecastday[0].hour;

    const currentHour =
    new Date(data.location.localtime)
    .getHours();

    for(let i=currentHour;i<Math.min(currentHour+8,24);i++){

        const h=hours[i];

        const tempValue =
        currentUnit==="C"
        ? Math.round(h.temp_c)
        : Math.round(h.temp_f);

        const card =
        document.createElement("div");

        card.className="hour-card";

        card.style.borderTop=
        `4px solid ${getWeatherColor(h.condition.text)}`;

        const label =
        i===currentHour
        ? "Now"
        : new Date(h.time).toLocaleTimeString(
            "en-US",
            {
                hour:"numeric",
                hour12:true
            }
        );

        card.innerHTML=`

            <small>${label}</small>

            <img
            src="https:${h.condition.icon}"
            alt="${h.condition.text}">

            <h3>${tempValue}°</h3>

            <p>${h.condition.text}</p>

            <div class="hour-extra">

                <span>💨 ${Math.round(h.wind_kph)} km/h</span>

                <span>💧 ${h.humidity}%</span>

            </div>

        `;

        card.addEventListener("mouseenter",()=>{

            card.style.transform=
            "translateY(-12px) scale(1.06)";

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform=
            "";

        });

        hourlyContainer.appendChild(card);

    }

}
/*=========================================
   SKYCAST PRO ULTRA 2026
   PART 3.3.2
   7 DAY FORECAST
=========================================*/

function updateWeeklyForecast(data){

    weeklyContainer.innerHTML = "";

    const forecast = data.forecast.forecastday;

    forecast.forEach(day => {

        const card = document.createElement("div");

        card.className = "week-card";

        const date = new Date(day.date);

        const dayName = date.toLocaleDateString(
            "en-US",
            {
                weekday:"long"
            }
        );

        const maxTemp =
        currentUnit === "C"
        ? Math.round(day.day.maxtemp_c)
        : Math.round(day.day.maxtemp_f);

        const minTemp =
        currentUnit === "C"
        ? Math.round(day.day.mintemp_c)
        : Math.round(day.day.mintemp_f);

        card.innerHTML = `

            <div class="week-day">

                <strong>${dayName}</strong>

                <small>${day.date}</small>

            </div>

            <div class="week-weather">

                <img
                src="https:${day.day.condition.icon}"
                alt="${day.day.condition.text}">

                <span>${day.day.condition.text}</span>

            </div>

            <div class="week-temp">

                <span class="max">

                    🌡 ${maxTemp}°

                </span>

                <span class="min">

                    ${minTemp}°

                </span>

            </div>

            <div class="week-rain">

                🌧 ${day.day.daily_chance_of_rain}%

            </div>

        `;

        weeklyContainer.appendChild(card);

    });

}
/*=========================================
   SKYCAST PRO ULTRA 2026
   PART 3.3.3
   AQI • UV • WIND COMPASS
=========================================*/

function updateDashboardCards(data){

    const current = data.current;

    // -----------------------
    // AQI
    // -----------------------

    const aqiIndex =
    current.air_quality
    ? current.air_quality["us-epa-index"]
    : 1;

    const aqiBar =
    document.getElementById("aqiBar");

    const aqiValue =
    document.getElementById("aqiValue");

    if(aqiValue){

        aqiValue.textContent =
        getAQIText(aqiIndex);

    }

    if(aqiBar){

        aqiBar.style.width =
        (aqiIndex / 6) * 100 + "%";

    }

    // -----------------------
    // UV
    // -----------------------

    const uvBar =
    document.getElementById("uvBar");

    const uvValue =
    document.getElementById("uvValue");

    if(uvValue){

        uvValue.textContent =
        current.uv;

    }

    if(uvBar){

        const percent =
        Math.min(current.uv,12) / 12 * 100;

        uvBar.style.width =
        percent + "%";

    }

    // -----------------------
    // Wind Speed
    // -----------------------

    const windSpeed =
    document.getElementById("windSpeed");

    if(windSpeed){

        windSpeed.textContent =
        Math.round(current.wind_kph) + " km/h";

    }

    // -----------------------
    // Wind Direction
    // -----------------------

    const windDirection =
    document.getElementById("windDirection");

    if(windDirection){

        windDirection.textContent =
        current.wind_dir;

    }

    // -----------------------
    // Compass
    // -----------------------

    const needle =
    document.getElementById("needle");

    if(needle){

        needle.style.transform =
        `rotate(${current.wind_degree}deg)`;

    }

}
/*=========================================
   SKYCAST PRO ULTRA 2026
   PART 3.4.1
   FAVOURITE CITIES
=========================================*/

const favouriteContainer =
document.getElementById("favouriteContainer");

const addFavouriteBtn =
document.getElementById("addFavourite");

// =========================
// GET FAVOURITES
// =========================

function getFavourites(){

    return JSON.parse(

        localStorage.getItem("favourites")

    ) || [];

}

// =========================
// SAVE FAVOURITES
// =========================

function saveFavourites(list){

    localStorage.setItem(

        "favourites",

        JSON.stringify(list)

    );

}

// =========================
// ADD CURRENT CITY
// =========================

function addCurrentCityToFavourite(){

    if(!weatherData) return;

    const cityName =
    weatherData.location.name;

    let favourites =
    getFavourites();

    if(favourites.includes(cityName)){

        alert("City already added.");

        return;

    }

    favourites.push(cityName);

    saveFavourites(favourites);

    renderFavourites();

}

// =========================
// DELETE CITY
// =========================

function removeFavourite(cityName){

    let favourites =
    getFavourites();

    favourites =
    favourites.filter(

        city=>city!==cityName

    );

    saveFavourites(favourites);

    renderFavourites();

}

// =========================
// RENDER
// =========================

function renderFavourites(){

    favouriteContainer.innerHTML="";

    const favourites =
    getFavourites();

    favourites.forEach(cityName=>{

        const item =
        document.createElement("div");

        item.className=
        "favourite-item";

        item.innerHTML=`

            <span>${cityName}</span>

            <button
            class="remove-fav">

                ✕

            </button>

        `;

        item.querySelector("span")
        .addEventListener("click",()=>{

            getWeather(cityName);

        });

        item.querySelector("button")
        .addEventListener("click",(e)=>{

            e.stopPropagation();

            removeFavourite(cityName);

        });

        favouriteContainer
        .appendChild(item);

    });

}

// =========================
// BUTTON
// =========================

if(addFavouriteBtn){

    addFavouriteBtn.addEventListener(

        "click",

        addCurrentCityToFavourite

    );

}

// =========================
// INITIAL
// =========================

renderFavourites();
/*=========================================
   SKYCAST PRO ULTRA 2026
   PART 3.4.2
   RECENT SEARCH HISTORY
=========================================*/

const historyContainer =
document.getElementById("historyContainer");

// =========================
// GET HISTORY
// =========================

function getSearchHistory(){

    return JSON.parse(
        localStorage.getItem("searchHistory")
    ) || [];

}

// =========================
// SAVE HISTORY
// =========================

function saveSearchHistory(cityName){

    let history = getSearchHistory();

    // Remove duplicate
    history = history.filter(
        city => city.toLowerCase() !== cityName.toLowerCase()
    );

    // Add latest on top
    history.unshift(cityName);

    // Keep only last 10
    if(history.length > 10){

        history = history.slice(0,10);

    }

    localStorage.setItem(
        "searchHistory",
        JSON.stringify(history)
    );

    renderSearchHistory();

}

// =========================
// RENDER HISTORY
// =========================

function renderSearchHistory(){

    if(!historyContainer) return;

    historyContainer.innerHTML = "";

    const history = getSearchHistory();

    if(history.length === 0){

        historyContainer.innerHTML =
        "<p>No recent searches</p>";

        return;

    }

    history.forEach(cityName=>{

        const item =
        document.createElement("div");

        item.className = "history-item";

        item.innerHTML = `
            <span>${cityName}</span>
            <button class="delete-history">
                <i class="ri-delete-bin-line"></i>
            </button>
        `;

        // Click to search
        item.querySelector("span")
        .addEventListener("click",()=>{

            searchInput.value = cityName;

            getWeather(cityName);

        });

        // Delete
        item.querySelector("button")
        .addEventListener("click",(e)=>{

            e.stopPropagation();

            removeHistory(cityName);

        });

        historyContainer.appendChild(item);

    });

}

// =========================
// REMOVE HISTORY
// =========================

function removeHistory(cityName){

    let history = getSearchHistory();

    history = history.filter(
        city => city !== cityName
    );

    localStorage.setItem(
        "searchHistory",
        JSON.stringify(history)
    );

    renderSearchHistory();

}

// =========================
// CLEAR HISTORY
// =========================

function clearSearchHistory(){

    localStorage.removeItem("searchHistory");

    renderSearchHistory();

}
/*=========================================
   SKYCAST PRO ULTRA 2026
   PART 3.4.3
   AUTO REFRESH • OFFLINE • LOADER • FINAL
=========================================*/

// =========================
// AUTO REFRESH (Every 10 Min)
// =========================

setInterval(() => {

    if(weatherData){

        getWeather(weatherData.location.name);

    }

},600000);

// =========================
// ONLINE / OFFLINE
// =========================

window.addEventListener("offline",()=>{

    alert("⚠️ Internet connection lost.");

});

window.addEventListener("online",()=>{

    if(weatherData){

        getWeather(weatherData.location.name);

    }

});

// =========================
// LOADER
// =========================

function showLoader(){

    if(loader){

        loader.style.display="flex";

        loader.style.opacity="1";

    }

}

function hideLoader(){

    if(loader){

        setTimeout(()=>{

            loader.style.opacity="0";

            setTimeout(()=>{

                loader.style.display="none";

            },300);

        },300);

    }

}

// =========================
// ERROR MESSAGE
// =========================

function showError(message){

    alert("❌ " + message);

}

// =========================
// SEARCH INPUT
// =========================

searchInput.addEventListener("focus",()=>{

    searchInput.select();

});

// =========================
// ESC CLEAR
// =========================

searchInput.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        searchInput.value="";

    }

});

// =========================
// WEATHER ICON ANIMATION
// =========================

if(weatherIcon){

    weatherIcon.addEventListener("load",()=>{

        weatherIcon.animate(

            [

                {
                    transform:"scale(.8)",
                    opacity:0
                },

                {
                    transform:"scale(1)",
                    opacity:1
                }

            ],

            {

                duration:500,

                easing:"ease-out"

            }

        );

    });

}

// =========================
// PAGE READY
// =========================

window.addEventListener("load",()=>{

    renderFavourites();

    renderSearchHistory();

    console.log("🌤 SkyCast Pro Ultra Ready");

});