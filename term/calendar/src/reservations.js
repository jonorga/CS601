// All static variables
class STC {	
	// Zero-indexed months to string
	static months = {
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

	// All colors
	static color_unselected = "white";
	static color_today = "#D4F0F8";
	static color_invalid = "#E4E4E4";
	static color_selected = "#9F9F9F";
	static color_gradient = "repeating-linear-gradient(135deg, #5481FF, #5481FF 15%, #5C5C5C 15%, #5C5C5C 21%)";
	static color_gradient_sel = "repeating-linear-gradient(135deg, #68DDFF, #68DDFF 15%, #5C5C5C 15%, #5C5C5C 21%)";

	// Currently selected month and year
	static current_selection = {
		"year": -1,
		"month": -1
	};

	// Current selected date range on calendar
	static dates_selected = [ ];
	// All retrieved booked dates from database
	static booked_dates = [ ];
	// Selected reservation target
	static reservation_target = null;
}

// All helper functions
class HLPR {
	// Function to convert a number to a cardinal date
	static cardinalDate(num) {
		if (num > 10 && num < 14)
			return num + "th";
		else
			return num + (num % 10 == 1 ? "st" : num % 10 == 2 ? "nd" : num % 10 == 3 ? "rd" : "th");
	}

	// Get the number of dayes in a given month
	static daysInMonth(month, year) { return new Date(year, month + 1, 0).getDate(); }

	// Returns which day of the week the first of the month falls on
	static firstDayOfWeek(month, year) { return new Date(year, month, 1).getDay(); }

	// Shift current selection to previous month and call setMonth function
	static previousMonth() {
		if (STC.current_selection.month == 0) {
			STC.current_selection.month = 11;
			STC.current_selection.year--;
		}
		else {
			STC.current_selection.month--;
		}
		setMonth(new Date(STC.current_selection.year, STC.current_selection.month));
	}

	// Shift current selection to next month and call setMonth function
	static nextMonth() {
		if (STC.current_selection.month == 11) {
			STC.current_selection.month = 0;
			STC.current_selection.year++;
		}
		else {
			STC.current_selection.month++;
		}
		setMonth(new Date(STC.current_selection.year, STC.current_selection.month));
	}

	// Get the reservation from the clicked dates
	static getClickedReservation(text) {
		const day_of_month = text.includes("-") ? text.split("-")[0].slice(0,-1) : text;
		const target_date = new Date(STC.current_selection.year, STC.current_selection.month, day_of_month);
		const output_raw = STC.booked_dates.filter((d) => ( (d[1] <= target_date) && (d[2] >= target_date) ))[0];
		const output = output_raw.map(elem => elem);
		output[1] = output[1].toISOString().split("T")[0];
		output[2] = output[2].toISOString().split("T")[0];
		return output;
	}

	// Get the booked dates from this month
	static thisMonthsBookedDates(set_date) {
		const booked_dates_cur = STC.booked_dates.filter((d) => 
			( d[1].getMonth() == set_date.getMonth() && d[1].getYear() == set_date.getYear() )
			|| ( d[2].getMonth() == set_date.getMonth() && d[2].getYear() == set_date.getYear() )
		);
		const booked_days = [ ];
		const booked_names = [ ];
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
				end_date = HLPR.daysInMonth(set_date.getMonth(), set_date.getYear());
			}

			booked_days.push(counter);
			booked_names.push(val[0]);
			counter++;
			while (counter <= end_date) {
				booked_days.push(counter);
				booked_names.push("");
				counter++;
			}
		});

		return [booked_days, booked_names];
	}
}

// All backend call functions
class BACKEND {
	// Retrieve all the previously booked dates from this table
	static retrievePreviousDates() {
		fetch("get_reservations.php")
			.then((res) => res.text())
			.then((text) => {
				STC.booked_dates.length = 0;
				const attr = text.split(",");
				attr.pop(); // get rid of the index created by the trailing comma
				attr.forEach( function (val, ind) {
					let date_split = val.split("_");
					const date1 = date_split[1].split("-");
					const date2 = date_split[2].split("-");
					date_split[1] = new Date(date1[0], date1[1]-1, date1[2]);
					date_split[2] = new Date(date2[0], date2[1]-1, date2[2]);
					STC.booked_dates.push(date_split);
				} );
				setMonth(new Date(STC.current_selection.year, STC.current_selection.month));
				const previous_status = document.querySelector("#server_status").innerHTML;
				document.querySelector("#server_status").innerHTML = `${previous_status} Previous dates retrieved`;

			})
			.catch((err) => {
				const previous_status = document.querySelector("#server_status").innerHTML;
				document.querySelector("#server_status").innerHTML = `${previous_status} Error while retrieving previous dates ${err}`;
			});
	}

	// Submit the current selection to the table
	static submitDate() {
		const res_name = document.querySelector("#res_name").value;
		if (res_name == "") {
			alert("Please add a reservation name");
			return;
		}
		else if (res_name.match(/[^0-9a-z]/i)) {
			alert("The reservation name can only include letters and numbers");
			return;
		}

		const formdata = new FormData();
		const date1 = document.querySelector("#date1_val").value;
		const date2 = document.querySelector("#date2_val").value;
		formdata.append("date1", date1);
		formdata.append("date2", date2);
		formdata.append("res_name", res_name);

		const request = new Request('make_reservation.php', {
			method: 'POST',
	    	body: formdata
		});

		fetch(request)
			.then((res) => res.text())
			.then((text) => {
				BACKEND.retrievePreviousDates();
				const previous_status = document.querySelector("#server_status").innerHTML;
				document.querySelector("#server_status").innerHTML = `${previous_status} Server said: ${text}`;
				resetSelection();
			})
			.catch((err) => {
				const previous_status = document.querySelector("#server_status").innerHTML;
				document.querySelector("#server_status").innerHTML = `${previous_status} Server error`;
			});
	}

	// Delete the current selection from the table
	static deleteReservation() {
		const formdata = new FormData();
		formdata.append("date1", STC.reservation_target[1]);
		formdata.append("date2", STC.reservation_target[2]);

		const request = new Request('delete_reservation.php', {
			method: 'POST',
			body: formdata
		});

		fetch(request)
			.then((res) => res.text())
			.then((text) => {
				const previous_status = document.querySelector("#server_status").innerHTML;
				document.querySelector("#server_status").innerHTML = `${previous_status} Server said: ${text}`;
				BACKEND.retrievePreviousDates();
				resetSelection();
			});
	}

	// Edit the current selection in the table
	static editReservation() {
		const formdata = new FormData();
		formdata.append("date1", STC.reservation_target[1]);
		formdata.append("date2", STC.reservation_target[2]);
		const date1 = document.querySelector("#date1_val").value;
		const date2 = document.querySelector("#date2_val").value;
		formdata.append("new_date1", date1);
		formdata.append("new_date2", date2);

		const request = new Request('edit_reservation.php', {
			method: 'POST',
			body: formdata
		});

		fetch(request)
			.then((res) => res.text())
			.then((text) => {
				const previous_status = document.querySelector("#server_status").innerHTML;
				document.querySelector("#server_status").innerHTML = `${previous_status} Server said: ${text}`;
				BACKEND.retrievePreviousDates();
				resetSelection();
			});
	}
}

// Set the month when previous or next is called
function setMonth(set_date) {
	const today = new Date();
	let this_month = null;
	if (today.getMonth() == set_date.getMonth() && today.getFullYear() == set_date.getFullYear()) {
		this_month = true;
	}
	else {
		this_month = false;
	}
	const month_length = HLPR.daysInMonth(set_date.getMonth(), set_date.getYear());
	const week_day_1 = HLPR.firstDayOfWeek(set_date.getMonth(), set_date.getFullYear());
	const calendar = document.querySelector("#calendar");
	const booked_dates_cur = HLPR.thisMonthsBookedDates(set_date);
	const month_has_bookings = booked_dates_cur.length > 0 ? true : false;

	let start_day = null;
	let end_day = null;
	if (selection_complete) {
		start_day = STC.dates_selected[0] < STC.dates_selected[1] ? STC.dates_selected[0] : STC.dates_selected[1];
		end_day = STC.dates_selected[0] > STC.dates_selected[1] ? STC.dates_selected[0] : STC.dates_selected[1];
	}

	document.querySelector("#month").innerHTML = STC.months[set_date.getMonth()] + ", " + set_date.getFullYear();
	let i = 0;
	let day_count = 1;
	for (const week of calendar.children) {
		for (const day of week.children) {
			if (i >= week_day_1 && day_count <= month_length) {
				day.innerHTML = day_count;
				day.removeAttribute("invalid");
				day.removeAttribute("selected");
				day.removeAttribute("booked");
				
				if (month_has_bookings && booked_dates_cur[0].includes(day_count)) {
					// if the day falls within reservation selected
					if (STC.reservation_target != null) {
						const date_split1 = STC.reservation_target[1].split("-");
						const date_split2 = STC.reservation_target[2].split("-");
						const date1_formatted = new Date(date_split1[0], date_split1[1] - 1, date_split1[2]);
						const date2_formatted = new Date(date_split2[0], date_split2[1] - 1, date_split2[2]);
						const date_current = new Date(STC.current_selection.year, STC.current_selection.month, day_count);
						if (date1_formatted <= date_current && date2_formatted >= date_current) {
							day.style.backgroundImage = STC.color_gradient_sel;
						}
						else {
							day.style.backgroundImage = STC.color_gradient;
						}
					}
					else {
						day.style.backgroundImage = STC.color_gradient;
					}
					
					if (booked_dates_cur[1][booked_dates_cur[0].indexOf(day_count)] != "")
						day.innerHTML = `${day_count} - ${booked_dates_cur[1][booked_dates_cur[0].indexOf(day_count)]}`;
					day.setAttribute("booked", "");
				}
				else if (selection_in_progress 
					&& day_count == STC.dates_selected[0].getDate()
					&& set_date.getMonth() == STC.dates_selected[0].getMonth()
					&& set_date.getFullYear() == STC.dates_selected[0].getFullYear()) {
					day.setAttribute("selected", "");
					day.style.backgroundColor = STC.color_selected;
					day.style.backgroundImage = "";
				} else if (selection_complete
					&& new Date(STC.current_selection.year, STC.current_selection.month, day_count) > start_day
					&& new Date(STC.current_selection.year, STC.current_selection.month, day_count) <= end_day) {
					day.style.backgroundColor = STC.color_selected;
					day.style.backgroundImage = "";
				} else if (this_month && day_count == today.getDate()) {
					day.style.backgroundColor = STC.color_today;
					day.style.backgroundImage = "";
					day.setAttribute("istoday", "");
				}
				else {
					day.style.backgroundColor = STC.color_unselected;
					day.style.backgroundImage = "";
					day.removeAttribute("istoday");
				}
				day_count++;
			}
			else if (day_count > month_length || i < week_day_1) {
				day.innerHTML = "";
				day.style.backgroundColor = STC.color_invalid;
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

// Handle mouse events within the calendar
let selection_in_progress = false;
let selection_complete = false;
function calendarEvent(event) {
	if (selection_complete || event.currentTarget.hasAttribute("invalid")) return;
	const target = event.currentTarget;
	if (event.type == "click") {
		if (target.hasAttribute("booked") && !selection_in_progress) {
			const clicked_reservation = HLPR.getClickedReservation(target.innerHTML);
			STC.reservation_target = clicked_reservation;
			selection_complete = true;

			const date_split1 = STC.reservation_target[1].split("-");
			const date_split2 = STC.reservation_target[2].split("-");
			const date1_formatted = new Date(date_split1[0], date_split1[1] - 1, date_split1[2]);
			const date2_formatted = new Date(date_split2[0], date_split2[1] - 1, date_split2[2]);
			
			for (let i = 0; i <= 41; i++) {
				const temp = document.querySelector(`#day${i}`);
				if (temp.hasAttribute("invalid")) continue;
				const temp_day = temp.innerHTML.includes("-") ? temp.innerHTML.split("-")[0].slice(0, -1) : temp.innerHTML;
				const temp_current = new Date(STC.current_selection.year, STC.current_selection.month, Number(temp_day));
				if (date1_formatted <= temp_current && date2_formatted >= temp_current) {
					temp.style.backgroundImage = STC.color_gradient_sel;
				}
			}

			document.querySelector("#delete_res_btn").disabled = false;
			document.querySelector("#edit_res_btn").disabled = false;
			document.querySelector("#reservation_select").innerHTML = 
				`Reservation selected: ${clicked_reservation[0]}_${clicked_reservation[1]}_${clicked_reservation[2]}`;
		}
		else if (!target.hasAttribute("selected") && !selection_in_progress) {
			target.style.backgroundColor = STC.color_selected;
			target.setAttribute("selected", "");
			STC.dates_selected.push(new Date(STC.current_selection.year, STC.current_selection.month, target.innerHTML));
			document.querySelector("#selections_p").innerHTML = "Date selected: " 
				+ STC.months[STC.dates_selected[0].getMonth()] + " " + HLPR.cardinalDate(STC.dates_selected[0].getDate()) + ", "
				+ STC.dates_selected[0].getFullYear();
			selection_in_progress = true;
			document.querySelector("#date1_val").value = STC.dates_selected[0].toISOString().split("T")[0];
		} else if (target.hasAttribute("selected")) {
			if (target.hasAttribute("istoday"))
				target.style.backgroundColor = STC.color_today;
			else
				target.style.backgroundColor = STC.color_unselected;
			target.removeAttribute("selected");
			STC.dates_selected.pop();
			document.querySelector("#selections_p").innerHTML = "Date selected: none";
			selection_in_progress = false;
		} else {
			selection_complete = true;
			target.style.backgroundColor = STC.color_selected;
			STC.dates_selected.push(new Date(STC.current_selection.year, STC.current_selection.month, target.innerHTML));
			const date1_f = STC.months[STC.dates_selected[0].getMonth()] + " " + HLPR.cardinalDate(STC.dates_selected[0].getDate()) + ", "
				+ STC.dates_selected[0].getFullYear();
			const date2_f = STC.months[STC.dates_selected[1].getMonth()] + " " + HLPR.cardinalDate(STC.dates_selected[1].getDate()) + ", "
				+ STC.dates_selected[1].getFullYear();
			const output = STC.dates_selected[0] < STC.dates_selected[1] ? date1_f + " - " + date2_f : date2_f + " - " + date1_f;
			document.querySelector("#selections_p").innerHTML = "Date selected: " + output;

			if (STC.dates_selected[0] < STC.dates_selected[1]) {
				document.querySelector("#date1_val").value = STC.dates_selected[0].toISOString().split("T")[0];
				document.querySelector("#date2_val").value = STC.dates_selected[1].toISOString().split("T")[0];
			} else {
				document.querySelector("#date2_val").value = STC.dates_selected[0].toISOString().split("T")[0];
				document.querySelector("#date1_val").value = STC.dates_selected[1].toISOString().split("T")[0];
			}
		}
	}
	else if (selection_in_progress) {
		if (target.hasAttribute("booked")) return;
		if (STC.dates_selected[0].getMonth() == STC.current_selection.month && STC.dates_selected[0].getFullYear() == STC.current_selection.year) {
			const low_selected = STC.dates_selected[0].getDate() <= target.innerHTML ? STC.dates_selected[0].getDate() : Number(target.innerHTML);
			const high_selected = STC.dates_selected[0].getDate() > target.innerHTML ? STC.dates_selected[0].getDate() : Number(target.innerHTML);
			
			for (let i = 0; i <= 41; i++) {
				const temp = document.querySelector(`#day${i}`);
				if (temp.innerHTML >= low_selected && temp.innerHTML <= high_selected) {
					temp.style.backgroundColor = STC.color_selected;
				} else if (temp.hasAttribute("istoday")) {
					temp.style.backgroundColor = STC.color_today;
				} else if (temp.hasAttribute("invalid")) {
					temp.style.backgroundColor = STC.color_invalid;
				} else {
					temp.style.backgroundColor = STC.color_unselected;
				}
			}
		} else {
			const temp_date = new Date(STC.current_selection.year, STC.current_selection.month, 1);
			const selectingEndDate = temp_date > STC.dates_selected[0] ? true : false;
			const current_date = Number(target.innerHTML);

			for (let i = 0; i <= 41; i++) {
				const temp = document.querySelector(`#day${i}`);
				if (temp.hasAttribute("invalid")) {
					temp.style.backgroundColor = STC.color_invalid;
				} else if ( (selectingEndDate && Number(temp.innerHTML) <= current_date) || (!selectingEndDate && Number(temp.innerHTML) >= current_date) ) {
					temp.style.backgroundColor = STC.color_selected;
				} else if (temp.hasAttribute("istoday")) {
					temp.style.backgroundColor = STC.color_today;
				} else {
					temp.style.backgroundColor = STC.color_unselected;
				}
			}
		}
	}
	else if (target.hasAttribute("selected") || target.hasAttribute("booked")) {
		return;
	}
	else if (event.type == "mouseover") {
		target.style.backgroundColor = "#8BDFF7";
	}
	else if (event.type == "mouseout") {
		if (target.hasAttribute("istoday") && !target.hasAttribute("selected"))
			target.style.backgroundColor = STC.color_today;
		else
			target.style.backgroundColor = STC.color_unselected;
	}
}

// Reset both the reservation selected and dates selected
function resetSelection() {
	selection_in_progress = false;
	selection_complete = false;
	document.querySelector("#date1_val").value = null;
	document.querySelector("#date2_val").value = null;
	STC.dates_selected = [ ];
	STC.reservation_target = null;
	document.querySelector("#delete_res_btn").disabled = true;
	document.querySelector("#edit_res_btn").disabled = true;
	document.querySelector("#selections_p").innerHTML = "Dates selected: none";
	document.querySelector("#reservation_select").innerHTML = "Reservation selected: none";

	setMonth(new Date(STC.current_selection.year, STC.current_selection.month));
}


// Initialize the main page
export function initializePage() {
	document.addEventListener("DOMContentLoaded", function() {
		const today = new Date();
		STC.current_selection.year = today.getFullYear();
		STC.current_selection.month = today.getMonth();
		BACKEND.retrievePreviousDates();

		document.querySelector("#submit_selection").addEventListener("click", BACKEND.submitDate);
		document.querySelector("#delete_res_btn").addEventListener("click", BACKEND.deleteReservation);
		document.querySelector("#edit_res_btn").addEventListener("click", BACKEND.editReservation);

		

		document.querySelector("#prev_month").addEventListener("click", HLPR.previousMonth);
		document.querySelector("#next_month").addEventListener("click", HLPR.nextMonth);
		document.querySelector("#reset_selection").addEventListener("click", resetSelection);

		for (let i = 0; i <= 41; i++) {
			document.querySelector(`#day${i}`).addEventListener("mouseover", calendarEvent);
			document.querySelector(`#day${i}`).addEventListener("mouseout", calendarEvent);
			document.querySelector(`#day${i}`).addEventListener("click", calendarEvent);
		}
	});
}