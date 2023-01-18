<?php header('Access-Control-Allow-Origin: *'); ?>
<?php  //This Api needs userid,token,query,querytype ?>
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

    if($queryType == "read"){
        $res = $conn->query($getquery);
        
        if ($res->num_rows>0){
        while($row = $res->fetch_assoc()) {
            $str =$str.'{"reg":"'.$row['userid'].'","name":"'.$row['fullname'].'","sem":"'.$row['sem'].'"},';
          }
        $str = substr($str,0,-1);
        $str =$str."]";
        //$result = mysqli_fetch_assoc($res);
        echo   $str;
        }else{
            echo '[{"reg":"no reg","name":"No Students Found","sem":"0"}]';
        }        
    }else{
        $res = $conn->query($getquery);
        echo $res;
    }
        
    }else{
        echo "Failed";
    }
    }else{
        $token = '[{"auth":"False"}]';
        echo $token;
    }    
?>
