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

	if (isset($_POST['date1'])) { $date1 = $_POST["date1"]; }
	else $date1 = "";
	if (isset($_POST['date2'])) { $date2 = $_POST["date2"]; }
	else $date2 = "";
	if (isset($_POST['new_date1'])) { $new_date1 = $_POST["new_date1"]; }
	else $new_date1 = "";
	if (isset($_POST['new_date2'])) { $new_date2 = $_POST["new_date2"]; }
	else $new_date2 = "";

	if ($date1 != "" && $date2 != "") {
		$sql = "SELECT * FROM `TestTable` WHERE (StartDate >= \"" 
			. $new_date1 . "\" AND StartDate <= \"" . $new_date2 . "\")"
			. " OR (EndDate >= \"" . $new_date1 . "\" AND EndDate <= \"" . $new_date2 . "\")"
			. " OR (StartDate >= \"" . $new_date1 . "\" AND EndDate <= \"" . $new_date2 . "\")"
			. " OR (StartDate <= \"" . $new_date1 . "\" AND EndDate >= \"" . $new_date2 . "\")";

		
		$result = $mysqli->query($sql);
		if ($result !== FALSE) {
			// If selected dates is equal to 0: all good, 1: make sure it's that same reservation, 2: conflict
			$valid_date = FALSE;
			if ($result -> num_rows === 1) {
				$row = $result -> fetch_row();
				if ($row[1] == $date1 && $row[2] == $date2) {
					$valid_date = TRUE;
				}
			}
			if ($valid_date || $result -> num_rows === 0) {
				$sql = "UPDATE `TestTable` SET StartDate = \"$new_date1\", EndDate = \"$new_date2\" WHERE "
					. "StartDate = \"$date1\" AND EndDate = \"$date2\"";
				if ($mysqli->query($sql) === TRUE) {
					echo "Reservation edited!";
				} else {
					echo "Error while editing reservation";
				}
			}
			else {
				echo "Dates unavailable";
			}
		} else {
			echo 'error: ' . $mysqli->error;
		}
	}
	$mysqli->close();
?>