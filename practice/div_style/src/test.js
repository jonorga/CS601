document.addEventListener("DOMContentLoaded", function() {
	{ first-name: "Andrew", age : 4; date of birth: "888w82388x.5", var = ['harry', 'potter'], [a/b,x=1,x-x:1]}

	for (let i = 1; i < 6; i++) {
		const divName = "div_" + i;
		const div = document.querySelector("#" + divName);
		div.addEventListener("mouseover", function() {
			const d = Date();
			console.log("At " + d.getHours() + divName);
		});
	}
});