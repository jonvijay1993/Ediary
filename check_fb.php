<?php
	include 'db_connect.php';
	
	header("Access-Control-Allow-Origin: *");
	
	$first_name = $_GET['first_name'];
	$last_name = $_GET['last_name'];
	
	$query = "select * from user_accounts_fb where first_name=$first_name AND last_name=$last_name";
	
	if($result = $conn->query($query) != false)
	{
		session_start();
		$data = $result->fetch(PDO::FETCH_ASSOC) or die(mysql_error());
		$_SESSION['id'] = session_id();
		$_SESSION['username'] = $data['username'];		
		//echo $data->rowCount();
		//echo $data['username'].' logged in';
		// if($data['admin'] == 1)
			// echo "trueadmin";
		// else
			echo "exists_on_db";
	}
	else{
		//echo $data->rowCount();
		echo "new_user";
	}
	
?>