let hammy = document.querySelector('#hamburger');
let hamLinks = document.querySelector('header .links');
let switchOn = document.querySelector('.mobActive');

function mobileNavActivate() {
    hamLinks.classList.toggle('mobActive');
}

// Add click event to hamburger menu
hammy.addEventListener('click', mobileNavActivate);

// Add click event to document to close menu when clicking outside
document.addEventListener('click', function(event) {
    // Check if click is outside of both hamburger and links
    if (!hammy.contains(event.target) && !hamLinks.contains(event.target) && hamLinks.classList.contains('mobActive')) {
        hamLinks.classList.remove('mobActive');
    }
});

// Optional: If you have a specific X button, add this
let closeButton = document.querySelector('#close');
closeButton.addEventListener('click', function() {
    hamLinks.classList.remove('mobActive');
});