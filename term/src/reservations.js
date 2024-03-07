const months = {
	0: "January",
	1: "February",
	2: "March",
	3: "April",
	4: "May",
	5: "June",
	6: "July",
	7: "August",
	8: "September",
	9: "October",
	10: "November",
	11: "December"
};

let current_selection = {
	"year": -1,
	"month": -1
};

function daysInMonth(month, year) {
	return new Date(year, month + 1, 0).getDate();
}

// Returns which day of the week the first of the month falls on
function firstDayOfWeek(month, year) {
	return new Date(year, month, 1).getDay();
}

function previousMonth() {
	if (current_selection.month == 0) {
		current_selection.month = 11;
		current_selection.year--;
	}
	else {
		current_selection.month--;
	}
	setMonth(new Date(current_selection.year, current_selection.month));
}

function nextMonth() {
	if (current_selection.month == 11) {
		current_selection.month = 0;
		current_selection.year++;
	}
	else {
		current_selection.month++;
	}
	setMonth(new Date(current_selection.year, current_selection.month));
}

function setMonth(today) {
	const month_length = daysInMonth(today.getMonth(), today.getYear());
	const week_day_1 = firstDayOfWeek(today.getMonth(), today.getFullYear());
	const calendar = document.querySelector("#calendar");

	document.querySelector("#month").innerHTML = months[today.getMonth()] + ", " + today.getFullYear();
	let i = 0;
	let day_count = 1;
	for (const week of calendar.children) {
		for (const day of week.children) {
			if (i >= week_day_1 && day_count <= month_length) {
				day.innerHTML = day_count;
				day_count++;
			}
			else if (day_count > month_length || i < week_day_1) {
				day.innerHTML = "";
			}
			i++;
		}
	}

	if (document.querySelector("#day35").innerHTML == "") {
		document.querySelector("#last_week").style.display = "none";
	}
	else {
		document.querySelector("#last_week").style.display = "flex";
	}
}

export function initializePage() {
	document.addEventListener("DOMContentLoaded", function() {
		const today = new Date();
		current_selection.year = today.getFullYear();
		current_selection.month = today.getMonth();
		setMonth(today);

		document.querySelector("#prev_month").addEventListener("click", previousMonth);
		document.querySelector("#next_month").addEventListener("click", nextMonth);
	});
}