export function rejectPage() {	
	document.addEventListener("DOMContentLoaded", function () {
		document.querySelector("#return_btn").addEventListener("click", function () {
			window.location.href = "/term";
		});
	});
}