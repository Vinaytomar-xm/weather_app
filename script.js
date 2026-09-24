
const searchInput = document.querySelector('#city')
const searchBtn = document.querySelector('#searchBtn')
const temp = document.querySelector('#temp')
const city = document.querySelector('#cityName')
const condition = document.querySelector('#condition')
const humidity = document.querySelector('#humidity')
const wind = document.getElementById('wind')


searchBtn.addEventListener('click', async function () {
    const value = searchInput.value

    if (value === '') {
        alert('Please enter a city name')
        return
    }

    searchBtn.disabled = true;
    searchBtn.textContent = "Loading...";

    API_KEY = 'YOUR_API_KEY'
    try {

        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${value}&aqi=yes`)

        if (!response.ok) {
            throw new Error('City not found')
        }

        const data = await response.json()

        temp.textContent = `${data.current.temp_c}°C`
        city.textContent = `${data.location.name} , ${data.location.region} - ${data.location.country}`
        humidity.textContent = `${data.current.humidity} %`
        wind.textContent = `${data.current.wind_kph} km/h`

    } catch (error) {
        alert('Error fetching weather data')
    } finally {
        searchBtn.disabled = false;
        searchBtn.textContent = "Search";
        searchInput.value = ''
    }

})


