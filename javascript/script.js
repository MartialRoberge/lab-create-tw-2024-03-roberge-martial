const API_KEY = "a867da8f0cb6364e06910af83b63a3bb";
let city = "Paris";

// Configuration des animations
const RAIN_DROPS_COUNT = 100;
const WEATHER_EFFECTS = {
  RAIN: ['Rain', 'Drizzle', 'Thunderstorm'],
  CLOUDS: ['Clouds', 'Mist', 'Fog', 'Haze'],
  SUN: ['Clear', 'Sun']
};

document.addEventListener('DOMContentLoaded', () => {
  initializeWeatherEffects();
  start();
  setupSearchUI();
});

// Initialisation des effets météo
function initializeWeatherEffects() {
  // Création des gouttes de pluie
  const rainContainer = document.querySelector('.rain-container');
  for (let i = 0; i < RAIN_DROPS_COUNT; i++) {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.animationDuration = `${0.8 + Math.random() * 0.5}s`;
    drop.style.animationDelay = `${Math.random() * 2}s`;
    rainContainer.appendChild(drop);
  }

  // Initialisation des positions des nuages
  document.querySelectorAll('.cloud').forEach(cloud => {
    cloud.style.left = `${Math.random() * 100}%`;
  });
}

// Configuration de l'interface de recherche
function setupSearchUI() {
  const cityInput = document.getElementById('cityInput');
  const suggestionsList = document.querySelector('.suggestions-list');

  cityInput.addEventListener('input', debounce(async () => {
    if (cityInput.value.trim().length >= 3) {
      const cities = await searchCities(cityInput.value.trim());
      updateSuggestions(cities, suggestionsList, cityInput);
    } else {
      suggestionsList.innerHTML = '';
    }
  }, 300));

  document.querySelector('button').addEventListener('click', () => {
    city = cityInput.value.trim();
    start();
  });

  // Fermer les suggestions en cliquant ailleurs
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
      suggestionsList.innerHTML = '';
    }
  });
}

// Gestion des effets météo
function updateWeatherEffects(weatherCondition) {
  const body = document.body;
  const rainContainer = document.querySelector('.rain-container');
  const cloudsContainer = document.querySelector('.clouds-container');
  const sunContainer = document.querySelector('.sun-container');

  // Réinitialisation des classes et effets
  body.classList.remove('rainy', 'cloudy', 'sunny');
  rainContainer.style.display = 'none';
  cloudsContainer.style.display = 'none';
  sunContainer.style.display = 'none';

  // Application des nouveaux effets
  if (WEATHER_EFFECTS.RAIN.includes(weatherCondition)) {
    body.classList.add('rainy');
    rainContainer.style.display = 'block';
  } else if (WEATHER_EFFECTS.CLOUDS.includes(weatherCondition)) {
    body.classList.add('cloudy');
    cloudsContainer.style.display = 'block';
  } else if (WEATHER_EFFECTS.SUN.includes(weatherCondition)) {
    body.classList.add('sunny');
    sunContainer.style.display = 'block';
  }
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

async function searchCities(query) {
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`);
    return await response.json();
  } catch (error) {
    console.error('Erreur recherche villes:', error);
    return [];
  }
}

function updateSuggestions(cities, suggestionsList, cityInput) {
  suggestionsList.innerHTML = '';
  cities.forEach(cityData => {
    const li = document.createElement('li');
    li.textContent = `${cityData.name}, ${cityData.country}`;
    li.addEventListener('click', () => {
      cityInput.value = cityData.name;
      city = cityData.name;
      suggestionsList.innerHTML = '';
      start();
    });
    suggestionsList.appendChild(li);
  });
}

async function start() {
  try {
    const weatherData = await getCurrentWeather();
    const forecastData = await getThreeDayForecast();
    updateUI(weatherData, forecastData);
    updateWeatherEffects(weatherData.weather[0].main);
  } catch (error) {
    console.error('Erreur:', error);
    showError('Impossible de récupérer les données météo');
  }
}

async function getCurrentWeather() {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=fr&appid=${API_KEY}`);
  const data = await response.json();
  if (data.cod !== 200) throw new Error('Données météo non disponibles');
  return data;
}

async function getThreeDayForecast() {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&lang=fr&appid=${API_KEY}`);
  const data = await response.json();
  if (!data || !data.list) throw new Error('Données de prévision non disponibles');
  return data.list.filter(item => {
    const date = new Date(item.dt * 1000);
    return date.getHours() >= 12 && date.getHours() < 15;
  }).slice(1, 4);
}

function updateUI(weather, forecast) {
  // Mise à jour de la météo actuelle
  document.getElementById('city').textContent = weather.name;
  document.getElementById('temperature').textContent = `${Math.round(weather.main.temp)}°C`;
  document.getElementById('description').textContent = weather.weather[0].description;

  // Mise à jour de l'icône météo actuelle
  const currentIcon = getWeatherIcon(weather.weather[0].main);
  document.querySelector('.current-icon').innerHTML = `<i class="${currentIcon}"></i>`;

  // Mise à jour des prévisions
  forecast.forEach((day, index) => {
    const date = new Date(day.dt * 1000);
    const dayElement = document.getElementById(`day${index + 1}`);
    dayElement.querySelector('h3').textContent = date.toLocaleDateString('fr-FR', { weekday: 'long' });
    dayElement.querySelector('.temp').textContent = `${Math.round(day.main.temp)}°C`;
    dayElement.querySelector('.desc').textContent = day.weather[0].description;
    
    // Mise à jour des icônes de prévision
    const forecastIcon = getWeatherIcon(day.weather[0].main);
    dayElement.querySelector('.forecast-icon').innerHTML = `<i class="${forecastIcon}"></i>`;
  });
}

function getWeatherIcon(weatherCondition) {
  const iconMap = {
    Clear: 'fas fa-sun',
    Clouds: 'fas fa-cloud',
    Rain: 'fas fa-cloud-rain',
    Drizzle: 'fas fa-cloud-rain',
    Thunderstorm: 'fas fa-bolt',
    Snow: 'fas fa-snowflake',
    Mist: 'fas fa-smog',
    Fog: 'fas fa-smog',
    Haze: 'fas fa-smog'
  };
  return iconMap[weatherCondition] || 'fas fa-question';
}

function showError(message) {
  // Création d'une alerte d'erreur stylisée
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  
  document.querySelector('.container').prepend(errorDiv);
  
  // Suppression automatique après 3 secondes
  setTimeout(() => {
    errorDiv.remove();
  }, 3000);
}