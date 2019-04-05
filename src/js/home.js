const popupDict = {
  "django-blog-button": "django-blog-popup",
  "audible-sights-button": "audible-sights-popup",
  "hockey-scrub-button": "hockey-scrub-popup",
  "css-minifier-button": "css-minifier-popup",
};

const projectButtons = document.querySelectorAll(".projectdetail");

const closelinks = document.querySelectorAll(".close-popup");

// Setting up buttons to display detail about projects
projectButtons.forEach(button => {
  button.addEventListener("click", function() {
    const popupId = popupDict[this.id];
    const popup = document.getElementById(popupId);
    popup.classList.toggle("pop-disabled");
    popup.classList.toggle("active-popup");
    popup.setAttribute("aria-hidden", "false");

    projectButtons.forEach(button => button.setAttribute("disabled", ""));
  });
});

// Setting up links to close popups
closelinks.forEach(link => {
  link.addEventListener("click", function(event) {
    event.preventDefault();
    const activePopup = document.querySelector(".active-popup");
    activePopup.classList.toggle("active-popup");
    activePopup.classList.toggle("pop-disabled");
    activePopup.setAttribute("aria-hidden", "true");

    projectButtons.forEach(button => button.removeAttribute("disabled"));
  });
});

// Smooth scrolling
const links = document.querySelectorAll("a");
links.forEach(link => {
  if (link.hash) {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      document.querySelector(this.hash).scrollIntoView({ behavior: "smooth" });
    });
  }
});

// Setting focus to main content when user clicks "skip to main content"
const skipLink = document.querySelector(".skip-to-content");
skipLink.addEventListener("click", () =>
  document.querySelector(".learnmore").focus()
);
