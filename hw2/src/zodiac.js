const zodiac_years = {
	0: {
		name: "Rat",
		info: "The rat is the first of the twelve zodiac signs, representing wisdom and flexibility."
			+ " The lucky direction for the rat is north, because north belongs to water, and so does the rat."
			+ " The rat is compatible with the dragon, monkey and ox, but clashes with the horse, rooster and rabbit."
			+ " The rat is associated with the midnight hours, from 11 pm to 1 am, when it is most active."
			+ " The rat is a symbol of wealth and prosperity, because it can find food and resources in any environment."
			+ " The rat is also a symbol of fertility and longevity, because it can reproduce quickly and live for a long time.",
		imgsrc: "images/rat.png"
	},
	1: {
		name: "Ox",
		info: "The ox is the second of the twelve zodiac signs, representing diligence and persistence."
		+ " The lucky direction for the ox is northeast, because northeast belongs to earth, and so does the ox."
		+ " The ox is compatible with the snake, rooster and rat, but clashes with the dragon, goat and dog."
		+ " The ox is associated with the early morning hours, from 1 am to 3 am, when it is hard at work."
		+ " The ox is a symbol of strength and stability, because it can carry heavy loads and endure hardships."
		+ " The ox is also a symbol of honesty and loyalty, because it is faithful to its master and follows orders.",
		imgsrc: "images/ox.jpeg"
	},
	2: {
		name: "Tiger",
		info: "The tiger is the third of the twelve zodiac signs, representing courage and charisma."
		+ " The lucky direction for the tiger is east, because east belongs to wood, and so does the tiger."
		+ " The tiger is compatible with the horse, dog and pig, but clashes with the monkey, snake and ox."
		+ " The tiger is associated with the dawn hours, from 3 am to 5 am, when it is ready to hunt."
		+ " The tiger is a symbol of power and authority, because it is the king of the beasts and commands respect."
		+ " The tiger is also a symbol of passion and generosity, because it is bold and adventurous, and willing to share its prey.",
		imgsrc: "images/tiger.jpg"
	},
	3: {
		name: "Rabbit",
		info: "The rabbit is the fourth of the twelve zodiac signs, representing gentleness and grace."
		+ " The lucky direction for the rabbit is south, because south belongs to wood, and so does the rabbit."
		+ " The rabbit is compatible with the goat, pig and dog, but clashes with the rooster, dragon and rat."
		+ " The rabbit is associated with the morning hours, from 5 am to 7 am, when it is peaceful and calm."
		+ " The rabbit is a symbol of luck and happiness, because it can escape danger and enjoy life."
		+ " The rabbit is also a symbol of elegance and beauty, because it has a soft fur and a graceful posture.",
		imgsrc: "images/rabbit.jpg"
	},
	4: {
		name: "Dragon",
		info: "The dragon is the fifth of the twelve zodiac signs, representing power and majesty."
		+ " The lucky direction for the dragon is southeast, because southeast belongs to wood, and so does the dragon."
		+ " The dragon is compatible with the rat, monkey and rooster, but clashes with the dog, ox and goat."
		+ " The dragon is associated with the late morning hours, from 7 am to 9 am, when it is energetic and lively."
		+ " The dragon is a symbol of success and glory, because it can soar high and achieve great things."
		+ " The dragon is also a symbol of wisdom and creativity, because it has a long history and a rich culture.",
		imgsrc: "images/dragon.jpg"
	},
	5: {
		name: "Snake",
		info: "The snake is the sixth of the twelve zodiac signs, representing mystery and charm."
		+ " The lucky direction for the snake is south, because south belongs to fire, and so does the snake."
		+ " The snake is compatible with the ox, rooster and monkey, but clashes with the pig, tiger and monkey."
		+ " The snake is associated with the noon hours, from 9 am to 11 am, when it is warm and sunny."
		+ " The snake is a symbol of wealth and romance, because it can attract money and love with its charisma and allure."
		+ " The snake is also a symbol of intelligence and intuition, because it can sense danger and opportunity with its keen perception.",
		imgsrc: "images/snake.jpeg"
	},
	6: {
		name: "Horse",
		info: "The horse is the seventh of the twelve zodiac signs, representing freedom and enthusiasm."
		+ " The lucky direction for the horse is south, because south belongs to fire, and so does the horse."
		+ " The horse is compatible with the tiger, dog and goat, but clashes with the rat, ox and rooster."
		+ " The horse is associated with the afternoon hours, from 11 am to 1 pm, when it is active and energetic."
		+ " The horse is a symbol of speed and adventure, because it can run fast and explore new places."
		+ " The horse is also a symbol of independence and optimism, because it can live on its own and always see the bright side.",
		imgsrc: "images/horse.png"
	},
	7: {
		name: "Goat",
		info: "The goat is the eighth of the twelve zodiac signs, representing kindness and harmony."
		+ " The lucky direction for the goat is southwest, because southwest belongs to earth, and so does the goat."
		+ " The goat is compatible with the rabbit, pig and horse, but clashes with the ox, dragon and dog."
		+ " The goat is associated with the late afternoon hours, from 1 pm to 3 pm, when it is peaceful and serene."
		+ " The goat is a symbol of creativity and artistry, because it can make beautiful things with its imagination and skill."
		+ " The goat is also a symbol of gentleness and compassion, because it can care for others and share its feelings.",
		imgsrc: "images/goat.jpg"
	},
	8: {
		name: "Monkey",
		info: "The monkey is the ninth of the twelve zodiac signs, representing cleverness and curiosity."
		+ " The lucky direction for the monkey is west, because west belongs to metal, and so does the monkey."
		+ " The monkey is compatible with the rat, dragon, and snake, but clashes with the tiger, pig, and goat."
		+ " The monkey is associated with the evening hours, from 3 pm to 5 pm, when it is playful and mischievous."
		+ " The monkey is a symbol of intelligence and innovation because it can learn fast and invent new things."
		+ " The monkey is also a symbol of humor and fun because it can make others laugh and enjoy life.",
		imgsrc: "images/monkey.jpeg"
	},
	9: {
		name: "Rooster",
		info: "The rooster is the tenth of the twelve zodiac signs, representing confidence and diligence."
		+ " The lucky direction for the rooster is west because west belongs to metal, and so does the rooster."
		+ " The rooster is compatible with the ox, snake, and dragon, but clashes with the rabbit, dog, and rat."
		+ " The rooster is associated with the dusk hours, from 5 pm to 7 pm, when it is alert and vigilant."
		+ " The rooster is a symbol of leadership and authority because it can lead others and command respect."
		+ " The rooster is also a symbol of punctuality and honesty because it can wake up early and tell the truth.",
		imgsrc: "images/rooster.jpg"
	},
	10: {
		name: "Dog",
		info: "The dog is the eleventh of the twelve zodiac signs, representing loyalty and justice."
		+ " The lucky direction for the dog is northwest because northwest belongs to metal, and so does the dog."
		+ " The dog is compatible with the tiger, rabbit, and horse, but clashes with the dragon, goat, and rooster."
		+ " The dog is associated with the night hours, from 7 pm to 9 pm, when it is faithful and protective."
		+ " The dog is a symbol of friendship and trust because it can be a good companion and a reliable partner."
		+ " The dog is also a symbol of righteousness and courage because it can defend the weak and fight the evil.",
		imgsrc: "images/dog.jpg"
	},
	11: {
		name: "Pig",
		info: "The pig is the twelfth of the twelve zodiac signs, representing wealth and happiness."
		+ " The lucky direction for the pig is north, because north belongs to water, and so does the pig."
		+ " The pig is compatible with the goat, rabbit, and tiger, but clashes with the snake, monkey, and rooster."
		+ " The pig is associated with the late night hours, from 9 pm to 11 pm, when it is relaxed and content."
		+ " The pig is a symbol of abundance and generosity because it can enjoy life and share its fortune."
		+ " The pig is also a symbol of sincerity and tolerance because it can be honest and forgiving.",
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
				else if (area == 5)
					return "0px";
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
				else if (area == 4)
					return zodiac_years[input_val % 12].name;
				else if (area == 5)
					return "100px";
			}
		}
		const input = document.getElementById("yearinput").value;
		const input_filtered = inputCheck(input);
		document.getElementById("outputheader").innerHTML = getOutput(input_filtered, 1);
		document.getElementById("outputbody").innerHTML = getOutput(input_filtered, 2);
		const output_img = document.getElementById("outputimg");
		output_img.src = getOutput(input_filtered, 3);
		output_img.alt = getOutput(input_filtered, 4);
		output_img.style.height = getOutput(input_filtered, 5);
		output_img.style.width = getOutput(input_filtered, 5);
	});

	document.getElementById("reset").addEventListener("click", function () {
		document.getElementById("outputheader").innerHTML = "";
		document.getElementById("outputbody").innerHTML = "";
		const output_img = document.getElementById("outputimg");
		output_img.src = "";
		output_img.alt = "";
		output_img.style.height = "0px";
		output_img.style.width = "0px";
		document.getElementById("yearinput").value = "";
	});
})