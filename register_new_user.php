<?php
	include 'db_connect.php';
	
	header("Access-Control-Allow-Origin: *");
	
	$first_name = $_GET['first_name'];
	$last_name = $_GET['last_name'];
	$username= $_GET['username'];
	$password= $_GET['password'];
	
	$query = 'INSERT INTO `user_accounts`(`first_name`, `last_name`, `username`, `password`, `admin_level`) VALUES ("'.$first_name.'","'.$last_name.'","'.$username.'","'.$password.'",0)';
	$query_check = 'select * from user_accounts where username="'.$username.'"';
	//$result = $conn->query($query);
	$output = "";
	
	if($result = $conn->query($query) != false)
	{
		session_start();
		//$data = $result->fetch(PDO::FETCH_ASSOC) or die(mysql_error());
		$_SESSION['id'] = session_id();
		$_SESSION['username'] = $username;		
		//echo $data->rowCount();
		//echo $data['username'].' logged in';
		// if($data['admin'] == 1)
			// echo "trueadmin";
		// else
		$returns = array(
			"status" => "registered",
			"username" => $username,
			"password" => $password,
			"admin_level" => "0"
		);
		$output = json_encode($returns);
		echo $output;
	}
	else{
		//echo $data->rowCount();
		$returns = array(
			"status" => "failed"
		);
		$output = json_encode($returns);
		echo $output;
	}
	
?>