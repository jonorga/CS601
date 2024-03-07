// The following code:
let nctPromise = new Promise(function(resolve, reject) {
	setTimeout(function() {
		resolve("jumping on my trauma. Already wear pajamas");
	}, 2000);
});

nctPromise.then(function(data) {
	console.log(data + ' 11');
});

nctPromise.then(function(data) {
	console.log(data + ' 22');
});

nctPromise.then(function(data) {
	console.log(data + ' 33');
});


// Will output the following to the console after 2 seconds:
// jumping on my trauma. Already wear pajamas 11
// jumping on my trauma. Already wear pajamas 22
// jumping on my trauma. Already wear pajamas 33
