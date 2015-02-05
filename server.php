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
    $uuid = uniqid();
    $old_code = $code;
    $imgid = 0;
    do {
        $imgid++;
        $old_code = $code;
        $code = preg_replace("/((hist|plot|boxplot)\(.*?\))(?<!\ngraphics)/", "print(\"<img src='{$uuid}-{$imgid}.png'>\") \n$1", $code);
        $code = preg_replace("/((hist|plot|boxplot)\(.*?\))(?<!\ngraphics)/", "png(filename=\"{$uuid}-{$imgid}.png\", width=500, height=500)\n$1\ngraphics.off()", $code);
    } while ($imgid < 4);
    file_put_contents("{$uuid}-main.r", $code);
    exec("Rscript {$uuid}-main.r > {$uuid}");
    $response = array("code" => file_get_contents("./{$uuid}"));
    echo json_encode($response);
}

function download() {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.basename('main.r'));
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    echo readfile("./main.r");
}

function upload() {
    echo "I'm uploading";
}
?>
