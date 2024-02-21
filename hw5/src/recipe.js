export function AddNewRecipe() {
	document.addEventListener("DOMContentLoaded", function() {

		// Finish button
		const finishButton = document.getElementById("finish_recipe");
		finishButton.addEventListener("click", function() {
			const recipe_title = document.getElementById("title_input").value;
			const recipe_desc = document.getElementById("desc_input").value;
			document.getElementById("title_output").innerHTML = "Recipe for: " + recipe_title;
			document.getElementById("desc_output").innerHTML = "Description: " + recipe_desc;

			const steps_display_div = document.createElement("div");
			steps_display_div.id = "steps_display_div";
			document.getElementById("recipe_display").appendChild(steps_display_div);
			const all_steps = document.getElementById("recipe_steps").getElementsByTagName("div");
			for (let i = 0; i < all_steps.length; i++) {
				const step_text = all_steps[i].getElementsByTagName("input")[0].value;
				const step_element = document.createElement("p");
				step_element.innerHTML = "Step " + (i + 1) + ": " + step_text;
				steps_display_div.appendChild(step_element);
			}

			document.getElementById("recipe_input").style.display = "none";
			document.getElementById("recipe_display").style.display = "block";
		});

		let currentStep = 1;
		const addStepButton = document.getElementById("add_new_step");
		addStepButton.addEventListener("click", function() {
			currentStep++;
			const newStepDiv = document.createElement("div");
			newStepDiv.id = "div_step" + currentStep;
			const newStepLabel = document.createElement("label");
			newStepLabel.for = "recipe_step" + currentStep;
			newStepLabel.innerHTML = "Step " + currentStep +  ":";

			const newStepInput = document.createElement("input");
			newStepInput.type = "text";
			newStepInput.id = "recipe_step" + currentStep;

			document.getElementById("recipe_steps").appendChild(newStepDiv);

			newStepDiv.appendChild(newStepLabel);
			newStepLabel.appendChild(newStepInput);
			document.getElementById("delete_step").disabled = false;
		});

		const deleteStepButton = document.getElementById("delete_step");
		deleteStepButton.addEventListener("click", function() {
			const toRemove = document.getElementById("div_step" + currentStep);
			toRemove.remove();
			currentStep--;
			if (currentStep == 1) {
				document.getElementById("delete_step").disabled = true;
			}
		});


		let titleHasBeenChanged = false;
		let descHasBeenChanged = false;
		function LengthIsValid(text_input, max_words, hint) {
			if (hint == "title_hint" && titleHasBeenChanged) {
				document.getElementById(hint).style.display = "block";
			}
			if (hint == "desc_hint" && descHasBeenChanged) {
				document.getElementById(hint).style.display = "block";
			}
			if (text_input == "") {
				return false;
			}

			const parsed_text = text_input.split(" ");
			if (parsed_text.length > 0 && parsed_text.length <= max_words) {
				document.getElementById(hint).style.display = "none";
				if (hint == "title_hint") {
					titleHasBeenChanged = true;
				}
				else if (hint == "desc_hint") {
					descHasBeenChanged = true;
				}
				return true;
			}
			document.getElementById(hint).style.display = "block";
			return false;
		}

		function FieldsAreValid() {
			const recipe_title = LengthIsValid(document.getElementById("title_input").value, 125, "title_hint");
			const recipe_desc = LengthIsValid(document.getElementById("desc_input").value, 255, "desc_hint");
			const recipe_step = document.getElementById("recipe_step1").value;
			if (recipe_title && recipe_desc && recipe_step != "") {
				document.getElementById("finish_recipe").disabled = false;
				document.getElementById("submit_hint").style.display = "none"
			}
			else {
				document.getElementById("finish_recipe").disabled = true;
				document.getElementById("submit_hint").style.display = "block"
			}
		}

		const title_input = document.getElementById("title_input");
		const desc_input = document.getElementById("desc_input");
		const step1_input = document.getElementById("recipe_step1");
		title_input.addEventListener("keyup", FieldsAreValid);
		desc_input.addEventListener("keyup", FieldsAreValid);
		step1_input.addEventListener("keyup", FieldsAreValid);
	});
}