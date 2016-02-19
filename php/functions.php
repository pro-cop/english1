<?php
//phpinfo();

function get_proper_json($obj){
    if( is_numeric($obj) || is_string($obj) ){
        $obj = Array(Array('res'=>$obj));
    }
    else if( is_assoc($obj) ){
        $obj = Array($obj);
    }
    return json_encode($obj);
}

function is_assoc($array) {
    foreach (array_keys($array) as $k => $v) {
        if ($k !== $v)
            return true;
    }
    return false;
}
function print_log($text){
    error_log($text, 3, "../log/log.txt");
}
function error_json($err_text='unknown error', $err_no=0){
    return get_proper_json( Array( 'error' => $err_no, 'error_text' => $err_text ) );
}