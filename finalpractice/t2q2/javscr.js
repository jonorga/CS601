export function exampleFunction() {
	const newElement = document.createElement("p");
	newElement.innerHTML = "I'm from a function within an exported module!";
	document.querySelector("#output").appendChild(newElement);
}