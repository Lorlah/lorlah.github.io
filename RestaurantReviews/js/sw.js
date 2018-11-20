

//Listening for an installation event
let cacheName = 'v1';
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                './'
                ]);
        })
    );
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
                        caches.open('v1').then(function(cache) {

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
})

// const cacheFiles = 
