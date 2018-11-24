let codeBlocks = document.querySelectorAll('code');

// Finds all instances of '&amp;'
const re = /&amp;/g;

/* Used to undo the double-escaping of ampersands in code blocks that the
mardownify function unfortunately introduces. */
for (let block of codeBlocks) {
  block.innerHTML = block.innerHTML.replace(re, '&');
}

let images = document.querySelectorAll('img');

for (let img of images) {
    img.classList = "img-fluid";
}

$('.start-hidden').removeClass('start-hidden');
