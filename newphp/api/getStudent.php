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
       $sql="SELECT users.userid ,students.sem,users.fullname FROM users INNER JOIN students ON students.regno = users.userid WHERE sem=$_POST[sem]";
        $res = $conn->query($sql);
        $str =  "[";
        if ($res->num_rows>0){
        while($row = $res->fetch_assoc()) {
            $str =$str.'{"reg":"'.$row['userid'].'","name":"'.$row['fullname'].'","sem":"'.$row['sem'].'"},';
          }
        $str = substr($str,0,-1);
        $str =$str."]";
        //$result = mysqli_fetch_assoc($res);
        echo   $str;
        }else{
            echo '{"NoRecords":"true"}';
        }
    }else{
        echo "Failed";
    }
    }else{
        $token = '{"auth":"False"}';
        echo $token;
    }    
?>
