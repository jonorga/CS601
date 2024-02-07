document.addEventListener("DOMContentLoaded", function() {
	function fToC(fVal) {
		if (isNaN(Number(fVal)) || Number(fVal) > 250 || Number(fVal) < -250)
			return "invalid input";
		return Math.floor(((fVal - 32) * 5) / 9);
	}
	const slider_input = document.getElementById("slider_input");
	const temp_output = document.getElementById("slider_output");
	const temp_output2 = document.getElementById("slider_output2");
	temp_output.innerHTML = "Celcius temp: " + fToC(slider_input.value);
	temp_output2.innerHTML = "F temp: " + slider_input.value;


	slider_input.addEventListener("change", function() {
		temp_output.innerHTML = "Celcius temp: " + fToC(slider_input.value);
		temp_output2.innerHTML = "F temp: " + slider_input.value;
	});
});