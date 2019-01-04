from lxml import html
from lxml import etree
import re
from functools import reduce
import bleach

RE_FUNCTION = re.compile(r'\b([a-z]+[a-zA-Z_]*)(?=\()', re.M)
RE_COMMENT = re.compile(r'((?<!\S)(?:\/\/|#).+)', re.M)
RE_STRING_SINGLE = re.compile(r'(?:&#39;).*?(?:&#39;)', re.M)
RE_STRING_DOUBLE = re.compile(r'(?:&quot;).*?(?:quot;)', re.M)

KEYWORDS = [
    'def ', 'function ', 'fn ', '=&gt;', 'import ', 'from ', 'let ', 'mut ',
    'const ', 'var ', 'lambda ', 'pub ', 'use ',
]
CONTROL_WORDS = [
    'return ', 'if ', 'elif ', 'else ', 'else if',  'while ',
    'for ', 'loop', 'await ', 'try ', 'in '
]

def highlight_text(st):
    tree = html.fromstring(st)
    code_blocks = tree.findall(".//pre/code")
    for block in code_blocks:
        output = block.text
        output = output.replace("{}", "&#123;&#125;")

        # Highlight comments
        output = highlight_with_regex(output, RE_COMMENT, 'comment')

        # Highlight strings
        output = highlight_with_regex(output, RE_STRING_SINGLE, 'string')
        output = highlight_with_regex(output, RE_STRING_DOUBLE, 'string')

        # Highlight functions
        output = highlight_with_regex(output, RE_FUNCTION, 'function')

        # Highlight keywords
        for word in KEYWORDS:
            new = '<span class="code-keyword">' + word + '</span>'
            output = output.replace(word, new)

        # Highlight control flow words (like 'if' or 'for')
        for word in CONTROL_WORDS:
            new = '<span class="code-control">' + word + '</span>'
            output = output.replace(word, new)

        block.text = etree.CDATA(output)

    return etree.tostring(tree, encoding="unicode", method="html")

def highlight_with_regex(text, regex, desc):
    span = '<span class="code-{}">'
    span = span.format(desc)

    format_string = regex.sub("{}", text)
    matches = regex.findall(text)
    wrapped_words = map(lambda x: span + x + "</span>", matches)

    output = reduce(lambda acc,word: acc.replace("{}", word, 1), wrapped_words, format_string)
    return output


def html_escape(text):
    output = bleach.clean(text)
    output = output.replace("\"", "&quot;").replace("\'", "&#39;")

    return output
