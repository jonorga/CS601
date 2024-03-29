import { STC, HLPR, BACKEND_BASIC as BACKEND } from '/term/src/res.common.js';

function calendarEvent(event) {
	if (STC.selection_complete || event.currentTarget.hasAttribute("invalid") || event.currentTarget.hasAttribute("booked")) return;
	const target = event.currentTarget;
	if (event.type == "click") {
		if (!target.hasAttribute("selected") && !STC.selection_in_progress) {
			target.style.backgroundColor = STC.color_selected;
			target.setAttribute("selected", "");
			STC.dates_selected.push(new Date(STC.current_selection.year, STC.current_selection.month, target.innerHTML));
			document.querySelector("#selections_p").innerHTML = "Date selected: " 
				+ STC.months[STC.dates_selected[0].getMonth()] + " " + HLPR.cardinalDate(STC.dates_selected[0].getDate()) + ", "
				+ STC.dates_selected[0].getFullYear();
			STC.selection_in_progress = true;
			document.querySelector("#date1_val").value = STC.dates_selected[0].toISOString().split("T")[0];
		} else if (target.hasAttribute("selected")) {
			if (target.hasAttribute("istoday"))
				target.style.backgroundColor = STC.color_today;
			else
				target.style.backgroundColor = STC.color_unselected;
			target.removeAttribute("selected");
			STC.dates_selected.pop();
			document.querySelector("#selections_p").innerHTML = "Date selected: none";
			STC.selection_in_progress = false;
		} else {
			STC.selection_complete = true;
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
	else if (STC.selection_in_progress) {
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
	STC.selection_in_progress = false;
	STC.selection_complete = false;
	document.querySelector("#date1_val").value = null;
	document.querySelector("#date2_val").value = null;
	STC.dates_selected = [ ];
	STC.reservation_target = null;
	document.querySelector("#selections_p").innerHTML = "Dates selected: none";

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

export {
	STC,
	HLPR,
	BACKEND as BACKEND_BASIC
};
