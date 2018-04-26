function unindent(str) {
    var lines = (str || "").replace("\t", "    ").split("\n");
    var minIndent = Number.MAX_VALUE;
    for (var i = 0; i < lines.length; i++) {
        if (lines[i] != "") {
            var leading = lines[i].length - lines[i].trimLeft().length;
            minIndent = leading < minIndent ? leading : minIndent;
        }
    }
    if (minIndent > 0 && minIndent < Number.MAX_VALUE)
    {
        for (var i = 0; i < lines.length; i++) {
            if (lines[i] != "") {
                lines[i] = lines[i].substring(minIndent);
            }
        }
    }
    return lines.join("\n");
}

var converter = new showdown.Converter();
$(".md").each(function (i, el) {
    var md = unindent(el.textContent);
    var html = converter.makeHtml(md);
    el.innerHTML = html;
});

$(".dot").each(function (i, el) {
    var dot = el.textContent;
    var graph = "digraph G {\n";
    if (!$(el).hasClass("td")) {
        graph += "   rankdir=LR;";
    }
    graph += "    graph[splines=line];";
    graph += "    node[orientation=90 fontname=\"Roboto Condensed\" style=filled fixedsize=true shape=house fillcolor=\"#47c3dc\" color=\"#ffffff\" fontcolor=\"#ffffff\" fontsize=10];";
    graph += "    edge[fontname=\"Roboto Condensed\" style=\"dashed\" color=\"#AAAAAA\" fontsize=6 dir=none];";
    graph += (dot + "\n");
    graph += "}"
    var svg = Viz(graph);
    el.innerHTML = svg;
});

hljs.initHighlightingOnLoad();
hljs.initLineNumbersOnLoad();
