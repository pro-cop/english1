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

        $result = $mysqli->query("SELECT `word`, `id` FROM  `words` WHERE `word` LIKE '".$word."%'");
        while(  $row = $result->fetch_array(MYSQLI_ASSOC) ){
            array_push($arr, $row );
        }
        exit (get_proper_json($arr));
    }
    else if($action == 'save_word'){
        $type_id = $mysqli->real_escape_string( $_POST['type_id'] );
        $word_id = $mysqli->real_escape_string( $_POST['word_id'] );
        if( !is_integer($type_id) ){
            error_json('нет обязательных параметров word, word_id, type_id');
        }
        save_word($mysqli);
    }

    else {
        error_json('нет обработчика для action');
    }
    exit (get_proper_json('fuckin shit'));
} else {
    print_log('$_SERVER[REQUEST_METHOD])=' . $_SERVER['REQUEST_METHOD']);
}




function save_word($db){
    $word = $db->real_escape_string( $_POST['word'] );
    $query = "SELECT `word`, `id` FROM  `words` WHERE `word` = '".$word."'";
    $result = $db->query($query);
    if( $result->num_rows ){
        $row = $result->fetch_array(MYSQLI_ASSOC);
        exit( get_proper_json( array('id'=>$row['id']) ) );
    }
    else{
        $query = "INSERT INTO `words` (`word`) VALUES ('".$word."')";

        $db->query($query);
        exit( get_proper_json( array('id'=>$db->insert_id) ) );
    }
}


















