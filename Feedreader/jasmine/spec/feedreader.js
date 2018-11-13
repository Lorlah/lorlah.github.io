/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*  a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url should be defined', function() {
            for( let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /*  a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name ahould be defined', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        })
    });


    /*  a new test suite named "The menu" */
    describe('The menu', function() {
        /*  a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         it('menu should be hidden', function() {
             const body = document.querySelector('body');
             expect(body.classList.contains('menu-hidden')).toBe(true);
         })

         /*  a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('changes visibility when clicked', function() {
            const menu = document.querySelector('.menu-icon-link');
            const body = document.querySelector('body');

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
         });
    });


    /*  a new test suite named "Initial Entries" */
            describe('Initial Entries', function() {
                /*  a test that ensures when the loadFeed
                 * function is called and completes its work, there is at least
                 * a single .entry element within the .feed container.
                 * Remember, loadFeed() is asynchronous so this test will require
                 * the use of Jasmine's beforeEach and asynchronous done() function.
                 */
                beforeEach(function(done) {
                    loadFeed(0, done);
                });

                it('work should be complete', function(){
                    const entries = document.querySelectorAll('.feed .entry').length;
                    expect(entries > 0).toBe(true);
                });

            });

    /*  a new test suite named "New Feed Selection" */
            describe('New Feed Selection', function() {
                const feed = document.querySelector('.feed');
                // store the content of the initialFeed; feed in the array variable

                const initialFeed = [];
                /*  a test that ensures when a new feed is loaded
                 * by the loadFeed function that the content actually changes.
                 * Remember, loadFeed() is asynchronous.
                 */
                beforeEach(function(done) {
                    loadFeed(0, function() {
                        //    convert the children elements of the feed into an array, 
                        // loop over each item, and push the content of it's innertext into the initialFeed array
        
                           Array.from(feed.children).forEach(function(item) {
                                initialFeed.push(item.innerText);
                           });
                       
                           loadFeed(1, done);
                   });

s                });

                it('content should actually change', function() {
                //convert the children elements of the feed into an array, 
                // loop over each item
                // index parameter compares the new feed to initial one
                Array.from(feed.children).forEach(function(item, index) {
                    console.log(item.innerText, initialFeed[index], item.innerText === initialFeed[index]);

                    expect(item.innerText === initialFeed[index]).toBe(false);
                    console.log(item.innerText, initialFeed[index], item.innerText === initialFeed[index]);

                });
            });
        });
}());
