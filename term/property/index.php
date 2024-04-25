<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1">
    	<link rel="icon" type="image/png" sizes="32x32" href="/term/images/calendar-icon.png">
    	<link rel="stylesheet" href="/term/src/css/styles_cal.css">
		<title>Rental Reservations</title>
		<?php
			$login_success = FALSE;
			$force_failure = FALSE;
			$failure_reason = "";
			if (isset($_POST['user_login'])) { $user = $_POST['user_login']; }
			else $user = "";

			
			if ($user == "") {
				$failure_reason = $failure_reason . " No username set, return to login page and try again\n";
				$force_failure = TRUE;
			}

			if (preg_match("/[^a-z0-9]/i", $user) == 1) {
				$failure_reason = $failure_reason . " Property name can only include letters and numbers \n";
				$force_failure = TRUE;
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
				$failure_reason = $failure_reason . ' Errno: '.$mysqli->connect_errno . '<br>';
				$failure_reason = $failure_reason . 'Error: '.$mysqli->connect_error;
			}

			if (!$force_failure) {
				$sql = "SELECT * FROM `Logins` WHERE username = \"$user\"";
				$result = $mysqli -> query($sql);
				if ($result !== FALSE) {
					if ($result -> num_rows == 1) {
						$login_success = TRUE;
						$row = $result -> fetch_row();
						echo "<meta name=\"database\" content=\"$row[2]\">";
					}
					else {
						$failure_reason = $failure_reason . "$user property could not be found";
					}
				}
				else {
					$failure_reason = $failure_reason . "loading $user property failed";
				}
			}

			if ($login_success) {
				echo "<script type=\"module\">";
				echo "import { initializePage } from \"/term/src/js/reservations.js\";";
				echo "initializePage();";
				echo "</script>";
			}
			else {
				echo "<script type=\"module\">";
				echo "import { rejectPage } from \"/term/src/js/rejection.js\";";
				echo "rejectPage();";
				echo "</script>";
			}
		?>
	</head>
	<body>
		<?php 
		$reject_page = '
		<style>
			html, body {
				height: 100%;
				width: 100%;
			}
		</style>
		<div id="reject_container">
			<h1>Whoops... we couldn\'t log you in</h1>
			<h3>Reason(s):</h3><p>
			' . $failure_reason . '
			</p><br>
			<button id="return_btn" class="standardbtn">Back to login page</button>
		</div>
		';

		$main_page = '
		<style>
			@media screen and (max-width: 455px) {
				html, body {
					height: 100%;
				}
			}
			@media screen and (min-width: 456px) {
				html, body {
					min-height: max-content;
				}
			}
		</style>
		<div id="main_container">
			<h1>Rental Calendar - ' . $user . '</h1>
			<div id="calendar_header">
				<button id="prev_month" class="hover-underline-anim"><</button>
				<h3 id="month"></h3>
				<button id="next_month" class="hover-underline-anim">></button>
			</div>
			<div id="calendar">
				<div class="row headrow">
					<div class="cal_days" calheader>Sunday</div>
					<div class="cal_days innerday" calheader>Monday</div>
					<div class="cal_days innerday" calheader>Tuesday</div>
					<div class="cal_days innerday" calheader>Wednesday</div>
					<div class="cal_days innerday" calheader>Thursday</div>
					<div class="cal_days innerday" calheader>Friday</div>
					<div class="cal_days " calheader>Saturday</div>
				</div>
				<div class="row">
					<div class="day" id="day0"></div>
					<div class="day" id="day1"></div>
					<div class="day" id="day2"></div>
					<div class="day" id="day3"></div>
					<div class="day" id="day4"></div>
					<div class="day" id="day5"></div>
					<div class="day" id="day6"></div>
				</div>
				<div class="row">
					<div class="day" id="day7"></div>
					<div class="day" id="day8"></div>
					<div class="day" id="day9"></div>
					<div class="day" id="day10"></div>
					<div class="day" id="day11"></div>
					<div class="day" id="day12"></div>
					<div class="day" id="day13"></div>
				</div>
				<div class="row">
					<div class="day" id="day14"></div>
					<div class="day" id="day15"></div>
					<div class="day" id="day16"></div>
					<div class="day" id="day17"></div>
					<div class="day" id="day18"></div>
					<div class="day" id="day19"></div>
					<div class="day" id="day20"></div>
				</div>
				<div class="row">
					<div class="day" id="day21"></div>
					<div class="day" id="day22"></div>
					<div class="day" id="day23"></div>
					<div class="day" id="day24"></div>
					<div class="day" id="day25"></div>
					<div class="day" id="day26"></div>
					<div class="day" id="day27"></div>
				</div>
				<div class="row">
					<div class="day" id="day28"></div>
					<div class="day" id="day29"></div>
					<div class="day" id="day30"></div>
					<div class="day" id="day31"></div>
					<div class="day" id="day32"></div>
					<div class="day" id="day33"></div>
					<div class="day" id="day34"></div>
				</div>
				<div class="row" id="last_week">
					<div class="day" id="day35"></div>
					<div class="day" id="day36"></div>
					<div class="day" id="day37"></div>
					<div class="day" id="day38"></div>
					<div class="day" id="day39"></div>
					<div class="day" id="day40"></div>
					<div class="day" id="day41"></div>
				</div>
			</div>
			<div id="info_container">
				<div class="info_sect">
					<span>Dates selected:</span>
					<span>Reservation name: </span>
				</div>
				<div class="info_sect">
					<span id="selections_p">none</span>
					<input type="text" id="res_name" placeholder="John Doe">
				</div>
			</div>
			<div id="res_btns">
				<button id="reset_selection" class="standardbtn">Reset selection</button>
				<input type="submit" id="submit_selection">
			</div>
			<div id="server_div">
				<p>Message from server:</p>
				<button id="dismiss_message" class="standardbtn">X</button>
				<p id="server_message"></p>
			</div>
		</div>';
		if ($login_success) echo $main_page;
		else echo $reject_page;
		?>
	</body>
</html>




