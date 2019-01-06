// Finds all instances of '&amp;'
const re_amps = /&amp;/g;


let codeBlocks = document.querySelectorAll('code');

for (let block of codeBlocks) {
    block.innerHTML = block.innerHTML.replace(re_amps, '&');
}


/* Unhide everything once above scripts complete */
let hiddenElements = document.querySelectorAll('.start-hidden');
for (let e of hiddenElements) {
    e.classList.remove('start-hidden');
}
