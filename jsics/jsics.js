/*
Check for "BEGIN:VEVENT" and "END:VEVENT"
if present: Check for "BEGIN:VCALENDAR", "END:VCALENDAR", and "VERSION:2.0"
	if any missing, note calendar may have errors
	if none missing: parse events
		Start scanning down for a "BEGIN:VEVENT" line
			once found, keep scanning until "END:VEVENT" found
				while scanning look for "SUMMARY:*event name*", "DTSTART;VALUE=DATE:*yyyymmdd*", and "DTEND;VALUE=DATE:yyyymmdd"
				both DTSTART and DTEND must be present for a valid date, name will have default "No event name found"
				when "DTSTART" or "DTEND" found, if format = "yyyymmdd" (last 8 digits are numbers), parse to date
					if format = "yyyymmddThhMMss", split at T, then take date
if not present: output "error, no calendar events found"
*/

document.addEventListener("DOMContentLoaded", function () {
	class CalendarEvent {
		constructor() {
			this.name = "No event name found";
			this.start = null;
			this.end = null;
		}

		setName(name_value) {
			this.name = name_value;
		}

		setStart(start_value) {
			this.start = start_value;
		}

		setEnd(end_value) {
			this.end = end_value;
		}
	}

	function readICS(text) {
		if (text.includes("BEGIN:VEVENT") && text.includes("END:VEVENT")) {
			// File has events
			if (!text.includes("BEGIN:VCALENDAR") || !text.includes("END:VCALENDAR")) {
				console.log("File may be corrupted");
			}
			if (text.includes("VERSION:") && !text.includes("VERSION:2.0")) {
				console.log("ICS file type may be out of date");
			}

			const lines = text.split("\n");
			const events = [ ];
			let event_found = false;
			let event_object = null;
			for (const line of lines) {
				if (line.match("BEGIN:VEVENT")) {
					event_found = true;
					event_object = new CalendarEvent();
				}
				else if (line.match("END:VEVENT")) {
					event_found = false;
				}
				else if (event_found) {
					if (line.match(/SUMMARY:*/)) {
						event_object.setName(line.slice(8));
					}
					if (line.match(/DTSTART;*/)) {
						if (line.match(/\d{8}$/)) {
							console.log("match");
						}
						else
							console.log(line)
						//event_object.setName(line.slice(8));
					}
				}
			}
		}
		else {
			console.log("error, no calendar events found")
		}
	}

	fetch("./test.ics")
		.then((res) => res.text())
		.then((text) => {
			readICS(text);
		})
		.catch((err) => {
			console.log(`Error reading file ${err}`);
		})
});