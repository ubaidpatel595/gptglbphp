<?php header('Access-Control-Allow-Origin: *'); 
error_reporting(0);  
?>
<?php
header("Content-Type: text/plain");
if($_POST){
    include "config.php";
    //Getting Data
    $userid = $_POST['userid'];
    $token = $_POST['token'];
    $sem = $_POST['sem'];

    //Token Verification
    $req = "SELECT * FROM users WHERE userid='$userid'";
    $res= $conn->query($req);
    $result = mysqli_fetch_assoc($res);
    
    if($token == md5($result['user_password'])){
    //Logic
    
        if($_POST['code']){
            $sql = "SELECT * FROM subjects WHERE code='$_POST[code]'";
        }else{
        $sql = "SELECT * FROM subjects WHERE sem=$sem";
        }
        $res = $conn->query($sql);
        $str =  "[";
        if ($res->num_rows>0){
        while($row = $res->fetch_assoc()) {
            $str =$str.'{"code":"'.$row['code'].'","name":"'.$row['name'].'"},';
          }
        $str = substr($str,0,-1);
        $str =$str."]";
        //$result = mysqli_fetch_assoc($res);
        echo   $str;
        }else{
            echo '{"No Records":"true"}';
        }
    }else{
        echo "Failed";
    }
    }else{
        $token = '{"auth":"False"}';
        echo $token;
    }
  
?>
