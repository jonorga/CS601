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

	async function loginToggle() {
		const owner_login = document.querySelector("#lgn_tgl_box").checked;
		
		const user_div = document.querySelector("#user_div");
		const owner_div = document.querySelector("#owner_div");

		let i = 1;
		if (owner_login) {
			while (i > 0) {
				user_div.style.opacity = i;
				await new Promise(r => setTimeout(r, 50));
				i -= 0.1;
			}
			user_div.style.display = "none";
			owner_div.style.opacity = 0;
			owner_div.style.display = "block";
			while (i < 1) {
				owner_div.style.opacity = i;
				await new Promise(r => setTimeout(r, 50));
				i += 0.1;
			}
			owner_div.style.opacity = 1;
		}
		else {
			while (i > 0) {
				owner_div.style.opacity = i;
				await new Promise(r => setTimeout(r, 50));
				i -= 0.1;
			}
			owner_div.style.display = "none";
			user_div.style.opacity = 0;
			user_div.style.display = "block";
			while (i < 1) {
				user_div.style.opacity = i;
				await new Promise(r => setTimeout(r, 50));
				i += 0.1;
			}
			user_div.style.opacity = 1;
		}
	}

	document.querySelector("#username").addEventListener("keyup", ownerFieldChange);
	document.querySelector("#password").addEventListener("keyup", ownerFieldChange);
	document.querySelector("#user_login").addEventListener("keyup", userFieldChange);
	document.querySelector("#lgn_tgl_box").addEventListener("click", loginToggle);
});