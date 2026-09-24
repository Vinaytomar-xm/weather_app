const searchInput = document.querySelector("#city");
const searchBtn = document.querySelector("#searchBtn");

const temp = document.querySelector("#temp");
const cityName = document.querySelector("#cityName");
const condition = document.querySelector("#condition");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");

const icon = document.querySelector("#icon");
const status = document.querySelector("#status");


async function getWeather(city) {

    try {

        setLoading(true);

        status.textContent = "Fetching weather data...";

        const response = await fetch(
            `/api/weather?city=${encodeURIComponent(city)}`
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.message || "Unable to fetch weather data"
            );
        }

        updateWeather(result.data);

        status.textContent = "";

    } catch (error) {

        console.error("Weather Error:", error);

        status.textContent =
            error.message || "Something went wrong";

    } finally {

        setLoading(false);

    }
}


function updateWeather(data) {

    const location = data.location;
    const current = data.current;


    temp.textContent =
        `${current.temp_c}°C`;


    cityName.textContent =
        `${location.name}, ${location.country}`;


    condition.textContent =
        current.condition.text;


    humidity.textContent =
        `${current.humidity}%`;


    wind.textContent =
        `${current.wind_kph} km/h`;


    icon.src =
        `https:${current.condition.icon}`;


    icon.alt =
        current.condition.text;


    icon.hidden = false;
}


function setLoading(isLoading) {

    searchBtn.disabled = isLoading;

    searchBtn.textContent =
        isLoading ? "Loading..." : "Search";

}


searchBtn.addEventListener("click", () => {

    const city = searchInput.value.trim();

    if (!city) {

        status.textContent =
            "Please enter a city name.";

        searchInput.focus();

        return;
    }

    getWeather(city);

});


searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        searchBtn.click();

    }

});