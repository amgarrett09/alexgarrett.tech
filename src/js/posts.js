require("@babel/polyfill");
const { highlightSyntax } = require("./modules/syntax-highlight.js");

// Finds all instances of '&amp;'
const re_amps = /&amp;/g;

document
    .querySelectorAll("code")
    .forEach(
        block => (block.innerHTML = block.innerHTML.replace(re_amps, "&"))
    );

/* Unhide everything once above scripts complete */
document
    .querySelectorAll(".start-hidden")
    .forEach(e => e.classList.remove("start-hidden"));

/* syntax highlighting */
const codeBlocks = document.querySelectorAll("pre > code");
codeBlocks.forEach(block => {
    const lang = "python";
    block.innerHTML = highlightSyntax(block.innerHTML, lang);
});
