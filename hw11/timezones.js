const locations = {
    zipcodes: {
        11111: {
            proper: "Los Angeles, California",
            zone: "7"
        },
        22222: {
            proper: "Salt Lake City, Utah",
            zone: "6"
        },
        33333: {
            proper: "Houston, Texas",
            zone: "5"
        },
        44444: {
            proper: "Boston, Massachusetts",
            zone: "4"
        }
    },
    cities: {
        "los angeles california": {
            proper: "Los Angeles, California",
            zip: 11111,
            zone: "7"
        },
        "salt lake city utah": {
            proper: "Salt Lake City, Utah",
            zip: 22222,
            zone: "6"
        },
        "houston texas": {
            proper: "Houston, Texas",
            zip: 33333,
            zone: "5"
        },
        "boston massachusetts": {
            proper: "Boston, Massachusetts",
            zip: 44444,
            zone: "4"
        }
    }
};
function optionEvent(event) {
    const target = event.currentTarget;
    const content = target.getAttribute("content");
    const new_div = document.createElement("div");
    const para = document.createElement("p");
    new_div.appendChild(para);
    new_div.classList.add("display_item");
    new_div.setAttribute("content", content);
    if (document.getElementById("display") != null && document.getElementById("display") != undefined)
        document.getElementById("display").appendChild(new_div);
}
function addListOption(cityproper, zipcode, zone) {
    const new_div = document.createElement("div");
    const para = document.createElement("p");
    para.innerHTML = cityproper + ", " + zipcode + " (UTC-" + zone + ")";
    new_div.appendChild(para);
    new_div.addEventListener("click", optionEvent);
    new_div.classList.add("dd_option");
    new_div.setAttribute("content", cityproper + ";" + zipcode + ";" + zone);
    if (document.getElementById("dropdown_div") != null && document.getElementById("dropdown_div") != undefined)
        document.getElementById("dropdown_div").appendChild(new_div);
}
function searchEvent() {
    const dd_div = document.getElementById("dropdown_div");
    if (dd_div == null || dd_div == undefined)
        return;
    const all_option_divs = dd_div.getElementsByTagName("div");
    Object.keys(all_option_divs).map(() => { all_option_divs[0].remove(); });
    if (document.getElementById("search_input") == null || document.getElementById("search_input") == undefined)
        return;
    const input = document.querySelector("#search_input").value;
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
                addListOption(locations.zipcodes[key].proper, Number(key), locations.zipcodes[key].zone);
            }
        }
    }
}
async function dynamicDisplay() {
    const display_div = document.getElementById("display");
    if (display_div == null || display_div == undefined)
        return;
    while (true) {
        const all_display_divs = display_div.getElementsByTagName("div");
        Object.keys(all_display_divs).map((i) => {
            const content = all_display_divs[Number(i)].getAttribute("content");
            if (content != null && content != "") {
                const content_parsed = content.split(";");
                const para = all_display_divs[Number(i)].getElementsByTagName("p");
                const date = new Date();
                date.setHours(date.getHours() - Number(content_parsed[2]));
                para[0].innerHTML = content_parsed[0] + " " + content_parsed[1] + " " + date.toUTCString();
            }
        });
        await new Promise(r => setTimeout(r, 1000));
    }
}
export function pageFunction() {
    document.addEventListener("DOMContentLoaded", function () {
        const search_input = document.getElementById("search_input");
        if (search_input != null) {
            search_input.addEventListener("keyup", searchEvent);
        }
        dynamicDisplay();
    });
}
