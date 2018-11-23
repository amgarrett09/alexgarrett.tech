import re

# Used to find & characters that aren't part of escaped characters
amp_expression = re.compile(r'&(?!(?:amp;|quot;|#39;|gt;|lt;))', re.IGNORECASE)

def html_escape(st):
    """
    Takes a string and escapes <, >, ', ", and & characters. In the case of
    ampersands, they are only escaped if they are not part of a character which
    is already escaped.
    """

    # Error handling:
    if type(st) != type("a"):
        raise TypeError('Input must be a string')

    # Main logic
    output = (
        st.replace('<', '&lt;').replace('>', '&gt;')
            .replace('\'', '&#39;').replace('\"', '&quot;')
    )
    # The regex finds all &'s that aren't part of already-escaped characters
    output = amp_expression.sub('&amp;', output)

    return output

# Finds a space immediately following the opening of an 'img' tag
img_class_exp = re.compile(r"(?<=\<img) ", re.IGNORECASE)

def make_responsive_images(st):
    return img_class_exp.sub(' class="img-fluid" ', st)