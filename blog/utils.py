from lxml import html
from lxml import etree
import re
from functools import reduce
import bleach

RE_FUNCTION = re.compile(r'\b([a-z_]+[a-zA-Z_]*)(?=\()', re.M)
RE_COMMENT = re.compile(r'((?<!\S)(?:\/\/|#).+)', re.M)
RE_STRING_SINGLE = re.compile(r'(?:&#39;).*?(?:&#39;)', re.M)
RE_STRING_DOUBLE = re.compile(r'(?:&quot;).*?(?:quot;)', re.M)

RE_KEYWORDS = re.compile(r'\b(def |function |fn |=&gt; |import |from |let |mut |const |var |lambda |pub |use )', re.M)
RE_CONTROL_WORDS = re.compile(r'\b(return |if |elif |else |else if |while |for |loop |await |try |in )', re.M)

# Pairs of regex and descriptions which will be used in the
#'highlight_with_regex' function
REGEX_LIST = [
    (RE_FUNCTION, 'function'), (RE_COMMENT, 'comment'),
    (RE_STRING_SINGLE, 'string'), (RE_STRING_DOUBLE, 'string'),
    (RE_KEYWORDS, 'keyword'), (RE_CONTROL_WORDS, 'control')
]

def highlight_text(st):
    tree = html.fromstring(st)
    code_blocks = tree.findall(".//pre/code")
    for block in code_blocks:
        output = block.text
        output = output.replace("{}", "&#123;&#125;")

        # highlight keywords with regular expressions in REGEX_LIST
        for e in REGEX_LIST:
            output = highlight_with_regex(output, e[0], e[1])

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
