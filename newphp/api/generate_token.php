<?php
$random= random_int(100000,999999);
echo $random."<br>";
$a= base64_encode($random);
$b = base64_decode($a);
echo $b;
?>