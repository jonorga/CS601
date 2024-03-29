document.addEventListener("DOMContentLoaded", function () {
	function ownerFieldChange() {
		const user = document.querySelector("#username").value;
		const pass = document.querySelector("#password").value;

		if (user.match(/[^0-9a-z]/i) || pass.match(/[^0-9a-z]/i)) {
			document.querySelector("#owner_hint").style.display = "inline";
			document.querySelector("#submit_login").disabled = true;
			return;
		}
		else {
			document.querySelector("#owner_hint").style.display = "none";
		}

		if (user != "" && pass != "") {
			document.querySelector("#submit_login").disabled = false;
		}
		else {
			document.querySelector("#submit_login").disabled = true;
		}
	}

	function userFieldChange() {
		const prop = document.querySelector("#user_login").value;

		if (prop.match(/[^0-9a-z]/i)) {
			document.querySelector("#user_hint").style.display = "inline";
			document.querySelector("#prop_search").disabled = true;
			return;
		}
		else {
			document.querySelector("#user_hint").style.display = "none";
		}

		if (prop != "") {
			document.querySelector("#prop_search").disabled = false;
		}
		else {
			document.querySelector("#prop_search").disabled = true;
		}
	}

	document.querySelector("#username").addEventListener("keyup", ownerFieldChange);
	document.querySelector("#password").addEventListener("keyup", ownerFieldChange);
	document.querySelector("#user_login").addEventListener("keyup", userFieldChange);
});