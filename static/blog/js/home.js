const popupDict = {"django-blog-button": "django-blog-popup"};

const projectButtons = document.querySelectorAll(".projectdetail");

const closelinks = document.querySelectorAll(".close-popup");

// Setting up buttons to display detail about projects
projectButtons.forEach((button) => {
    button.addEventListener("click", function() {
        const popupId = popupDict[this.id];
        const popup = document.getElementById(popupId);
        popup.classList.toggle("pop-disabled");
        popup.classList.toggle("active-popup");
    });
});

// Setting up links to close popups
closelinks.forEach((link) => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const activePopup = document.querySelector(".active-popup");
        activePopup.classList.toggle("active-popup");
        activePopup.classList.toggle("pop-disabled");
    })
})

// Smooth scrolling
const links = document.querySelectorAll("a");
links.forEach(link => {
    if (link.hash) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            document.querySelector(this.hash)
                .scrollIntoView({behavior: 'smooth'});
        });
    }
});