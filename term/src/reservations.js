import { STC, PAGE_FUNC, BACKEND_BASIC as BACKEND } from '/term/src/res.common.js';


// Initialize the main page
export function initializePage() {
	document.addEventListener("DOMContentLoaded", function() {
		STC.user = document.querySelector("meta[name=database]").getAttribute("content");
		const today = new Date();
		STC.current_selection.year = today.getFullYear();
		STC.current_selection.month = today.getMonth();
		BACKEND.retrievePreviousDates();

		document.querySelector("#submit_selection").addEventListener("click", BACKEND.submitDate);

		

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


