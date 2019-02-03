from lxml import html
from lxml import etree
import bleach

def html_escape(text):
    output = bleach.clean(text)
    output = output.replace("\"", "&quot;").replace("\'", "&#39;")

    return output
