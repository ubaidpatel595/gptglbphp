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
    //GEtting date,teacher,subject,sem
    $attendance_date = $_POST['date'];
    $subject = $_POST['subject'];
    $sem = $_POST['sem'];
    //Logic
       $sql="SELECT 
       attendance.date,attendance.student,attendance.state,attendance.teacher, 
       attendance.subject,students.sem,
       users.fullname,users.userid
       FROM `attendance`
       INNER JOIN users ON attendance.student = users.userid
       INNER JOIN students ON attendance.student = students.regno
       WHERE attendance.date ='$attendance_date' AND attendance.teacher = '$userid' 
       AND attendance.subject ='$subject' AND students.sem ='$sem'
       ";
        $res = $conn->query($sql);
        
        $str =  "[";
        if ($res->num_rows>0){
        while($row = $res->fetch_assoc()) {
            $str =$str.'{"reg":"'.$row['userid'].'","name":"'.$row['fullname'].'","sem":"'.$row['sem'].'","state":"'.$row['state'].'"},';
          }
        $str = substr($str,0,-1);
        $str =$str."]";
        //$result = mysqli_fetch_assoc($res);
        echo   $str;
        }else{
            echo '[{"reg":"no reg","name":"No Students Found","sem":"0","state":"Absent"}]';
        }
    }else{
        echo "Failed";
    }
    }else{
        $token = '[{"auth":"False"}]';
        echo $token;
    }    
?>
