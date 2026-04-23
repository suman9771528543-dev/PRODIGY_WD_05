const apiKey = "79f612b82438c07405afea8de14c15f7"; 

async function getWeather() {
    const city = document.getElementById("city").value;
    if(!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error("City not found");
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert("Check the city name and try again!");
    }
}

function displayWeather(data) {
    document.getElementById("weatherBox").style.display = "block";
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById("desc").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = `${data.main.humidity}%`;
    document.getElementById("wind").innerText = `${data.wind.speed} m/s`;

    const iconCode = data.weather[0].icon;
    document.getElementById("icon").src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    if(data.weather[0].main === "Clear") {
        document.body.style.background = "linear-gradient(135deg, #f59e0b, #d97706)";
    } else {
        document.body.style.background = "linear-gradient(135deg, #0f172a, #1e293b)";
    }
}

function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(async (p) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${p.coords.latitude}&lon=${p.coords.longitude}&appid=${apiKey}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        displayWeather(data);
    });
}
