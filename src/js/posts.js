// Finds all instances of '&amp;'
const re_amps = /&amp;/g;

document
    .querySelectorAll("code")
    .forEach(
        block => (block.innerHTML = block.innerHTML.replace(re_amps, "&"))
    );


