const zodiac_years = [
	"Rat",
	"Ox",
	"Tiger",
	"Rabbit",
	"Dragon",
	"Snake",
	"Horse",
	"Goat",
	"Monkey",
	"Rooster",
	"Dog",
	"Pig"
]

document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("submityear").addEventListener("click", function() {
		function inputCheck(input_val) {
			if (input_val >= 1948 && input <= 2024)
				return input_val - 1948;
			else
				return -1;
		}
		function getOutput(input_val) {
			if (input_val == -1)
				return "no data found for that year";
			else
				return zodiac_years[input_val % 12]
		}
		const input = document.getElementById("yearinput").value;
		document.getElementById("output").innerHTML = "Input is: " + getOutput(inputCheck(input));
	});
})