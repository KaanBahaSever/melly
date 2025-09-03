
document.addEventListener('DOMContentLoaded', function() {
    // if device is mobile show only one instagram photo and change every 5 seconds
    if (window.innerWidth <= 768) {
        const photos = document.querySelectorAll('.insta-photo');
        let current = 0;

        // Hide all photos except the first one
        photos.forEach((photo, index) => {
            if (index !== current) {
                photo.style.display = 'none';
            }
        });

        setInterval(() => {
            photos[current].style.display = 'none';
            current = (current + 1) % photos.length;
            photos[current].style.display = 'block';
        }, 3000);
    }
});
 
//scroll event
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 65);


});
