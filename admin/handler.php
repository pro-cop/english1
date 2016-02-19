<?
require_once('../php/connect.php');
$arr = array();
if ($mysqli->connect_errno) {
    die(get_proper_json(Array('error' => $mysqli->connect_errno, 'error_text' => $mysqli->connect_error)));
}
$action = (isset($_GET['action'])) ? $_GET['action'] : false;


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if ($action == 'create_sentence_rus') {
        $sentence = $mysqli->real_escape_string($_POST['text_ru']);

        $mysqli->query("INSERT into `sentence` (`text`) VALUES ('" . $sentence . "')");
        if ($mysqli->affected_rows) {
            if ($result = $mysqli->use_result()) {
                exit (get_proper_json($mysqli->insert_id));
            } else {
                exit(error_json());
            }
        } else {
            error_json((string)$mysqli->affected_rows);
        }
    }
    else if($action == 'get_words'){
        $word = $mysqli->real_escape_string( $_POST['word'] );

        $result = $mysqli->query("SELECT `word` FROM  `words` WHERE `word` LIKE '{$word}%'");
        while(  $row = $result->fetch_array(MYSQLI_ASSOC) ){
            array_push($arr, $row );
        }
        exit (get_proper_json($arr));
    }




    else {
        error_json('isset($_POST[create_sentence_rus])=' . $_POST['create_sentence_rus']);
    }
    exit (get_proper_json('fuckin shit'));
} else {
    print_log('$_SERVER[REQUEST_METHOD])=' . $_SERVER['REQUEST_METHOD']);
}