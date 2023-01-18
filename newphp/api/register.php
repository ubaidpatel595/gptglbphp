<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
header("Content-Type: text/plain");
include "config.php";
if($_POST){
//Getting Details
$userid = $_POST['userid'];
 $name = $_POST['name'];
 $mobile = $_POST['mobile'];
 $email = $_POST['email'];
 $role = $_POST['role'];
 $pasword = $_POST['password'];
 $branch = $_POST['branch'];
if($role == "STUDENT"){
    $sql = "INSERT INTO users (userid, fullname, mobile, email, user_password, user_role,branch) 
        VALUES('$userid','$name','$mobile','$email','$pasword','$role','$branch')";
        $reg = $conn->query($sql);
    if($reg == 1){
        $sem = $_POST['sem'];
        $insertStudent = "INSERT INTO students values('$userid','$sem')";
        $ins = $conn->query($insertStudent);
       // echo $ins;
    }
    echo "$reg";
    
}else{
    //Creating User
    $sql = "INSERT INTO users (userid, fullname, mobile, email, user_password, user_role,branch) 
    VALUES('$userid','$name','$mobile','$email','$pasword','$role','$branch')";
    $reg = $conn->query($sql);
    echo "$reg";
}}else{
    echo "You Are Not Allowed To Visit This Page";
}
?>