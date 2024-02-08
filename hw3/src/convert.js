export function convertTemp() {
	document.addEventListener("DOMContentLoaded", function() {
		const temp_input = document.getElementById("temperature_input");
		const temp_output_f = document.getElementById("output_f");
		const temp_output_c = document.getElementById("output_c");

		function fToC(fVal) {
			// The line below validates the entry to be a number in the correct range or returns invalid input
			if (isNaN(Number(fVal)) || Number(fVal) > 250 || Number(fVal) < -250)
				return "invalid input";
			if (fVal == "")
				return "no value entered";
			return Math.floor(((fVal - 32) * 5) / 9);
		}
		function updateValues() {
			temp_output_f.innerHTML = "Celcius temp: " + fToC(temp_input.value);
			temp_output_c.innerHTML = "F temp: " + temp_input.value;
		}


		temp_input.addEventListener("keyup", updateValues);
		temp_input.addEventListener("click", updateValues);
	});
}