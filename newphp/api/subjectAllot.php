<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
header("Content-Type: text/plain");
if($_POST){
    include "config.php";
    //Getting Data
    $userid = $_POST['userid'];
    $token = $_POST['token'];

    //Token Verification
    $req = "SELECT * FROM users WHERE userid='$userid'";
    $res= $conn->query($req);
    $result = mysqli_fetch_assoc($res);
    if($token == md5($result['user_password'])){
    //Logic
    $subject = $_POST['subject'];
    $teacher = $_POST['teacher'];
    $sem = $_POST['sem'];
    $branch = $_POST['branch'];

    $sql = "INSERT INTO subjectalloted (teacher,sub,sem,branch)VALUES('$teacher','$subject','$sem','$branch')";
    $res = $conn->query($sql);
    if($res){
        echo $res;
    }else{
    echo "Already Alloted";
    }}
}else{
    echo "Failed";
} 

?>
