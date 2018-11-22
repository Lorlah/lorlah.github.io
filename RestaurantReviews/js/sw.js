//Listening for an installation event
let cacheName = 'v3';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                '../',
                '../data/restaurants.json',
                '../css/styles.css',
                '../img/1.jpg',
                '../img/2.jpg',
                '../img/3.jpg',
                '../img/4.jpg',
                '../img/5.jpg',
                '../img/6.jpg',
                '../img/7.jpg',
                '../img/8.jpg',
                '../img/9.jpg',
                '../img/10.jpg',
                '../js/dbhelper.js',
                '../js/main.js',
                '../js/restaurant_info.js',
                '../index.html',
                '../restaurant.html'
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
	console.log("[Service Worker] Activated");

	event.waitUntil(
		// Loop through all the keys of the caches to compare them
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {
				// Compare the cache names. If they are not equal, delete
				//   the old caches to update the cache with the new caches.
				
				if (thisCacheName !== cacheName) {
					console.log("[Service Worker] Removing Cached Files from", thisCacheName);
					return caches.delete(thisCacheName);
				}
			}))
		})
	)
});
 
// listening for a fetch event
self.addEventListener('fetch', function(event) {
    event.respondWith(

        // find out if the event request already exists within the cache
        caches.match(event.request).then(function(response) {
            if(response) {
                console.log('[ServiceWorker] found in cache', event.request.url);
            return response;

        } else {
            // if request doesn't already exist, fetch normally
            return fetch(event.request)

                // chaining the then method that takes the response from fetch
                .then(function(response) {
                    const cloningResponse = response.clone();
                    // open the cache
                    caches.open(cacheName).then(function(cache) {

                        // use the put method to pair the request with a response
                        cache.put(event.request, cloningResponse);
                    })
                    return response;
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
        })
    );
});
