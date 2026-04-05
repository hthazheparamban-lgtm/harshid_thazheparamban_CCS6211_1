'use strict';

// Smooth scroll to Weather Section
const btnScrollTo = document.querySelector('.btn--scroll-to');
const weatherSection = document.querySelector('#weather-section');

btnScrollTo.addEventListener('click', function (e) {
  // Optional: prevent default behavior if button is a link
  e.preventDefault();

  // Scroll smoothly to the weather section
  weatherSection.scrollIntoView({ behavior: 'smooth' });
});