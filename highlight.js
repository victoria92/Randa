numbers = /\b(\d+\.?\d?)\b/g;
numFunctions = /\b(abs|sqrt|ceiling|floor|trunc|round|signif|cos|sin|tan|log|log10|exp)\b/g;
charFunctions = /\b(substr|grep|sub|strsplit|paste|toupper|tolower)\b/g;
statsFunctions = /\b((d|p|q|r)(norm|binom|pois|unif))\b/g;
otherFunctions = /\b(mean|sd|median|quantile|range|sum|diff|min|max|scale|seq|rep|cut|c)\b/g;
controlStructures = /\b(if|else|for|while|switch|ifelse)\b/g;
boolValues = /\b(TRUE|FALSE|T|F|NULL)\b/g;
brackets = /(\[|\]|\(|\))/g;

currentWord = "";

var highlightFunctions = function(text) {
    text = text.replace(numFunctions, "<font color='blue'>" + "$1" + "</font>");
    text = text.replace(charFunctions, "<font color='blue'>" + "$1" + "</font>");
    text = text.replace(statsFunctions, "<font color='blue'>" + "$1" + "</font>");
    text = text.replace(otherFunctions, "<font color='blue'>" + "$1" + "</font>");
    return text;
};

var highlightStrings = function(text) {
    return text.replace(/(".*?")/g, "<font color='red'>" + "$1" + "</font>");
};

var highlightComments = function(text) {
    return text.replace(/(#.*?$)/mg, "<font color='grey'>" + "$1" + "</font>");
};

var highlight = function(text) {
    text = text.replace(brackets, "<font color='green'>" + "$1" + "</font>");
    text = highlightComments(text);
    text = highlightFunctions(text);
    text = highlightStrings(text);
    text = text.replace(numbers, "<font color='pink'>" + "$1" + "</font>");
    text = text.replace(controlStructures, "<b>" + "$1" + "</b>");
    text = text.replace(boolValues, "<font color='red'>" + "$1" + "</font>");
    return text;
}

$(document).ready(function() {
$("#main").on("keyup", "pre", function(event) {
    var text = $("#code").text();
        var character = String.fromCharCode(event.which);
        text = text.replace(/(^.*?$)/mg, "<span class='row' contenteditable=true>" + "$1" + "</span>");
         if (event.keyCode !== 13) {
            if (event.which !== 0) {
               // text = highlight(text);
               // $("#code").html(text);
            }
        }
        if (event.keyCode === 13) {
            html = $("#code").html();
            html = html.replace(/(<div>|<br>)/g, "\n");
            html = html.replace(/<\/div>/g, "");
            $("#code").html(html);
        }

        var line_num = $("#main .line-number");
        line_num.html("");
        var linesNumber = $("#code").html().split(/\n/).length;
        for (var i = 0; i < linesNumber; i++) {
            line_num.html(line_num.html() + '<span>' + (i + 1) + '</span>');
        }
    });

    $("#main").on("keyup", "span", function(event) {
        var text = $(this).text();
    });

    $("#style").click(function() {
        var text = $("#code").text();
        text = text.replace(/if\(/g, "if (");
        text = text.replace(/(=|\+|-|\*|\\|>|<)(?=\S)/g, "$1 ");
        text = text.replace(/(\S)(=|\+|-|\*|\\|>|<)/g, "$1 $2");
        text = text.replace(/(\S)(=|\+|-|\*|\\|>|<)/g, "$1 $2");
        text = text.replace(/(,)(?=\S)/g, ", ");
        text = text.replace(/ ,/g, ",");
        text = text.replace(/< -/g, "<-");
        $("#code").html(highlight(text));
    });

    $("#compile").click(function() {
        var ajaxurl = 'server.php',
        data =  {'action': 'compile', 'code': $("#code").text()};
        $.post(ajaxurl, data, function (response) {
            response = jQuery.parseJSON(response);
            $("#result").html(response.code);
        });
    });

    $("#download").click(function() {
        var ajaxurl = 'server.php',
        data = {'action': 'download', 'code': $("#code").text()};
        $.post(ajaxurl, data, function (response) {
            alert("Downloading...");
        });
    });
});

