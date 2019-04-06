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
