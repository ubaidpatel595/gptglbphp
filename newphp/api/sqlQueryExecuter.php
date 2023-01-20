<?php header('Access-Control-Allow-Origin: *'); ?>
<?php  //This Api needs userid,token,query it executes create,update,delete querys  ?>
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
    $queryType = $_POST['queryType'];
    $getquery = $_POST['query'];
    //echo $getquery;
    $res = $conn->multi_query($getquery);
    echo $res;        
    }else{
       echo "Failed";
    }
    }else{
        $token = '[{"auth":"False"}]';
       echo $token;
    }    
?>
