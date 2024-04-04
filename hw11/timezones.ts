const locations = {
    zipcodes: {
        11111: {
        	proper: "Los Angeles, California",
        	zone: "UTC-7"
        },
        22222: {
        	proper: "Salt Lake City, Utah",
        	zone: "UTC-6"
        },
        33333: {
        	proper: "Houston, Texas",
        	zone: "UTC-5"
        },
        44444: {
        	proper: "Boston, Massachusetts",
        	zone: "UTC-4"
        }
    },
    cities: {
        "los angeles california": {
        	proper: "Los Angeles, California",
			zip: 11111,
        	zone: "UTC-7"
        },
        "salt lake city utah": {
        	proper: "Salt Lake City, Utah",
			zip: 22222,
        	zone: "UTC-6"
        },
        "houston texas": {
        	proper: "Houston, Texas",
			zip: 33333,
        	zone: "UTC-5"
        },
        "boston massachusetts": {
        	proper: "Boston, Massachusetts",
			zip: 44444,
        	zone: "UTC-4"
        }
    }
};

function addListOption(cityproper: string, zipcode: number, zone: string) {
	const new_div = document.createElement("div");
	const para = document.createElement("p");
	para.innerHTML = cityproper + ", " + zipcode + " (" + zone + ")";
	new_div.appendChild(para);
	new_div.classList.add("dd_option");
	document.getElementById("dropdown_div").appendChild(new_div);
}

function searchEvent() {
	const dd_div = document.getElementById("dropdown_div");
	const all_option_divs = dd_div.getElementsByTagName("div");
	Object.keys(all_option_divs).map( () => {all_option_divs[0].remove()} );

	const input = document.getElementById("search_input").value;
	if (input == null || input == "")
        return;
    
    if (input.match(/[a-zA-Z]/)) {
        const lower_input = input.toLowerCase();
		const regex = new RegExp(lower_input);
		for (let key in locations.cities) {
			if (key.match(regex)) {
				addListOption(locations.cities[key].proper, locations.cities[key].zip, locations.cities[key].zone);
			}
		}
    }
    else if (input.match(/\d+/)) {
        const regex = new RegExp(input);
        for (let key in locations.zipcodes) {
            if (key.match(regex)) {
				addListOption(locations.zipcodes[key].proper, key, locations.zipcodes[key].zone);
            }
        }
    }
}

export function pageFunction() {
    document.addEventListener("DOMContentLoaded", function () {
        const search_input = document.getElementById("search_input");
        if (search_input != null) {
            search_input.addEventListener("keyup", searchEvent);
        }
    });
}
