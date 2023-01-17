<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
header("Content-Type: text/plain");
if($_POST){
    include "config.php";
    $userid = $_POST['userid'];
    $passw = $_POST['password'];
    $sql = "SELECT * FROM users WHERE mobile='$userid' AND user_password = '$passw'";
    $login = $conn->query($sql);
    if ($login->num_rows > 0){
        $res = mysqli_fetch_assoc($login);
        $userid = $res['userid'];
        $name = $res['fullname'];
        $role = $res['user_role'];
        $branch = $res['branch'];
        $password = md5($res['user_password']);

        //Creating Token
        $token = '{"userid":"'.$userid.'","name":"'.$name.'","type":"'.$role.'","token":"'.$password.'","auth":"True","branch":"'.$branch.'"}';
        echo $token;
    }else{
        $token = '{"auth":"False"}';
        echo $token;
    }    
}else{
    echo "Invalid";
}
?>
