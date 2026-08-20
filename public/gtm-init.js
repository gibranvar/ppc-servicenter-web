window.dataLayer = window.dataLayer || [];

window.dataLayer.push({
  'gtm.start': new Date().getTime(),
  event: 'gtm.js',
});

const script = document.createElement('script');

script.async = true;
script.src =
  'https://www.googletagmanager.com/gtm.js?id=GTM-WMPDG6KZ';

document.head.appendChild(script);