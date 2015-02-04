number_regex = /(\d+.?\d?)/;
current_word = "";

$(document).ready(function() {
    $("#main").on("keyup", "pre", function(event) {
        var text = $("#code").text();
        console.log(text);
        var character = String.fromCharCode(event.which);
        if (event.which !== 0) {
            text = text.replace(/(\[|\])/g, "<font color='green'>" + "$1" + "</font>");
            text = text.replace(/(\d+\.?\d*)/g, "<font color='pink'>" + "$1" + "</font>");
            text = text.replace(/(<font color=("|')\w*("|')>)+/g, "$1");
            text = text.replace(/(<\/font>)+/g, "$1");
            console.log(text);
            $("#code").html(text);
        }
    });
});
