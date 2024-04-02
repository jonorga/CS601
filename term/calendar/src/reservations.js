import { STC, PAGE_FUNC, BACKEND_BASIC } from '/term/src/js/res.common.js';

// All backend call functions
class BACKEND extends BACKEND_BASIC {
	// Delete the current selection from the table
	static deleteReservation() {
		const formdata = new FormData();
		formdata.append("user", STC.user);
		formdata.append("date1", STC.reservation_target[1]);
		formdata.append("date2", STC.reservation_target[2]);

		const request = new Request('/term/src/php/delete_reservation.php', {
			method: 'POST',
			body: formdata
		});

		fetch(request)
			.then((res) => res.text())
			.then((text) => {
				const previous_status = document.querySelector("#server_status").innerHTML;
				document.querySelector("#server_status").innerHTML = `${previous_status} Server said: ${text}`;
				BACKEND.retrievePreviousDates();
				PAGE_FUNC.resetSelection();
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

		const request = new Request('/term/src/php/edit_reservation.php', {
			method: 'POST',
			body: formdata
		});

		fetch(request)
			.then((res) => res.text())
			.then((text) => {
				const previous_status = document.querySelector("#server_status").innerHTML;
				document.querySelector("#server_status").innerHTML = `${previous_status} Server said: ${text}`;
				BACKEND.retrievePreviousDates();
				PAGE_FUNC.resetSelection();
			});
	}
}



// Initialize the main page
export function initializePage() {
	document.addEventListener("DOMContentLoaded", function() {
		STC.user = document.querySelector("meta[name=database]").getAttribute("content");
		const today = new Date();
		STC.current_selection.year = today.getFullYear();
		STC.current_selection.month = today.getMonth();
		BACKEND.retrievePreviousDates();

		document.querySelector("#submit_selection").addEventListener("click", BACKEND.submitDate);
		document.querySelector("#delete_res_btn").addEventListener("click", BACKEND.deleteReservation);
		document.querySelector("#edit_res_btn").addEventListener("click", BACKEND.editReservation);

		

		document.querySelector("#prev_month").addEventListener("click", PAGE_FUNC.previousMonth);
		document.querySelector("#next_month").addEventListener("click", PAGE_FUNC.nextMonth);
		document.querySelector("#reset_selection").addEventListener("click", PAGE_FUNC.resetSelection);

		for (let i = 0; i <= 41; i++) {
			document.querySelector(`#day${i}`).addEventListener("mouseover", PAGE_FUNC.calendarEvent);
			document.querySelector(`#day${i}`).addEventListener("mouseout", PAGE_FUNC.calendarEvent);
			document.querySelector(`#day${i}`).addEventListener("click", PAGE_FUNC.calendarEvent);
		}
	});
}