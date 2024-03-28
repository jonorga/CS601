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
	if (isset($_POST['res_name'])) { $res_name = $_POST["res_name"]; }
	else $res_name = "NoNameSet";

	if ($date1 != "" && $date2 != "") {
		$sql = "SELECT * FROM `TestTable` WHERE (StartDate >= \"" . $date1 . "\" AND StartDate <= \"" . $date2 . "\")"
			. " OR (EndDate >= \"" . $date1 . "\" AND EndDate <= \"" . $date2 . "\")"
			. " OR (StartDate >= \"" . $date1 . "\" AND EndDate <= \"" . $date2 . "\")"
			. " OR (StartDate <= \"" . $date1 . "\" AND EndDate >= \"" . $date2 . "\")";

		
		$result = $mysqli->query($sql);
		if ($result !== FALSE) {
			if ($result -> num_rows > 0) {
				echo "Selected dates unavailable";
			}
			else {
				$sql = "INSERT INTO TestTable (Name, StartDate, EndDate) VALUES ('" . $res_name . "', '" 
					. $date1 . "', '" . $date2 ."')";
				$result = $mysqli->query($sql);
				if ($result !== FALSE) {
					echo "Reservation made!";
				} else {
					echo 'error: ' . $mysqli->error;
				}
			}

			// The below gets the results of the rows
			// while ($row = $result -> fetch_row()) {
			// 	echo var_dump($row);
			// }
		} else {
			echo 'error: ' . $mysqli->error;
		}
	}
	$mysqli->close();
?>