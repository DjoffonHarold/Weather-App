

document.getElementById('weatherForm').addEventListener('click', async function(event){
    event.preventDefault()
    const location = document.getElementById('location').value  
    const weatherData = await getWeatherData(location)
    console.log(weatherData)
    if (weatherData) {
        const processedData = await processWeatherData(weatherData);
        displayWeatherData(processedData);
    } else {
        console.error('Failed to fetch weather data.');
    }
})

async function getWeatherData(location){
    const apiKey = '3373ee4d49a14d44a80174814242706'
    //const location = document.getElementById('location').value 
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    try {
        const response = await fetch(url,{mode:'cors'})
        if(!response.ok){
            throw new error('Network response was not ok')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error)
        
    }
}

async function processWeatherData(data){
    return {
        location: data.location.name,
        region: data.location.region,
        country: data.location.country,
        localTime: data.location.localtime,
        last_updated: data.current.last_updated,
        temperature: data.current.temp_c,
        condition: data.current.condition.test,
        icon: data.current.condition.icon,
        humidity: data.current.humidity,
        feelslike_c: data.current.feelslike_c,
        wind_kph: data.current.wind_kph,

       

    }

    
}

async function displayWeatherData(data){
    const container = document.querySelector('.container')
    const weatherResult = document.getElementById('weatherResult')
    const infos = document.createElement('div')
    infos.classList.add('infos')

    const leftInfos = document.createElement('div')
    leftInfos.classList.add('leftInfos')

    const divLocation = document.createElement('div')
    divLocation.classList.add('divTemp')

    const infosLocation = document.createElement('h1')
    infosLocation.classList.add('information')
    infosLocation.textContent = `${data.location}`

    const logoLocation = document.createElement('img')
    logoLocation.classList.add('logoImage')
    logoLocation.src = './asset/map.png'

    const divRegion = document.createElement('div')
    divRegion.classList.add('divTemp')

    const infosRegion = document.createElement('h1')
    infosRegion.classList.add('information')
    infosRegion.textContent = `${data.region}`

    const logoRegion = document.createElement('img')
    logoRegion.classList.add('logoImage')
    logoRegion.src = './asset/map.png'

    const divCountry = document.createElement('div')
    divCountry.classList.add('divTemp')


    const infosCountry = document.createElement('h1')
    infosCountry.classList.add('information')
    infosCountry.textContent = `${data.country}`

    const logoCountry = document.createElement('img')
    logoCountry.classList.add('logoImage')
    logoCountry.src = './asset/international.png'

    const infosLocalTime = document.createElement('h1')
    infosLocalTime.classList.add('information')
    infosLocalTime.textContent = `Local time ${data.localTime}`
/////////////////////////////////////////////////
    const rightInfos = document.createElement('div')
    rightInfos.classList.add('rightInfos')

    const divTemperature = document.createElement('div')
    divTemperature.classList.add("divTemp")

    const infosTemperature = document.createElement('h1')
    infosTemperature.classList.add('information')
    infosTemperature.textContent = `Temperature: ${data.temperature}°C `

    const logoTemperature = document.createElement('img')
    logoTemperature.classList.add('logoImage')
    logoTemperature.src = './asset/temperature.png'

    const divHumidity = document.createElement('div')
    divHumidity.classList.add("divTemp")

    const infosHumidity = document.createElement('h1')
    infosHumidity.classList.add('information')
    infosHumidity.textContent = `humidity: ${data.humidity}°C `

    const logoHumidity = document.createElement('img')
    logoHumidity.classList.add('logoImage')
    logoHumidity.src = './asset/humidite.png'

    const divFeels = document.createElement('div')
    divFeels.classList.add("divTemp")

    const infosFeelsLike = document.createElement('h1')
    infosFeelsLike.classList.add('information')
    infosFeelsLike.textContent = `Feels like: ${data.feelslike_c}`

    const logoFeels = document.createElement('img')
    logoFeels.classList.add('logoImage')
    logoFeels.src = './asset/thermometer.png'

    const infosLocalUpdate = document.createElement('h1')
    infosLocalUpdate.classList.add('information')
    infosLocalUpdate.textContent = `Update Time ${data.last_updated}`

    /////////////////////////////////////////
     const divWind = document.createElement('div')
     divWind.classList.add('divTemp')

    const infosWind = document.createElement('h1')
    infosWind.classList.add('information')
    infosWind.textContent = `Wind: ${data.wind_kph}kph `
    const logoWind = document.createElement('img')
    logoWind.classList.add('logoImage')
    logoWind.src = './asset/wind.png'


    const infosIcon = document.createElement('img')
    infosIcon.classList.add('information')
    infosIcon.src = `${data.icon}`

    divLocation.appendChild(infosLocation)
    divLocation.appendChild(logoLocation)
    divRegion.appendChild(infosRegion)
    divRegion.appendChild(logoRegion)
    divCountry.appendChild(infosCountry)
    divCountry.appendChild(logoCountry)
    divTemperature.appendChild(infosTemperature)
    divTemperature.appendChild(logoTemperature)
    divHumidity.appendChild(infosHumidity)
    divHumidity.appendChild(logoHumidity)
    divWind.appendChild(infosWind)
    divWind.appendChild(logoWind)
    divFeels.appendChild(infosFeelsLike)
    divFeels.appendChild(logoFeels)
    leftInfos.appendChild(divLocation)
    leftInfos.appendChild(divRegion)
    leftInfos.appendChild(divCountry)
    leftInfos.appendChild(infosLocalTime)
    rightInfos.appendChild(divTemperature)
    rightInfos.appendChild(divHumidity)
    rightInfos.appendChild(divFeels)
    rightInfos.appendChild(infosLocalUpdate)
    infos.appendChild(leftInfos)
    infos.appendChild(rightInfos)
    weatherResult.appendChild(infosIcon)
    
        if((data.humidity) > 87){
          const res = document.createElement("h1")
          res.textContent = " Oops there is heavy rain "
          weatherResult.appendChild(res)
         }else{
            const res = document.createElement("h1")
             res.textContent = 'The weather is nice '
             weatherResult.appendChild(res)
         }
    
    weatherResult.appendChild(infos)
    weatherResult.appendChild(divWind)
    container.appendChild(weatherResult)
    
        
}