const CACHE_NAME = "smart-list-v1";

const APP_FILES = [

"/",

"/index.html",

"/manifest.json",

"/icons/icon-192.png",

"/icons/icon-512.png",

"/icons/apple-touch-icon.png"

];

self.addEventListener("install", event=>{

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>cache.addAll(APP_FILES))

);

self.skipWaiting();

});

self.addEventListener("activate",event=>{

event.waitUntil(

caches.keys().then(keys=>{

return Promise.all(

keys.filter(k=>k!==CACHE_NAME)

.map(k=>caches.delete(k))

);

})

);

self.clients.claim();

});

self.addEventListener("fetch",event=>{

if(event.request.method!=="GET") return;

event.respondWith(

caches.match(event.request)

.then(response=>{

return response || fetch(event.request);

})

);

});
