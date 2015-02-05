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
    $code = $_POST['code'];
    $request_id = uniqid();
    $code = preg_replace_callback(
            "/((hist|plot|boxplot)\(.*?\))/",
            function($matches) {
                    $image_id = uniqid();

                    $result = "print('<img src=";
                    $result .= '"';
                    $result .= "./dumps/graphics/{$image_id}.png";
                    $result .= '">';
                    $result .= "')\n";
                    $result .= 'png(filename="';
                    $result .= "./dumps/graphics/{$image_id}.png";
                    $result .= '", width=500, height=500)';
                    $result .= "\n";
                    $result .= $matches[0];
                    $result .= "\ngraphics.off()\n";
                    return $result;
            },
            $code);
    $output = array();
    file_put_contents("./dumps/code/{$request_id}.r", $code);
    exec("Rscript ./dumps/code/{$request_id}.r", $output);
    $response = array("code" => stripslashes(implode($output)));
    echo json_encode($response);
}

function upload() {
    echo "I'm uploading";
}
?>
