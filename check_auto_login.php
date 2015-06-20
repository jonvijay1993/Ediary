<?php
	include 'db_connect.php';
	
	header("Access-Control-Allow-Origin: *");
	
	$type = $_GET['type'];
	if($type == "check"){
		$query = 'select * from user_accounts where auto_login="yes"';
		
		if($result = $conn->query($query) or die(mysql_error()) != false)
		{
			session_start();
			//Unique session id
			// $_SESSION['id'] = session_id();
			// $_SESSION['username'] = $username;		
			$data = $result->fetch(PDO::FETCH_ASSOC) or die(mysql_error());
			//echo $data->rowCount();
			//echo $data['username'].' logged in';
			$output = array(
			"status" => "exists",
			"username" => $data['username'],
			"password" => $data['password'],
			"admin_level" => $data['admin_level']
			);
			
			echo json_encode($output);
		}
		else{
			//echo $data->rowCount();
			$output = array(
			"status" => "none"
			);
			
			echo json_encode($output);
		}
	}
	else if($type == "forget_me"){
		$username = $_GET['username'];
		$query = 'update user_accounts set auto_login = "no" where username ="'.$username.'"';
		echo $query;
		if($result = $conn->query($query) or die(mysql_error()) != false)
		{
			echo "forgotten";
		}
		else{
			echo "error";
		}
	}
	else if($type == "remember_me"){
		$username = $_GET['username'];
		$query = 'update user_accounts set auto_login = "yes" where username ="'.$username.'"';
		echo $query;
		if($result = $conn->query($query) or die(mysql_error()) != false)
		{
			echo "Remembered";
		}
		else{
			echo "error";
		}
	}
	
?>