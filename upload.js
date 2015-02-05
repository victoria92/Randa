window.onload = function () {
    var fileInput = document.getElementById('fileInput');
    var code = document.getElementById('code');
    fileInput.addEventListener('change', function (e) {
        var file = fileInput.files[0];
        var textType = /text.*/;
        if (file.type.match(textType)) {
            var reader = new FileReader();
            reader.onload = function (e) {
                code.innerText = reader.result;
            };
            reader.readAsText(file);
        } else {
            console.log(file.type);
        }
    });
};
