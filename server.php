<?php
if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'compile':
            compile();
            break;
        case 'download':
            download();
            break;
        case 'upload':
            upload();
            break;
    }
}

function compile() {
    $response = array("text" => "Compiling");
    $code = $_POST['code']; 
    $code = preg_replace("/(hist\(.*?\))/", "print(\"<img src='temp.png'>\") \n$1", $code);
    $code = preg_replace("/(hist\(.*?\))/", "png(filename=temp.png, width=100, height=100)\n$1\ngraphics.off()", $code);
    file_put_contents("main.r", $code);
    exec("Rscript main.r > result");
    $nocache = rand();
    $response = array("code" => file_get_contents("./result"));
    echo json_encode($response);
}

function download() {
    echo "I'm downloading";
}

function upload() {
    echo "I'm uploading";
}
?>
