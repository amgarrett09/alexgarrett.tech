from lxml import html
from lxml import etree
import re
from functools import reduce

RE_FUNCTION = re.compile(r'\b([a-z]+[a-zA-Z_]*)(?=\()', re.M)
RE_STRING = re.compile(r'((?:&quot;|&#39;).+?(?:&quot;|&#39;))', re.M)
RE_COMMENT = re.compile(r'((?<!\S)(?:\/\/|#).+)', re.M)
KEYWORDS = [
    'def ', 'function ', 'fn ', '=&gt;', 'import ', 'from ', 'let ', 'mut ',
    'const ', 'var ', 'lambda ', 'pub ', 'use ',
]
LOGIC_WORDS = [
    'return ', 'if ', 'elif ', 'else ', 'else if',  'while ',
    'for ', 'loop', 'await ', 'try '
]

def highlight_text(st):
    tree = html.fromstring(st)
    code_blocks = tree.findall(".//pre/code")
    for block in code_blocks:
        output = block.text

        # Highlight comments
        output = highlight_with_regex(output, RE_COMMENT, 'comment')

        # Highlight strings
        output = highlight_with_regex(output, RE_STRING, 'string')

        # Highlight functions
        output = highlight_with_regex(output, RE_FUNCTION, 'function')

        # Highlight keywords
        for word in KEYWORDS:
            new = '<span class="code-keyword">' + word + '</span>'
            output = output.replace(word, new)

        # Highlight logic words (like 'if' or 'for)
        for word in LOGIC_WORDS:
            new = '<span class="code-logic">' + word + '</span>'
            output = output.replace(word, new)

        block.text = etree.CDATA(output)

    return etree.tostring(tree, encoding="unicode", method="html")

def highlight_with_regex(text, regex, type):
    span = '<span class="code-{}">'
    span = span.format(type)

    format_string = regex.sub("{}", text)
    matches = regex.findall(text)
    wrapped = map(lambda x: span + x + "</span>", matches)

    output = reduce(lambda acc,word: acc.replace("{}", word, 1), wrapped, format_string)
    return output
