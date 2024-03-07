document.addEventListener("DOMContentLoaded", function () {
	function pCallback(event) {
		const targetP = document.querySelector(`#${event.currentTarget.id}`);
		if (targetP.style.border == "") {
			targetP.style.border = "blue dotted 1px";
		}
		else {
			targetP.style.border = "";
		}
	}

	for (let i = 0; i < 10; i++) {
		document.querySelector(`#p_${i}`).addEventListener("click", pCallback);
	}

	// ORIGINAL CODE:
	// int k = 0;
	// const 8ball = "grilled cheese";

	// if (const i = 1: i < j: i++) {
	// 	document.alert("I"d like to have tomatoes with my &{8ball} and a slice of deli ham on the side, please...");
	// }


	// FIXED CODE:
	const k = 3;
	const eightball = "grilled cheese";

	for (let i = 1; i < k; i++) {
//		alert(`Id like to have tomatoes with my ${eightball} and a slice of deli ham on the side, please...`);
	}
});