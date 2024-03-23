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

const color_unselected = "white";
const color_today = "#D4F0F8";
const color_invalid = "#E4E4E4";
const color_selected = "#9F9F9F";
const color_gradient = "repeating-linear-gradient(135deg, #5481FF, #5481FF 15%, #5C5C5C 15%, #5C5C5C 21%)";

let current_selection = {
	"year": -1,
	"month": -1
};

let dates_selected = [ ];
const booked_dates = [ ];

function cardinalDate(num) {
	if (num > 10 && num < 14)
		return num + "th";
	else
		return num + (num % 10 == 1 ? "st" : num % 10 == 2 ? "nd" : num % 10 == 3 ? "rd" : "th");
}

function daysInMonth(month, year) { return new Date(year, month + 1, 0).getDate(); }

// Returns which day of the week the first of the month falls on
function firstDayOfWeek(month, year) { return new Date(year, month, 1).getDay(); }

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

function retrievePreviousDates() {
	const attr = document.querySelector("#main_container").getAttribute("cal_info").split(",");
	attr.pop(); // get rid of the index created by the trailing comma
	attr.forEach( function (val, ind) {
		let temp = val.split("_");
		const date1 = temp[1].split("-");
		const date2 = temp[2].split("-");
		temp[1] = new Date(date1[0], date1[1]-1, date1[2]);
		temp[2] = new Date(date2[0], date2[1]-1, date2[2]);
		booked_dates.push(temp);
	} );
}

function thisMonthsBookedDates(set_date) {
	const booked_dates_cur = booked_dates.filter((d) => 
		( d[1].getMonth() == set_date.getMonth() && d[1].getYear() == set_date.getYear() )
		|| ( d[2].getMonth() == set_date.getMonth() && d[2].getYear() == set_date.getYear() )
	);
	const booked_days = [ ];
	booked_dates_cur.forEach( (val) => {
		let end_date = -1;
		let counter = -1;
		if (val[1].getMonth() == set_date.getMonth()) {
			counter = val[1].getDate();
		} else {
			counter = 1;
		}
		if (val[2].getMonth() == set_date.getMonth()) {
			end_date = val[2].getDate();
		} else {
			end_date = daysInMonth(set_date.getMonth(), set_date.getYear());
		}
		while (counter <= end_date) {
			booked_days.push(counter);
			counter++;
		}
	});
	return booked_days;
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
	const booked_dates_cur = thisMonthsBookedDates(set_date);
	const month_has_bookings = booked_dates_cur.length > 0 ? true : false;

	let start_day = null;
	let end_day = null;
	if (selection_complete) {
		start_day = dates_selected[0] < dates_selected[1] ? dates_selected[0] : dates_selected[1];
		end_day = dates_selected[0] > dates_selected[1] ? dates_selected[0] : dates_selected[1];
	}

	document.querySelector("#month").innerHTML = months[set_date.getMonth()] + ", " + set_date.getFullYear();
	let i = 0;
	let day_count = 1;
	for (const week of calendar.children) {
		for (const day of week.children) {
			if (i >= week_day_1 && day_count <= month_length) {
				day.innerHTML = day_count;
				day.removeAttribute("invalid");
				day.removeAttribute("selected");
				day.removeAttribute("booked");
				
				if (month_has_bookings && booked_dates_cur.includes(day_count)) {
					day.style.backgroundImage = color_gradient;
					day.setAttribute("booked", "");
				}
				else if (selection_in_progress 
					&& day_count == dates_selected[0].getDate()
					&& set_date.getMonth() == dates_selected[0].getMonth()
					&& set_date.getFullYear() == dates_selected[0].getFullYear()) {
					day.setAttribute("selected", "");
					day.style.backgroundColor = color_selected;
					day.style.backgroundImage = "";
				} else if (selection_complete
					&& new Date(current_selection.year, current_selection.month, day_count) > start_day
					&& new Date(current_selection.year, current_selection.month, day_count) <= end_day) {
					day.style.backgroundColor = color_selected;
					day.style.backgroundImage = "";
				} else if (this_month && day_count == today.getDate()) {
					day.style.backgroundColor = color_today;
					day.style.backgroundImage = "";
					day.setAttribute("istoday", "");
				}
				else {
					day.style.backgroundColor = color_unselected;
					day.style.backgroundImage = "";
					day.removeAttribute("istoday");
				}
				day_count++;
			}
			else if (day_count > month_length || i < week_day_1) {
				day.innerHTML = "";
				day.style.backgroundColor = color_invalid;
				day.style.backgroundImage = "";
				day.setAttribute("invalid", "");
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

let selection_in_progress = false;
let selection_complete = false;
function calendarEvent(event) {
	if (selection_complete || event.currentTarget.hasAttribute("invalid") || 
		event.currentTarget.hasAttribute("booked")) return;
	const target = event.currentTarget;
	if (event.type == "click") {
		if (!target.hasAttribute("selected") && !selection_in_progress) {
			target.style.backgroundColor = color_selected;
			target.setAttribute("selected", "");
			dates_selected.push(new Date(current_selection.year, current_selection.month, target.innerHTML));
			document.querySelector("#selections_p").innerHTML = "Date selected: " 
				+ months[dates_selected[0].getMonth()] + " " + cardinalDate(dates_selected[0].getDate()) + ", "
				+ dates_selected[0].getFullYear();
			selection_in_progress = true;
			document.querySelector("#date1_val").value = dates_selected[0].toISOString().split("T")[0];
		} else if (target.hasAttribute("selected")) {
			if (target.hasAttribute("istoday"))
				target.style.backgroundColor = color_today;
			else
				target.style.backgroundColor = color_unselected;
			target.removeAttribute("selected");
			dates_selected.pop();
			document.querySelector("#selections_p").innerHTML = "Date selected: none";
			selection_in_progress = false;
		} else {
			selection_complete = true;
			target.style.backgroundColor = color_selected;
			dates_selected.push(new Date(current_selection.year, current_selection.month, target.innerHTML));
			const date1_f = months[dates_selected[0].getMonth()] + " " + cardinalDate(dates_selected[0].getDate()) + ", "
				+ dates_selected[0].getFullYear();
			const date2_f = months[dates_selected[1].getMonth()] + " " + cardinalDate(dates_selected[1].getDate()) + ", "
				+ dates_selected[1].getFullYear();
			const output = dates_selected[0] < dates_selected[1] ? date1_f + " - " + date2_f : date2_f + " - " + date1_f;
			document.querySelector("#selections_p").innerHTML = "Date selected: " + output;

			if (dates_selected[0] < dates_selected[1]) {
				document.querySelector("#date1_val").value = dates_selected[0].toISOString().split("T")[0];
				document.querySelector("#date2_val").value = dates_selected[1].toISOString().split("T")[0];
			} else {
				document.querySelector("#date2_val").value = dates_selected[0].toISOString().split("T")[0];
				document.querySelector("#date1_val").value = dates_selected[1].toISOString().split("T")[0];
			}
		}
	}
	else if (selection_in_progress) {
		if (dates_selected[0].getMonth() == current_selection.month && dates_selected[0].getFullYear() == current_selection.year) {
			const low_selected = dates_selected[0].getDate() <= target.innerHTML ? dates_selected[0].getDate() : Number(target.innerHTML);
			const high_selected = dates_selected[0].getDate() > target.innerHTML ? dates_selected[0].getDate() : Number(target.innerHTML);
			
			for (let i = 0; i <= 41; i++) {
				const temp = document.querySelector(`#day${i}`);
				if (temp.innerHTML >= low_selected && temp.innerHTML <= high_selected) {
					temp.style.backgroundColor = color_selected;
				} else if (temp.hasAttribute("istoday")) {
					temp.style.backgroundColor = color_today;
				} else if (temp.hasAttribute("invalid")) {
					temp.style.backgroundColor = color_invalid;
				} else {
					temp.style.backgroundColor = color_unselected;
				}
			}
		} else {
			const temp_date = new Date(current_selection.year, current_selection.month, 1);
			const selectingEndDate = temp_date > dates_selected[0] ? true : false;
			const current_date = Number(target.innerHTML);

			for (let i = 0; i <= 41; i++) {
				const temp = document.querySelector(`#day${i}`);
				if (temp.hasAttribute("invalid")) {
					temp.style.backgroundColor = color_invalid;
				} else if ( (selectingEndDate && Number(temp.innerHTML) <= current_date) || (!selectingEndDate && Number(temp.innerHTML) >= current_date) ) {
					temp.style.backgroundColor = color_selected;
				} else if (temp.hasAttribute("istoday")) {
					temp.style.backgroundColor = color_today;
				} else {
					temp.style.backgroundColor = color_unselected;
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
			target.style.backgroundColor = color_today;
		else
			target.style.backgroundColor = color_unselected;
	}
}

function resetSelection() {
	selection_in_progress = false;
	selection_complete = false;
	document.querySelector("#date1_val").value = null;
	document.querySelector("#date2_val").value = null;
	dates_selected = [ ];
	document.querySelector("#selections_p").innerHTML = "Dates selected: none";
	for (let i = 0; i <= 41; i++) {
		const temp = document.querySelector(`#day${i}`);
		if (temp.hasAttribute("invalid")) continue;

		if (temp.hasAttribute("istoday"))
			temp.style.backgroundColor = color_today
		else
			temp.style.backgroundColor = color_unselected;
		temp.removeAttribute("selected");
	}
}

function retrievePreviousDates2() {
	const formdata = new FormData();
	const date1 = document.querySelector("#date1_val").value;
	const date2 = document.querySelector("#date2_val").value;;
	formdata.append("date1", date1);
	formdata.append("date2", date2);

	const request = new Request('reservations.php', {
		method: 'POST',
    	body: formdata
	});

	fetch(request)
		.then((res) => res.text())
		.then((text) => {
			console.log("6 " + text);
		});
}


function checkDateValidation() {
	const formdata = new FormData();
	const date1 = document.querySelector("#date1_val").value;
	const date2 = document.querySelector("#date2_val").value;;
	formdata.append("date1", date1);
	formdata.append("date2", date2);

	const request = new Request('test.php', {
		method: 'POST',
    	body: formdata
	});

	console.log("JS submitted: " + date1 + " and " + date2 + "\n");

	fetch(request)
		.then((res) => res.text())
		.then((text) => {
			console.log("PHP returned: " + text + "\nend of PHP");
		});
}


export function initializePage() {
	document.addEventListener("DOMContentLoaded", function() {
		const today = new Date();
		current_selection.year = today.getFullYear();
		current_selection.month = today.getMonth();
		if (document.querySelector("#main_container").hasAttribute("cal_info")) retrievePreviousDates();

		document.querySelector("#submit_selection").addEventListener("click", checkDateValidation);

		setMonth(today);

		document.querySelector("#prev_month").addEventListener("click", previousMonth);
		document.querySelector("#next_month").addEventListener("click", nextMonth);
		document.querySelector("#reset_selection").addEventListener("click", resetSelection);

		for (let i = 0; i <= 41; i++) {
			document.querySelector(`#day${i}`).addEventListener("mouseover", calendarEvent);
			document.querySelector(`#day${i}`).addEventListener("mouseout", calendarEvent);
			document.querySelector(`#day${i}`).addEventListener("click", calendarEvent);
		}
	});
}