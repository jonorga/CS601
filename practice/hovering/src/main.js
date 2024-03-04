document.addEventListener("DOMContentLoaded", function () {
	function DivClickCallback(event) {
		const ID = event.currentTarget.id
		const t = new Date();
		const new_sect = document.createElement("p");
		new_sect.innerHTML = t + " div ID: " + ID;
		document.querySelector("#output").appendChild(new_sect);
	}

	function DivHoverCallback(event) {
		const placeholder = event.currentTarget.getAttribute("placeholder");
		console.log(placeholder);
	}

	for (let i = 1; i <= 5; i++) {
		document.querySelector(`#div_${i}`).addEventListener("click", DivClickCallback);
		document.querySelector(`#div_${i}`).addEventListener("mouseover", DivHoverCallback);
	}
});