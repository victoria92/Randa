<?php
    $code = $_POST['code'];
    $request_id = uniqid();
    file_put_contents("./dumps/code/{$request_id}.r", $code);
    $file = "./dumps/code/{$request_id}.r";
    echo $file;
?>
