const pyComment = /^(?:(?!\s))(#.+)/g;
const pyStringSingle = /((?:&#39;).*?(?:&#39;))/g;
const pyStringDouble = /((?:&quot;).*?(?:&quot;))/g;
const pyFunction = /\b([a-z_]+[a-zA-Z_]*)(?=\()/g;
const pyKeywords = /\b(def |lambda )/g;
const pyControl = /\b(return |if |elif |else |while |for |try |in )/g;
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
        result = result.replace(pair[0], `<span class="code-${pair[1]}">$1</span>`);
    });
    return result;
}

module.exports = { highlightSyntax };