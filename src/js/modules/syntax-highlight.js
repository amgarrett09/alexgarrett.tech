// python highlighting
const pyComment = /(\s#.+)/g;
const pyMultiLineComment = /("""(?:\s.+)+""")/g;
const pyStringSingle = /((?:\').*?(?:\'))/g;
const pyStringDouble = /((?:\").*?(?:\"))/g;
const pyFunction = /\b([a-z_]+[a-zA-Z_]*)(?=\()/g;
const pyKeywords = /\b(def |lambda |in |import |from |class )/g;
const pyControl = /\b(return |if |elif |else |while |for |try:|except | except:)/g;
const pyObject = /\b([A-Z]+[a-zA-Z]+)(?=(?:\(|\.|:|\n))/g;

/* Pairs of regexes and a string to be used in a span class name. 
Unfortunately the order here matters because of quirks in how innerHTML works. 
Double-quote strings must be first */
const pyRegexArray = [
    [pyStringDouble, "string"],
    [pyComment, "comment"],
    [pyStringSingle, "string"],
    [pyFunction, "function"],
    [pyKeywords, "keyword"],
    [pyControl, "control"],
    [pyObject, "object"]
];

const langDict = { python: pyRegexArray };

function highlightSyntax(st, lang) {
    if (!(lang in langDict)) {
        return st;
    }

    let result = st;
    // find the correct regex array, and match-and-replace elements for each regex
    langDict[lang].forEach(pair => {
        result = result.replace(
            pair[0],
            `<span class="code-${pair[1]}">$1</span>`
        );
    });
    return result;
}

module.exports = { highlightSyntax };
