export function convertTemp() {
	document.addEventListener("DOMContentLoaded", function() {
		const temp_input = document.getElementById("temperature_input");
		const temp_output = document.getElementById("output");

		function fToC(fVal) {
			// The line below validates the entry to be a number in the correct range or returns invalid input
			if (isNaN(Number(fVal)) || Number(fVal) > 250 || Number(fVal) < -250)
				return "invalid input";
			if (fVal == "")
				return "__° Fahrenheit = __° Celcius";
			return fVal + "° Fahrenheit = " + Math.floor(((fVal - 32) * 5) / 9) + "° Celcius";
		}
		function updateValues() {
			temp_output.innerHTML = fToC(temp_input.value);
		}


		temp_input.addEventListener("keyup", updateValues);
		temp_input.addEventListener("click", updateValues);
	});
}