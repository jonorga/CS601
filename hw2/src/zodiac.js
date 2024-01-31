/*
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
*/
const zodiac_years = {
	0: {
		name: "Rat",
		info: "ratratrat",
		imgsrc: "images/rat.png"
	},
	1: {
		name: "Ox",
		info: "oxoxo",
		imgsrc: "images/ox.jpeg"
	},
	2: {
		name: "Tiger",
		info: "tigertiger",
		imgsrc: "images/tiger.jpg"
	},
	3: {
		name: "Rabbit",
		info: "rabbitrabb",
		imgsrc: "images/rabbit.jpg"
	},
	4: {
		name: "Dragon",
		info: "dragondragon",
		imgsrc: "images/dragon.jpg"
	},
	5: {
		name: "Snake",
		info: "snakesnake",
		imgsrc: "images/snake.jpeg"
	},
	6: {
		name: "Horse",
		info: "horsehorse",
		imgsrc: "images/horse.png"
	},
	7: {
		name: "Goat",
		info: "goatgoat",
		imgsrc: "images/goat.jpg"
	},
	8: {
		name: "Monkey",
		info: "monkeymonkey",
		imgsrc: "images/monkey.jpeg"
	},
	9: {
		name: "Rooster",
		info: "roosterrooser",
		imgsrc: "images/rooster.jpg"
	},
	10: {
		name: "Dog",
		info: "dogdogdog",
		imgsrc: "images/dog.jpg"
	},
	11: {
		name: "Pig",
		info: "pigpigpig",
		imgsrc: "images/pig.jpg"
	}
};

document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("submityear").addEventListener("click", function() {
		function inputCheck(input_val) {
			if (input_val >= 1948 && input <= 2024)
				return input_val - 1948;
			else
				return -1;
		}
		function getOutput(input_val, area) {
			if (input_val == -1)
			{
				if (area == 1)
					return "no data found for that year";
				else
					return "";
			}
			else
			{
				if (area == 1)
					return "Your animal: " + zodiac_years[input_val % 12].name;
				else if (area == 2)
					return zodiac_years[input_val % 12].info;
				else if (area == 3)
					return zodiac_years[input_val % 12].imgsrc;
			}
		}
		const input = document.getElementById("yearinput").value;
		const input_filtered = inputCheck(input);
		document.getElementById("outputheader").innerHTML = getOutput(input_filtered, 1);
		document.getElementById("outputbody").innerHTML = getOutput(input_filtered, 2);
		document.getElementById("outputimg").src = getOutput(input_filtered, 3);
		document.getElementById("outputimg").alt = getOutput(input_filtered, 1);
	});

	document.getElementById("reset").addEventListener("click", function () {
		document.getElementById("outputheader").innerHTML = "";
		document.getElementById("outputbody").innerHTML = "";
		document.getElementById("outputimg").src = "";
		document.getElementById("outputimg").alt = "";
		document.getElementById("yearinput").value = "";
	});
})