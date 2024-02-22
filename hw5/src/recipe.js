export function AddNewRecipe() {
	document.addEventListener("DOMContentLoaded", function() {
		// Helper method if image is not valid
		function imageNotValid() {
			console.log("bad");
			const errMessage = document.createElement("p");
			errMessage.innerHTML = "Image URL was not valid";
			document.getElementById("recipe_display_title").appendChild(errMessage);
		}


		// Helper method if image is valid
		function imageLoaded(img_var) {
			const img = img_var || document.getElementById("recipe_image");
			img.width = 255;
			img.height = 255;
			document.getElementById("recipe_display_title").appendChild(img);
		}


		// Finish button
		const finishButton = document.getElementById("finish_recipe");
		finishButton.addEventListener("click", function() {
			const recipe_title = document.getElementById("title_input").value;
			const recipe_desc = document.getElementById("desc_input").value;
			document.getElementById("title_output").innerHTML = "Recipe for: " + recipe_title;
			document.getElementById("desc_output").innerHTML = "Description: " + recipe_desc;

			const recipe_img = document.getElementById("image_input").value;
			const img = document.createElement("img");
			img.src = recipe_img;
			img.id = "recipe_image";
			if (recipe_img != "")
			{
				if (img.complete) {
					imageLoaded(img);
				}
				else {
					img.addEventListener("load", imageLoaded);
					img.addEventListener("error", imageNotValid);
				}
			}
			else {
				imageNotValid();
			}

			const steps_display_div = document.createElement("div");
			steps_display_div.id = "steps_display_div";
			document.getElementById("recipe_display").appendChild(steps_display_div);
			document.getElementById("edit_recipe").insertAdjacentElement("beforebegin", steps_display_div);
			const all_steps = document.getElementById("recipe_steps").getElementsByTagName("div");
			let step_count = 1;
			for (let i = 0; i < all_steps.length; i++) {
				const step_text = all_steps[i].getElementsByTagName("input")[0].value;
				if (step_text != "") {
					const step_element = document.createElement("p");
					step_element.innerHTML = "Step " + step_count + ": " + step_text;
					steps_display_div.appendChild(step_element);
					step_count++;
				}
			}

			document.getElementById("recipe_input").style.display = "none";
			document.getElementById("recipe_display").style.display = "block";
		});


		// Add new step button
		let currentStep = 1;
		const addStepButton = document.getElementById("add_new_step");
		addStepButton.addEventListener("click", function() {
			currentStep++;
			const newStepDiv = document.createElement("div");
			newStepDiv.id = "div_step" + currentStep;
			newStepDiv.classList.add("text_input");
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

		
		// Delete step button
		const deleteStepButton = document.getElementById("delete_step");
		deleteStepButton.addEventListener("click", function() {
			const toRemove = document.getElementById("div_step" + currentStep);
			toRemove.remove();
			currentStep--;
			if (currentStep == 1) {
				document.getElementById("delete_step").disabled = true;
			}
		});


		// Display hints and check if inputs are valid
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


		// Check if all fields are valid for submitting
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

		function EditRecipeButton() {
			document.getElementById("recipe_display").style.display = "none";
			document.getElementById("recipe_input").style.display = "block";
			document.getElementById("steps_display_div").remove();
			document.getElementById("recipe_display_title").lastElementChild.remove();
		}

		const title_input = document.getElementById("title_input");
		const desc_input = document.getElementById("desc_input");
		const step1_input = document.getElementById("recipe_step1");
		const edit_recipe = document.getElementById("edit_recipe");
		title_input.addEventListener("keyup", FieldsAreValid);
		desc_input.addEventListener("keyup", FieldsAreValid);
		step1_input.addEventListener("keyup", FieldsAreValid);
		edit_recipe.addEventListener("click", EditRecipeButton);
	});
}