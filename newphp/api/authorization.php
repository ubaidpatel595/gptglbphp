<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
header("Content-Type: text/plain");
header('Access-Control-Allow-Origin: *');
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

        //Getting Alloted Subjects 
        $sql2 ="SELECT * FROM `subjectalloted` INNER JOIN subjects ON 
                subjectalloted.sub = subjects.code WHERE subjectalloted.teacher ='$userid'";
        $res2 = $conn->query($sql2);
        if ($res2->num_rows>0){
            $str ="[";
            while($row = $res2->fetch_assoc()) {
                $str =$str.'{"name":"'.$row['name'].'","code":"'.$row['sub'].'","sem":"'.$row['sem'].'"},';
            }
            $str = substr($str,0,-1);
            $str =$str."]";
            //$result = mysqli_fetch_assoc($res);
           // echo   $str;
            }else{
                $str = '[{"name":"no subjects alloted","code":"No Subjects Alloted","sem":"0"}]';
            }     

        //Creating Token
        $token = '{"userid":"'.$userid.'","name":"'.$name.'","type":"'.$role.'","token":"'.$password.'","auth":"True","branch":"'.$branch.'","subjects":'.$str.'}';
        echo $token;
    }else{
        $token = '{"auth":"False"}';
        echo $token;
    }    
}else{
    echo "Invalid";
}


 

?>
