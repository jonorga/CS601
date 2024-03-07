document.addEventListener("DOMContentLoaded", function() {
	let letterSet = new Set([]);
	document.querySelector("#submitbtn").addEventListener("click", function() {
		const input = document.querySelector("#input").value;

		// Validate letter
		if ((/[a-zA-Z]/).test(input)) {
			letterSet.add(input);
		}

		let output = "";
		letterSet.forEach(l => output += l + " ");
		document.querySelector("#output").innerHTML = "Collected letters: " + output;
	});
});