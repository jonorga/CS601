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

let dates_selected = [ ];

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
					day.setAttribute("istoday", "");
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

let selection_in_process = false;
function calendarEvent(event) {
	const target = event.currentTarget;
	if (event.type == "click") {
		// TODO: redo the selection process
		if (!target.hasAttribute("selected") && !selection_in_process) {
			target.style.backgroundColor = "#9F9F9F";
			target.setAttribute("selected", "");
			dates_selected.push(new Date(current_selection.year, current_selection.month, target.innerHTML));
			document.querySelector("#selections_p").innerHTML = "Date selected: " 
				+ months[dates_selected[0].getMonth()] + " " + cardinalDate(dates_selected[0].getDate()) + ", "
				+ dates_selected[0].getFullYear();
			selection_in_process = true;
		} else if (target.hasAttribute("selected")) {
			if (target.hasAttribute("istoday"))
				target.style.backgroundColor = "#D4F0F8";
			else
				target.style.backgroundColor = "white";
			target.removeAttribute("selected");
			dates_selected.pop();
			document.querySelector("#selections_p").innerHTML = "Date selected: none";
			selection_in_process = false;
		}



		// if (target.hasAttribute("selected")) {
		// 	if (target.hasAttribute("istoday"))
		// 		target.style.backgroundColor = "#D4F0F8";
		// 	else
		// 		target.style.backgroundColor = "white";

		// 	target.removeAttribute("selected");
		// 	dates_selected.splice(dates_selected.indexOf(new Date(current_selection.year, current_selection.month, target.innerHTML)), 1);
		// }
		// else {
		// 	target.setAttribute("selected", "");
		// 	target.style.backgroundColor = "#9F9F9F";
		// 	if (dates_selected.length == 0) {
		// 		dates_selected.push(new Date(current_selection.year, current_selection.month, target.innerHTML));
		// 		document.querySelector("#selections_p").innerHTML = "Date selected: " 
		// 			+ months[dates_selected[0].getMonth()] + " " + cardinalDate(dates_selected[0].getDate()) + ", "
		// 			+ dates_selected[0].getFullYear();
		// 	}
		// 	else if (dates_selected.length == 1) {
		// 		dates_selected.push(new Date(current_selection.year, current_selection.month, target.innerHTML));
		// 		const d1_formatted = months[dates_selected[0].getMonth()] + " " 
		// 			+ cardinalDate(dates_selected[0].getDate()) + ", " + dates_selected[0].getFullYear();
		// 		const d2_formatted = months[dates_selected[1].getMonth()] + " " 
		// 			+ cardinalDate(dates_selected[1].getDate()) + ", " + dates_selected[1].getFullYear();

		// 		if (dates_selected[0] < dates_selected[1]) {
		// 			document.querySelector("#selections_p").innerHTML = "Date selected: " 
		// 				+ d1_formatted + " - " + d2_formatted;
		// 		}
		// 		else {
		// 			document.querySelector("#selections_p").innerHTML = "Date selected: " 
		// 				+ d2_formatted + " - " + d1_formatted;
		// 		}
		// 	}
		// }
	}
	else if (selection_in_process) {
		// Every square between target and selected should have the 9F9F9F color
		if (dates_selected[0].getMonth() == current_selection.month && dates_selected[0].getFullYear() == current_selection.year) {
			const low_selected = dates_selected[0].getDate() <= target.innerHTML ? dates_selected[0].getDate() : Number(target.innerHTML);
			const high_selected = dates_selected[0].getDate() > target.innerHTML ? dates_selected[0].getDate() : Number(target.innerHTML);
			console.log(low_selected, high_selected);
			for (let i = 0; i <= 41; i++) {
				const temp = document.querySelector(`#day${i}`);
				if (temp.innerHTML >= low_selected && temp.innerHTML <= high_selected) {
					temp.style.backgroundColor = "#9F9F9F";
				} else if (temp.hasAttribute("istoday")) {
					temp.style.backgroundColor = "#D4F0F8";
				} else {
					temp.style.backgroundColor = "white";
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