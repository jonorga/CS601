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

let dates_picked = {
	"d1": null,
	"d2": null
};

function cardinalDate(num) {
	if (num > 10 && num < 14)
		return num + "th";
	else
		return num + (num % 10 == 1 ? "st" : num % 10 == 2 ? "nd" : num % 10 == 3 ? "rd" : "th");
}

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

function setMonth(set_date) {
	const today = new Date();
	let this_month = null;
	if (today.getMonth() == set_date.getMonth() && today.getFullYear() == set_date.getFullYear()) {
		this_month = true;
	}
	else {
		this_month = false;
	}
	const month_length = daysInMonth(set_date.getMonth(), set_date.getYear());
	const week_day_1 = firstDayOfWeek(set_date.getMonth(), set_date.getFullYear());
	const calendar = document.querySelector("#calendar");

	document.querySelector("#month").innerHTML = months[set_date.getMonth()] + ", " + set_date.getFullYear();
	let i = 0;
	let day_count = 1;
	for (const week of calendar.children) {
		for (const day of week.children) {
			if (i >= week_day_1 && day_count <= month_length) {
				day.innerHTML = day_count;
				if (this_month && day_count == today.getDate()) {
					day.style.backgroundColor = "#D4F0F8";
					day.setAttribute("istoday", "true");
				}
				else if (!this_month) {
					day.style.backgroundColor = "white";
					day.removeAttribute("istoday");
				}
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

function calendarEvent(event) {
	const target = event.currentTarget;
	if (event.type == "click") {
		if (target.hasAttribute("selected")) {
			if (target.hasAttribute("istoday"))
				target.style.backgroundColor = "#D4F0F8";
			else
				target.style.backgroundColor = "white";
			target.removeAttribute("selected");
		}
		else {
			target.setAttribute("selected", "true");
			target.style.backgroundColor = "#9F9F9F";
			if (dates_picked.d1 == null) {
				dates_picked.d1 = new Date(current_selection.year, current_selection.month, target.innerHTML);
				document.querySelector("#selections_p").innerHTML = "Date selected: " 
					+ months[dates_picked.d1.getMonth()] + " " + cardinalDate(dates_picked.d1.getDate()) + ", "
					+ dates_picked.d1.getFullYear();
			}
			else if (dates_picked.d2 == null) {
				dates_picked.d2 = new Date(current_selection.year, current_selection.month, target.innerHTML);
				const d1_formatted = months[dates_picked.d1.getMonth()] + " " 
					+ cardinalDate(dates_picked.d1.getDate()) + ", " + dates_picked.d1.getFullYear();
				const d2_formatted = months[dates_picked.d2.getMonth()] + " "
					+ cardinalDate(dates_picked.d2.getDate()) + ", " + dates_picked.d2.getFullYear();

				if (dates_picked.d1 < dates_picked.d2) {
					document.querySelector("#selections_p").innerHTML = "Date selected: " 
						+ d1_formatted + " - " + d2_formatted;
				}
				else {
					document.querySelector("#selections_p").innerHTML = "Date selected: " 
						+ d2_formatted + " - " + d1_formatted;
				}
			}
		}
	}
	else if (target.hasAttribute("selected")) {
		return;
	}
	else if (event.type == "mouseover") {
		target.style.backgroundColor = "#8BDFF7";
	}
	else if (event.type == "mouseout") {
		if (target.hasAttribute("istoday") && !target.hasAttribute("selected"))
			target.style.backgroundColor = "#D4F0F8";
		else
			target.style.backgroundColor = "white";
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

		for (let i = 0; i <= 41; i++) {
			document.querySelector(`#day${i}`).addEventListener("mouseover", calendarEvent);
			document.querySelector(`#day${i}`).addEventListener("mouseout", calendarEvent);
			document.querySelector(`#day${i}`).addEventListener("click", calendarEvent);
		}
	});
}