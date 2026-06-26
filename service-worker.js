const CACHE_NAME = "smartlist-v1";

const APP_FILES = [

"/Pwa/",

"/Pwa/index.html",

"/Pwa/manifest.json",

"/Pwa/icons/icon-192.png",

"/Pwa/icons/icon-512.png",

"/Pwa/icons/apple-touch-icon.png",

"/Pwa/icons/maskable-512.png"

];

self.addEventListener("install",event=>{

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

.then(r=>r||fetch(event.request))

);

});
