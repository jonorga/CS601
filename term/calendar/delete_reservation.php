<?php
	if (isset($_POST['user'])) { $user = $_POST['user']; }
	else {
		echo "No user submitted";
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

	if (isset($_POST['date1'])) { $date1 = $_POST["date1"]; }
	else $date1 = "";
	if (isset($_POST['date2'])) { $date2 = $_POST["date2"]; }
	else $date2 = "";

	if ($date1 != "" && $date2 != "") {
		$sql = "SELECT * FROM $user WHERE StartDate = \"$date1\" AND EndDate = \"$date2\"";
		$result = $mysqli->query($sql);

		if ($result !== FALSE) {
			if ($result -> num_rows == 1) {
				$sql = "DELETE FROM $user WHERE StartDate = \"$date1\" AND EndDate = \"$date2\"";
				if ($mysqli->query($sql) === TRUE) {
					echo "Reservation deleted";
				}
			}
			else {
				echo "Could not find relevant reservation";
			}
		} else {
			echo 'error: ' . $mysqli->error;
		}
	}
	$mysqli->close();
?>