document.addEventListener("DOMContentLoaded", function () {
	document.querySelector("#submit_login").addEventListener("click", function () {
		const user = document.querySelector("#username").value;
		const pass = document.querySelector("#password").value;
		if (user == "" || pass == "") {
			alert("Please enter a username and password");
			return;
		}
		if (user.match(/[^0-9a-z]/i) || pass.match(/[^0-9a-z]/i)) {
			alert("Your username and password can only include letters and numbers");
			return;
		}

		// Pass values to DB
		// If match go to page
		// If no match return that
		const formdata = new FormData();
		formdata.append("user", user);
		formdata.append("pass", pass);

		const request = new Request('login.php', {
			method: 'POST',
			body: formdata
		});

		fetch(request)
			.then((res) => res.text())
			.then((text) => {
				const parsed = text.split(" ");
				if (parsed.length == 2 && parsed[0] == "success") {
					alert(`${parsed[1]} logged in successfully`);
				}
				else {
					document.querySelector("#login_output").innerHTML = `Unable to login: ${text}`;
				}
			})
			.catch((err) => {
				console.log(`Error! Server says: ${err}`);
				alert("There's a problem with the server... [backend login call]");
			});
	});
});