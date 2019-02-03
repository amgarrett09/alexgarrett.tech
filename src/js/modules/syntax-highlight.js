// python highlighting
const pyComment = /(#.+)/g;
const pyStringSingle = /((?:\').*?(?:\'))/g;
const pyStringDouble = /((?:\\").*?(?:\\"))/g;
const pyFunction = /\b([a-z_]+[a-zA-Z_]*)(?=\()/g;
const pyKeywords = /\b(def |lambda |in |import |from )/g;
const pyControl = /\b(return |if |elif |else |while |for |try: |except: )/g;
const pyRegexArray = [
    [pyComment, "comment"],
    [pyStringSingle, "string"],
    [pyStringDouble, "string"],
    [pyFunction, "function"],
    [pyKeywords, "keyword"],
    [pyControl, "control"]
];

const langDict = { python: pyRegexArray };

function highlightSyntax(st, lang) {
    if (!(lang in langDict)) {
        return st;
    }

    let result = st;
    langDict[lang].forEach(pair => {
        result = result.replace(
            pair[0],
            `<span class="code-${pair[1]}">$1</span>`
        );
    });
    return result;
}

module.exports = { highlightSyntax };
