<?php
	include 'db_connect.php';
	
	header("Access-Control-Allow-Origin: *");
	
	$username = $_GET['username'];
	$pass = $_GET['password'];
	
	$query = "select * from user_accounts where username='$username' AND password='$pass'";
	
	if($result = $conn->query($query) or die(mysql_error()) != false)
	{
		session_start();
		//Unique session id
		$_SESSION['id'] = session_id();
		$_SESSION['username'] = $username;		
		$data = $result->fetch(PDO::FETCH_ASSOC) or die(mysql_error());
		//echo $data->rowCount();
		//echo $data['username'].' logged in';
		if($data['admin'] == 1)
			echo "trueadmin";
		else
			echo "true";
	}
	else{
		//echo $data->rowCount();
		echo "false";
	}
	
?>