import { STC, HLPR, BACKEND_BASIC } from '/term/src/res.common.js';

// All backend call functions
class BACKEND extends BACKEND_BASIC {
	// Delete the current selection from the table
	static deleteReservation() {
		const formdata = new FormData();
		formdata.append("user", STC.user);
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
		formdata.append("user", STC.user);
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

	HLPR.setMonth(new Date(STC.current_selection.year, STC.current_selection.month));
}

function submitDateHandler() {
	BACKEND.submitDate(resetSelection);
}

// Initialize the main page
export function initializePage() {
	document.addEventListener("DOMContentLoaded", function() {
		STC.user = document.querySelector("meta[name=database]").getAttribute("content");
		const today = new Date();
		STC.current_selection.year = today.getFullYear();
		STC.current_selection.month = today.getMonth();
		BACKEND.retrievePreviousDates();

		document.querySelector("#submit_selection").addEventListener("click", submitDateHandler);
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