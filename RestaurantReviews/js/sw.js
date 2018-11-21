

//Listening for an installation event
let cacheName = 'v1';
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                '/RestaurantReviews/',
                '/RestaurantReviews/data/restaurants.json',
                '/RestaurantReviews/css/styles.css',
                '/RestaurantReviews/img/1.jpg',
                '/RestaurantReviews/img/2.jpg',
                '/RestaurantReviews/img/3.jpg',
                '/RestaurantReviews/img/4.jpg',
                '/RestaurantReviews/img/5.jpg',
                '/RestaurantReviews/img/6.jpg',
                '/RestaurantReviews/img/7.jpg',
                '/RestaurantReviews/img/8.jpg',
                '/RestaurantReviews/img/9.jpg',
                '/RestaurantReviews/img/10.jpg',
                '/RestaurantReviews/js/dbhelper.js',
                '/RestaurantReviews/js/main.js',
                '/RestaurantReviews/js/restaurant_info.js',
                '/RestaurantReviews/index.html',
                '/RestaurantReviews/restaurant.html'
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
