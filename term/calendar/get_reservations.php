<?php
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

	$sql = "SELECT * FROM `TestTable` WHERE 1";
	$result = $mysqli->query($sql);

	if ($result !== FALSE) {
		while ($row = $result -> fetch_row()) {
			echo $row[0] . "_" . $row[1] . "_" . $row[2] . ",";
		}
	}

	$mysqli->close();
?>