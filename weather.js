'use strict';

// Smooth scroll to Weather Section
const btnScrollTo = document.querySelector('.btn--scroll-to');
const weatherSection = document.querySelector('#weather-section');

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  weatherSection.scrollIntoView({ behavior: 'smooth' });
});

// Weather cards configuration
const weatherCards = [
  { card: document.querySelector('.weather-card--ny'), lat: 40.7128, lon: -74.0060 }, // New York
  { card: document.querySelector('.weather-card--london'), lat: 51.5074, lon: -0.1278 }, // London
  { card: document.querySelector('.weather-card--tokyo'), lat: 35.6895, lon: 139.6917 }, // Tokyo
  { card: document.querySelector('.weather-card--paris'), lat: 48.8566, lon: 2.3522 }, // Paris
  { card: document.querySelector('.weather-card--sydney'), lat: -33.8688, lon: 151.2093 }, // Sydney
  { card: document.querySelector('.weather-card--cairo'), lat: 30.0444, lon: 31.2357 } // Cairo
];

// Map Open-Meteo weathercode to description + animation class
const weatherMap = {
  0: { desc: 'Clear', anim: 'sun' },
  1: { desc: 'Mainly Clear', anim: 'sun' },
  2: { desc: 'Partly Cloudy', anim: 'cloud' },
  3: { desc: 'Overcast', anim: 'cloud' },
  61: { desc: 'Rain', anim: 'rain' },
  63: { desc: 'Rain', anim: 'rain' },
  65: { desc: 'Heavy Rain', anim: 'rain' },
  80: { desc: 'Showers', anim: 'rain' },
  81: { desc: 'Showers', anim: 'rain' },
  82: { desc: 'Thunderstorm', anim: 'rain' },
  71: { desc: 'Snow', anim: 'snow' },
  73: { desc: 'Snow', anim: 'snow' },
  75: { desc: 'Heavy Snow', anim: 'snow' },
};

// Fetch weather for each card and update
weatherCards.forEach(({ card, lat, lon }) => {
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    .then(res => res.json())
    .then(data => {
      const temp = data.current_weather.temperature;
      const code = data.current_weather.weathercode;
      const info = weatherMap[code] || { desc: 'Unknown', anim: 'sun' };

      // Update card text
      card.querySelector('.weather-temp').textContent = `${temp} °C`;
      card.querySelector('.weather-desc').textContent = info.desc;

      // Show the correct animation
      const sun = card.querySelector('.weather-sun');
      const cloud = card.querySelector('.weather-cloud');
      const rain = card.querySelector('.weather-rain');

      sun && (sun.style.display = info.anim === 'sun' ? 'block' : 'none');
      cloud && (cloud.style.display = info.anim === 'cloud' ? 'block' : 'none');
      rain && (rain.style.display = info.anim === 'rain' ? 'block' : 'none');
    })
    .catch(err => console.error('Weather API error:', err));
});