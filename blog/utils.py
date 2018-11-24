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
    if not isinstance(st, str):
        raise TypeError('html_escape must be called on a string')

    # Main logic
    output = (
        st.replace('<', '&lt;').replace('>', '&gt;')
            .replace('\'', '&#39;').replace('\"', '&quot;')
    )
    # The regex finds all &'s that aren't part of already-escaped characters
    output = amp_expression.sub('&amp;', output)

    return output