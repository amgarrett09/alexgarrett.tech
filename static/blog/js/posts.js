let codeBlocks = document.querySelectorAll('code');

const re = /&amp;/g;

for (let block of codeBlocks) {
  block.innerHTML = block.innerHTML.replace(re, '&');
}
