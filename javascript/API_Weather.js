// API : https://openweathermap.org/api
const API_KEY = "b52835517a1b92f2dd16fffc2fb70f02";
// Base source icon
const API_URL_ICON = "http://openweathermap.org/img/wn/";

class WeatherAPI {
  constructor(city = "paris") {
    this.city = city;
  }

  // Fetch 3-day forecast
  async getThreeDayForecast() {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&appid=${API_KEY}`, {
        crossdomain: true
      });

      const dailyForecasts = response.data.list.filter((forecast) => forecast.dt_txt.includes("12:00:00"));

      const threeDayForecasts = dailyForecasts.slice(0, 3);

      return threeDayForecasts.map(forecast => {
        const main = forecast.weather[0].main;
        const description = forecast.weather[0].description;
        const temp = forecast.main.temp;
        const icon = this.getHTMLElementFromIcon(forecast.weather[0].icon);

        return {
          main,
          description,
          temp,
          icon
        };
      });

    } catch (error) {
      console.error("Erreur lors de la récupération des prévisions météo :", error);
      throw error;
    }
  }

  getHTMLElementFromIcon(icon) {
    return `<img src="${API_URL_ICON}${icon}@2x.png" class="weather-icon" alt="Weather icon"/>`;
  }
}
