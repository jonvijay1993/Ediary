<?php
	include 'db_connect.php';
	
	header("Access-Control-Allow-Origin: *");
	
	$first_name = $_GET['first_name'];
	$last_name = $_GET['last_name'];
	$username= $_GET['username'];
	$password= $_GET['password'];
	
	$query = 'INSERT INTO `user_accounts_fb`(`first_name`, `last_name`, `username`, `password`, `admin_level`) VALUES ("'.$first_name.'","'.$last_name.'","'.$username.'","'.$password.'",0)';
	
	//Query for creating user data table
	$query_create_user_table = "CREATE TABLE IF NOT EXISTS `user_data_$username` (
	`id` int(100) NOT NULL AUTO_INCREMENT,
	`note` longblob NOT NULL,
	`created` text NOT NULL,
	`last_edited` text NOT NULL,
	`time_created` text NOT NULL,
	`time_modified` text NOT NULL,
	primary key (id)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1";
	
	$query_check = 'select * from user_accounts_fb where username="'.$username.'"';
	$result = $conn -> query($query) or die(mysql_error($conn));
	$result = $conn -> query($query_create_user_table) or die(mysql_error($conn));
	$output = "";
	if($result = $conn->query($query_check) != false)
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
		$returns = array(
			"status" => "registered",
			"username" => $data['username'],
			"password" => $data['password'],
			"admin_level" => $data['admin_level']
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