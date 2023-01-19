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
       $sql="SELECT subjectalloted.sem,subjectalloted.sub,subjectalloted.teacher,users.fullname,subjects.name FROM subjectalloted
       INNER JOIN users ON users.userid = subjectalloted.teacher
       INNER JOIN subjects ON subjects.code = subjectalloted.sub";
        $res = $conn->query($sql);
        $str =  "[";
        if ($res->num_rows>0){
        while($row = $res->fetch_assoc()) {
            $str =$str.'{"sub":"'.$row['name'].'","teacher":"'.$row['fullname'].'","sem":"'.$row['sem'].'"},';
          }
        $str = substr($str,0,-1);
        $str =$str."]";
        //$result = mysqli_fetch_assoc($res);
        echo   $str;
        }else{
            echo '[{"sub":"norecords","teacher":"norecords","sem":"0"}]';
        }
    }else{
        echo "Failed";
    }
    }else{
        $token = '{"auth":"False"}';
        echo $token;
    }    
?>
