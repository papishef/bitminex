//jshint esversion:6


const User = require('../models/user');
const mongoose = require('mongoose');


(function (exports) {

    exports.test = function (id) {
        return User.findById(id)
            .then(foundUser => {

                const transactTime = new Date( foundUser.timer.time ).getMilliseconds();

                const updateClock = setInterval(function () {

                    // Get today's date and time
                    const now = new Date().getTime();

                    // Find the distance between now and the count down date
                    const distance = transactTime - now;

                    // Time calculations for days, hours, minutes and seconds
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    // Output the result in an element with id="demo"
                    const clock = document.getElementById("clockdiv");
                    const hoursSpan = clock.querySelector('.hours');
                    const minutesSpan = clock.querySelector('.minutes');
                    const secondsSpan = clock.querySelector('.seconds');

                    hoursSpan.innerHTML = ('0' + hours).slice(-2);
                    minutesSpan.innerHTML = ('0' + minutes).slice(-2);
                    secondsSpan.innerHTML = ('0' + seconds).slice(-2);

                    // If the count down is over, write some text 
                    if (distance < 0) {
                        clearInterval(updateClock);
                        document.getElementById("clockdiv").innerHTML = "<span class='text-danger'>EXPIRED</span>";
                    }
                }, 1000);


            });
    };

}(typeof exports === 'undefined' ? this.share = {} : exports));