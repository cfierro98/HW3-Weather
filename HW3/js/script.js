//Event Listeners
document.querySelector("#zip").addEventListener("input", displayCity);
document.querySelector("#checkWeather").addEventListener("click", displayWeather);

//functions
async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    let apiKey = "ed4e28e78a21a328ca9caf479944e1a6";

    let url = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();

    if (zipCode.length < 5 || zipCode.length > 5) {
        zipLengthError.innerHTML = "Zipcode must be 5 digits";
        document.querySelector("#name").innerHTML = "";
        document.querySelector("#lat").innerHTML = "";
        document.querySelector("#lon").innerHTML = "";
        return; //stops function so no API happens
    }
    if (data.cod == "404") {
        if (zipCode.length == 5) {
            zipLengthError.innerHTML = "";
        }
        zipCodeError.innerHTML = "Information not found. Please enter new Zip Code."
        document.querySelector("#name").innerHTML = "";
        document.querySelector("#lat").innerHTML = "";
        document.querySelector("#lon").innerHTML = "";
        return;
    }

    else {
        zipLengthError.innerHTML = "";
        zipCodeError.innerHTML = "";

        if (!data.state) {

            document.querySelector("#name").innerHTML = data.name;
            document.querySelector("#state").innerHTML = "";
            document.querySelector("#lat").innerHTML = data.lat;
            document.querySelector("#lon").innerHTML = data.lon;

        }
        else {
            document.querySelector("#name").innerHTML = data.name;
            document.querySelector("#state").innerHTML = ", " + data.state;
            document.querySelector("#lat").innerHTML = data.lat;
            document.querySelector("#lon").innerHTML = data.lon;
        }

    }
}

async function displayWeather() {
    let lat = document.querySelector("#lat").innerHTML;
    let lon = document.querySelector("#lon").innerHTML;
    let apiKey = "ed4e28e78a21a328ca9caf479944e1a6";

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log("Lat & Long", lat, lon);

    document.querySelector("#temp").innerHTML = data.main.temp + " F";
    document.querySelector("#main").innerHTML = data.weather[0].main;
    displayImage();
    displayDescription(data.weather[0].description);

}

function displayImage() {
    let weather = document.querySelector("#main").innerHTML.toLowerCase();

    //clears the previous image
    document.querySelector("#weatherImg").innerHTML = "";

    if (weather === "clouds") {
        document.querySelector("#weatherImg").innerHTML = `<img src = "img/clouds.png" alt ="Weather Img">`;
    }

    if (weather == "clear") {
        document.querySelector("#weatherImg").innerHTML = `<img src = "img/clear.png"" alt ="Weather Img">`;
    }
    if (weather == "rain") {
        document.querySelector("#weatherImg").innerHTML = `<img src = "img/rain.png"" alt ="Weather Img">`;
    }
}

function displayDescription(desc) {
    document.querySelector("#description").innerHTML = `More details: ${desc}`;
}


