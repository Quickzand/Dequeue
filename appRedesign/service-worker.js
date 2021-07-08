importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js");
workbox.routing.registerRoute(
  /\.(?:css|js)$/,
  new workbox.strategies.StaleWhileRevalidate({
    "cacheName": "assets",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 1800
      })
    ]
  })
);



workbox.routing.registerRoute(
  /images\.(?:png|jpg|gif)$/,
  new workbox.strategies.CacheFirst({
    "cacheName": "images",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 1800
      })
    ]
  })
);


workbox.precaching.precacheAndRoute([])
//
// const cacheName = "chache-v1";
// const resourcesToPrecache = [
//   '/',
//   '/index.html',
//   'css/',
//   'icons/',
//   'js/',
//   'images/',
//   'libraries/'
// ]
//
//
//
// self.addEventListener('install', event => {
//   console.log("service Worker Install Event!");
//   event.waitUntil(
//     caches.open(cacheName).then(cache => {
//       return cache.addAll(resourcesToPrecache);
//     })
//   )
// })