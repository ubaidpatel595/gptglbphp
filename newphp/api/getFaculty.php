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
        $sql = "SELECT * FROM users WHERE branch='$result[branch]' AND user_role= 'FACULTY'";
        $res = $conn->query($sql);
        $str =  "[";
        if ($res->num_rows>0){
        while($row = $res->fetch_assoc()) {
            $str =$str.'{"userid":"'.$row['userid'].'","name":"'.$row['fullname'].'"},';
          }
        $str = substr($str,0,-1);
        $str =$str."]";
        //$result = mysqli_fetch_assoc($res);
        echo   $str;
        }else{
            echo "No Records";
        }
    }else{
        echo "Failed";
    }
    }else{
        $token = '{"auth":"False"}';
        echo $token;
    }    
?>
