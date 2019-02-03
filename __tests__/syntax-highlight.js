const sh = require("../src/js/modules/syntax-highlight.js");

test("highlightSyntax with some mock HTML", () => {
    expect(
        sh.highlightSyntax(
            '<pre><code lang="python">def test</code></pre>',
            "python"
        )
    ).toEqual(
        '<pre><code lang="python"><span class="code-keyword">def </span>test</code></pre>'
    );

    expect(
        sh.highlightSyntax('<code lang="python">function hello()</code>', "python")
    ).toEqual('<code lang="python">function <span class="code-function">hello</span>()</code>');
});

test("highlightSyntax with invalid language", () => {
    expect(sh.highlightSyntax("<code>hello world</code>", "foo")).toEqual(
        "<code>hello world</code>"
    );
});
