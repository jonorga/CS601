<?php
	$login_success = FALSE;
	if (isset($_POST['user'])) { $user = $_POST['user']; }
	else $user = "";
	if (isset($_POST['pass'])) { $pass = $_POST['pass']; }
	else $pass = "";

	
	if ($user == "" || $pass == "") {
		echo "Invalid username or password";
		exit();
	}

	$db_host = 'localhost';
	$db_user = 'root';
	$db_password = 'root';
	$db_db = 'myDB';
 
	$mysqli = @new mysqli(
		$db_host,
		$db_user,
		$db_password,
		$db_db
	);
	
	if ($mysqli->connect_error) {
		echo 'Errno: '.$mysqli->connect_errno;
		echo '<br>';
		echo 'Error: '.$mysqli->connect_error;
		exit();
	}

	$sql = "SELECT * FROM `Logins` WHERE username = \"$user\" AND password = \"$pass\"";
	$result = $mysqli -> query($sql);
	if ($result !== FALSE) {
		if ($result -> num_rows == 1) {
			$login_success = TRUE;
		}
		else {
			echo "Username or password was incorrect";
		}
	}
	else {
		echo "$user login failed";
	}
?>