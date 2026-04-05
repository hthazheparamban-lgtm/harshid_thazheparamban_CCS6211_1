'use strict';

// Smooth scroll to Weather Section
const btnScrollTo = document.querySelector('.btn--scroll-to');
const weatherSection = document.querySelector('#weather-section');

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  weatherSection.scrollIntoView({ behavior: 'smooth' });
});

// Weather cards configuration (6 cards)
const weatherCards = [
  { card: document.querySelector('.weather-card--ny'), lat: 40.7128, lon: -74.0060 }, // New York
  { card: document.querySelector('.weather-card--london'), lat: 51.5074, lon: -0.1278 }, // London
  { card: document.querySelector('.weather-card--tokyo'), lat: 35.6895, lon: 139.6917 }, // Tokyo
  { card: document.querySelector('.weather-card--paris'), lat: 48.8566, lon: 2.3522 }, // Paris
  { card: document.querySelector('.weather-card--sydney'), lat: -33.8688, lon: 151.2093 }, // Sydney
  { card: document.querySelector('.weather-card--cairo'), lat: 30.0444, lon: 31.2357 } // Cairo
];

// Map Open-Meteo weathercode to description + video filename
const weatherMap = {
  0: { desc: 'Clear', video: 'clear.mp4' },
  1: { desc: 'Mainly Clear', video: 'sunny.mp4' },
  2: { desc: 'Partly Cloudy', video: 'partly-cloudy.mp4' },
  3: { desc: 'Overcast', video: 'cloudy.mp4' },
  61: { desc: 'Rain', video: 'rain.mp4' },
  63: { desc: 'Rain', video: 'rain.mp4' },
  65: { desc: 'Heavy Rain', video: 'rain.mp4' },
  80: { desc: 'Showers', video: 'rain.mp4' },
  81: { desc: 'Showers', video: 'rain.mp4' },
  82: { desc: 'Thunderstorm', video: 'rain.mp4' },
  71: { desc: 'Snow', video: 'snow.mp4' }, // Keep only one snowy type
};

// Fetch weather for each card and update
weatherCards.forEach(({ card, lat, lon }) => {
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    .then(res => res.json())
    .then(data => {
      const temp = data.current_weather.temperature;
      const code = data.current_weather.weathercode;
      const info = weatherMap[code] || { desc: 'Unknown', video: 'sunny.mp4' };

      // Update card text
      card.querySelector('.weather-temp').textContent = `${temp} °C`;
      card.querySelector('.weather-desc').textContent = info.desc;

      // Update video source
      const video = card.querySelector('.weather-video');
      if (video) {
        video.src = `videos/${info.video}`; // Folder 'videos' contains sunny.mp4, cloudy.mp4, rain.mp4, snow.mp4
        video.load();
        video.play();
      }
    })
    .catch(err => console.error('Weather API error:', err));
});