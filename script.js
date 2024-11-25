
        const apiKey = "edc1bee7322095f3a010be10255be357";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        

        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon")

        async function checkWeather(city) {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

            if(response.status == 404){
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
            }else{
                var data = await response.json();

            console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

            // Convert Unix time to a readable time
        const sunriseTime = new Date(data.sys.sunrise * 1000);
        const sunsetTime = new Date(data.sys.sunset * 1000);

        // Formatting the time to HH:MM AM/PM format
        const sunriseFormatted = sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunsetFormatted = sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Display the sunrise and sunset times
        document.querySelector(".sunrise").innerHTML = `Sunrise: ${sunriseFormatted}`;
        document.querySelector(".sunset").innerHTML = `Sunset: ${sunsetFormatted}`;



            if(data.weather[0].main == "Clouds"){
                weatherIcon.src = "images/clouds.png";
            }
            else if(data.weather[0].main == "Clear"){
                weatherIcon.src = "images/clear.png";
            }
            else if(data.weather[0].main == "Rain"){
                weatherIcon.src = "images/rain.png";
            }
            else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src = "images/drizzle.png";
            }
            else if(data.weather[0].main == "Mist"){
                weatherIcon.src = "images/mist.png";
            }
        document.querySelector(".error").style.display = "none";
        }
        
            }
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})