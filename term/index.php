<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1">
    	<link rel="icon" type="image/png" sizes="32x32" href="./images/calendar-icon.png">
    	<link rel="stylesheet" href="./src/styles.css">
		<title>Rental Reservations</title>
		<script type="module">
			import { initializePage } from "./src/reservations.js";
			initializePage();
		</script>
	</head>
	<body>
		<div id="main_container">
			<h1>Rental Reservations</h1>
			<div id="calendar_header">
				<button id="prev_month">Previous</button>
				<h3 id="month"></h3>
				<button id="next_month">Next</button>
			</div>
			<div id="calendar">
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
			<div id=selections_div>
				<p id="server_status"></p>
				<p id="reservation_select">Reservation selected: none</p>
				<button id="delete_res_btn" disabled>Delete reservation</button>
				<p id="selections_p">Dates selected: none</p>
				<button id="reset_selection">Reset selection</button>
			</div>
			<div>
				<input type="date" id="date1_val" name="date1">
				<input type="date" id="date2_val" name="date2">
				<input type="submit" id="submit_selection">
			</div>
		</div>
	</body>
</html>




