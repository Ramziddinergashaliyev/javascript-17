const weatherInput = document.querySelector(".weather__input");
const weatherBtn = document.querySelector(".weather__btn");
const weatherRegion = document.querySelector(".weather__region");
const weatherDate = document.querySelector(".weather__date");
const WeatherDegree = document.querySelector(".weather__degree");
const weatherTitle = document.querySelector(".weather__title");
const weatherText = document.querySelector(".weather__text");
const weatherImg = document.querySelector(".weather__img");
const form = document.querySelector(".form");
const weatherBottom = document.querySelector(".weather__bottom");

document.addEventListener("DOMContentLoaded", () => {
  weatherData();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  weatherData(weatherInput.value);
});

async function weatherData(shahar = "Namangan") {
  let data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${shahar}&days=7&aqi=yes&alerts=yes`
  );
  await data
    .json()
    .then((res) => {
      if (res.error) {
        throw new Error("Bunday shahar mavjud emas");
      }
      weatherMap(res);
    })
    .catch((err) => alert(err));
}

function weatherMap(weather) {
  weatherRegion.innerHTML = `${weather.location.name}. ${weather.location.country}`;
  weatherDate.innerHTML = `${weather.current.last_updated}`;
  WeatherDegree.innerHTML = `${weather.current.temp_c}°`;
  weatherImg.src = `${weather.current.condition.icon}`;
  weatherText.innerHTML = `${weather.current.condition.text}`;

  let weatherItems = "";
  let date = new Date();
  let hour = date.getHours();

  weather.forecast.forecastday[0].hour.slice(hour + 1).forEach((e) => {
    weatherItems += `
          <div class="weather__bottom__card">
            <p>${e.time.split(" ")[1]}</p>
            <img src="${e.condition.icon}" alt="">
            <p>${e.temp_c}°</p>
          </div>

    `;
  });
  weatherBottom.innerHTML = weatherItems;

  const weatherDay = document.querySelector(".weather__day");

  console.log(weather.forecast.forecastday[1].hour);
  weather.forecast.forecastday[1].hour.forEach((e) => {
    weatherItems += `
          <div class="weather__today">
            <p>${e.time.split(" ")[1]}</p>
            <img src="${e.condition.icon}" alt="">
            <p>${e.temp_c}</p>
          </div>
    `;
  });
  weatherDay.innerHTML = weatherItems;

  const weatherDayAfter = document.querySelector(".weather__dayAfter");

  weather.forecast.forecastday[2].hour.slice(hour + 1).forEach((e) => {
    weatherItems += `
          <div class="weather__tomorrow">
            <p>${e.time.split(" ")[1]}</p>
            <img src="${e.condition.icon}" alt="">
            <p>${e.temp_c}</p>
          </div>
    `;
  });
  weatherDayAfter.innerHTML = weatherItems;
}
