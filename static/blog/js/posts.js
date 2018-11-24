let codeBlocks = document.querySelectorAll('code');

// Finds all instances of '&amp;'
const re = /&amp;/g;

/* Used to undo the double-escaping of ampersands in code blocks that the
mardownify function unfortunately introduces. */
for (let block of codeBlocks) {
  block.innerHTML = block.innerHTML.replace(re, '&');
}
