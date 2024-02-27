export function AddNewRecipe() {
	document.addEventListener("DOMContentLoaded", function() {
		// Rehydrate recipe list page
		function RehydrateRecipeListPage() {
			const recipe_list_div = document.getElementById("recipe_list");
			const all_recipe_divs = recipe_list_div.getElementsByTagName("div");
			const no_data_p = recipe_list_div.getElementsByTagName("p");
			if (no_data_p.length == 1)
				no_data_p[0].remove();
			
			Object.keys(all_recipe_divs).forEach( () => {all_recipe_divs[0].remove()} );
			CheckForPreviousRecipe();
		}


		// Edit recipe from main list button
		function EditRecipeButtonFromList(event) {
			const recipe_name = event.currentTarget.parentElement.id.substring(13);
			const fullRecipe = JSON.parse(localStorage.getItem(recipe_name));
			fullRecipe.steps = JSON.parse(fullRecipe.steps);

			const recipe_steps = document.getElementById("recipe_steps").getElementsByTagName("div");
			while (recipe_steps.length > 1) {
				recipe_steps[1].remove();
			}
			currentStep = 1;

			document.getElementById("title_input").value = fullRecipe.title;
			document.getElementById("desc_input").value = fullRecipe.description;
			document.getElementById("image_input").value = fullRecipe.image_URL;


			let i = 1;
			document.getElementById("recipe_step1").value = fullRecipe.steps[0];
			while (i < fullRecipe.steps.length) {
				AddNewStep();
				const input_id = "recipe_step" + (i + 1);
				document.getElementById(input_id).value = fullRecipe.steps[i];
				document.getElementById("finish_recipe").disabled = false;
				i++;
			}

			document.getElementById("recipe_list").style.display = "none";
			document.getElementById("recipe_input").style.display = "block";
		}


		// Delete recipe button
		function DeleteRecipeButton (event) {
			const recipe_name = event.currentTarget.parentElement.id.substring(13);
			localStorage.removeItem(recipe_name);
			RehydrateRecipeListPage();
		}


		// Back to recipe list from view recipe
		document.getElementById("to_list_from_view").addEventListener("click", function () {
			document.getElementById("recipe_list").style.display = "block";
			document.getElementById("recipe_display").style.display = "none";

			RehydrateRecipeListPage();

			document.getElementById("steps_display_div").remove();
			document.getElementById("recipe_display_title").lastElementChild.remove();
		});


		// Helper method if image is valid
		function imageLoadedPrevious(event) {
			const eSrc = event.currentSrc;
			const img = document.createElement("img");
			img.src = eSrc;
			img.id = "recipe_image";
			img.width = 255;
			img.height = 255;
			document.getElementById("recipe_display_title").appendChild(img);
		}

		// Helper method to pull up a specific recipe on view page from main page
		function ViewRetrievedRecipe(recipe) {
			const recipe_title = recipe.title;
			const recipe_desc = recipe.description;
			document.getElementById("title_output").innerHTML = "Recipe for: " + recipe_title;
			document.getElementById("desc_output").innerHTML = "Description: " + recipe_desc;

			const recipe_img = recipe.image_URL;
			const img = document.createElement("img");
			img.src = recipe_img;
			img.id = "recipe_image";
			if (recipe_img != "")
			{
				if (img.complete) {
					imageLoadedPrevious(img);
				}
				else {
					img.addEventListener("load", imageLoadedPrevious);
					img.addEventListener("error", imageNotValid);
				}
			}
			else {
				imageNotValid(false);
			}

			const steps_display_div = document.createElement("div");
			steps_display_div.id = "steps_display_div";
			document.getElementById("recipe_display").appendChild(steps_display_div);
			document.getElementById("to_list_from_view").insertAdjacentElement("beforebegin", steps_display_div);
			const all_steps = recipe.steps;

			let step_count = 1;
			let valid_steps = [ ];
			for (let i = 0; i < all_steps.length; i++) {
				const step_text = all_steps[i];
				if (step_text != "") {
					const step_element = document.createElement("p");
					step_element.innerHTML = "Step " + step_count + ": " + step_text;
					steps_display_div.appendChild(step_element);
					valid_steps.push(step_text);
					step_count++;
				}
			}
		}

		// View specific recipe button
		function ViewRecipeButton(event) {
			// TODO: get the recipe num from id below, pull from memory, populate fields and show
			const recipe_name = event.currentTarget.parentElement.id.substring(13);

			const fullRecipe = JSON.parse(localStorage.getItem(recipe_name));
			fullRecipe.steps = JSON.parse(fullRecipe.steps);

			ViewRetrievedRecipe(fullRecipe);

			document.getElementById("recipe_list").style.display = "none";
			document.getElementById("recipe_display").style.display = "block";
		}


		// Helper method to add retrieved recipe to list
		function AddRecipeToList(recipe) {
			const recipeOutput = document.createElement("div");
			recipeOutput.id = "indiv_recipe_" + recipe.title;
			const recipe_title = document.createElement("p");


			const recipe_view = document.createElement("button");
			const recipe_edit = document.createElement("button");
			const recipe_delete = document.createElement("button");

			recipe_view.innerHTML = "View recipe";
			recipe_edit.innerHTML = "Edit recipe";
			recipe_delete.innerHTML = "Delete recipe";

			recipe_view.classList.add("btn");
			recipe_edit.classList.add("btn");
			recipe_delete.classList.add("btn");
			recipe_view.classList.add("btn-secondary");
			recipe_edit.classList.add("btn-secondary");
			recipe_delete.classList.add("btn-danger");
			recipe_view.classList.add("list_button_space");
			recipe_edit.classList.add("list_button_space");
			recipe_delete.classList.add("list_button_space");

			
			recipe_view.addEventListener("click", ViewRecipeButton);
			recipe_delete.addEventListener("click", DeleteRecipeButton);
			recipe_edit.addEventListener("click", EditRecipeButtonFromList);


			recipe_title.innerHTML = "Recipe: " + recipe.title;
			document.getElementById("add_new_recipe").insertAdjacentElement("beforebegin", recipeOutput);
			recipeOutput.appendChild(recipe_title);
			recipeOutput.appendChild(recipe_view);
			recipeOutput.appendChild(recipe_edit);
			recipeOutput.appendChild(recipe_delete);
			recipeOutput.appendChild(document.createElement("hr"));
		}


		// Check for previous recipes
		function CheckForPreviousRecipe() {
			if (localStorage.length == 0) {
				const noRecipe = document.createElement("p");
				noRecipe.innerHTML = "No previously saved recipes found";
				document.getElementById("add_new_recipe").insertAdjacentElement("beforebegin", noRecipe);
			}
			else {
				const allRecipes = Object.keys(localStorage);
				allRecipes.forEach( function(r) { 
					const fullRecipe = JSON.parse(localStorage.getItem(r));
					fullRecipe.steps = JSON.parse(fullRecipe.steps);
					AddRecipeToList(fullRecipe);
				 } );
			}
		}
		CheckForPreviousRecipe();


		// Add new recipe button
		document.getElementById("add_new_recipe").addEventListener("click", function () {
			const recipe_steps = document.getElementById("recipe_steps").getElementsByTagName("div");
			while (recipe_steps.length > 1) {
				recipe_steps[1].remove();
			}
			currentStep = 1;

			document.getElementById("title_input").value = "";
			document.getElementById("desc_input").value = "";
			document.getElementById("image_input").value = "";
			document.getElementById("recipe_step1").value = "";
			document.getElementById("finish_recipe").disabled = true;

			document.getElementById("recipe_list").style.display = "none";
			document.getElementById("recipe_input").style.display = "block";
		});


		// Back to recipe list button
		document.getElementById("back_to_list").addEventListener("click", function () {
			document.getElementById("recipe_list").style.display = "block";
			document.getElementById("recipe_input").style.display = "none";
		});


		// Helper method if image is not valid
		function imageNotValid(...imageSubmit) {
			let imgSubmit;
			if (imageSubmit.length > 0)
				imgSubmit = imageSubmit[0];
			else
				imgSubmit = true;

			const errMessage = document.createElement("p");
			if (imgSubmit) {
				errMessage.innerHTML = "Image URL was not valid";
			}
			else {
				errMessage.innerHTML = "No image URL provided";
			}
			
			document.getElementById("recipe_display_title").appendChild(errMessage);
		}


		// Helper method if image is valid
		function imageLoaded() {
			const img = document.createElement("img");
			const recipe_img = document.getElementById("image_input").value;
			img.src = recipe_img;
			img.id = "recipe_image";
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
				imageNotValid(false);
			}

			const steps_display_div = document.createElement("div");
			steps_display_div.id = "steps_display_div";
			document.getElementById("recipe_display").appendChild(steps_display_div);
			document.getElementById("to_list_from_view").insertAdjacentElement("beforebegin", steps_display_div);
			const all_steps = document.getElementById("recipe_steps").getElementsByTagName("div");

			let step_count = 1;
			let valid_steps = [ ];
			for (let i = 0; i < all_steps.length; i++) {
				const step_text = all_steps[i].getElementsByTagName("input")[0].value;
				if (step_text != "") {
					const step_element = document.createElement("p");
					step_element.innerHTML = "Step " + step_count + ": " + step_text;
					steps_display_div.appendChild(step_element);
					valid_steps.push(step_text);
					step_count++;
				}
			}

			document.getElementById("recipe_input").style.display = "none";
			document.getElementById("recipe_display").style.display = "block";

			let fullRecipe = {
				"title" : recipe_title,
				"description" : recipe_desc,
				"image_URL" : recipe_img,
				"steps" : JSON.stringify(valid_steps)
			};

			
			localStorage.setItem(fullRecipe.title, JSON.stringify(fullRecipe));
		});


		// Add new step button
		let currentStep = 1;
		function AddNewStep() {
			currentStep++;
			const newStepDiv = document.createElement("div");
			newStepDiv.id = "div_step" + currentStep;
			newStepDiv.classList.add("text_input");
			const newStepLabel = document.createElement("label");
			newStepLabel.htmlFor = "recipe_step" + currentStep;
			newStepLabel.innerHTML = "Step " + currentStep +  ":";

			const newStepInput = document.createElement("input");
			newStepInput.type = "text";
			newStepInput.id = "recipe_step" + currentStep;

			document.getElementById("recipe_steps").appendChild(newStepDiv);

			newStepDiv.appendChild(newStepLabel);
			newStepDiv.appendChild(newStepInput);
			document.getElementById("delete_step").disabled = false;
		}
		const addStepButton = document.getElementById("add_new_step");
		addStepButton.addEventListener("click", AddNewStep);

		
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


		function EditRecipeButtonFromDisplay() {
			document.getElementById("recipe_display").style.display = "none";
			document.getElementById("recipe_input").style.display = "block";
			document.getElementById("steps_display_div").remove();
			document.getElementById("recipe_display_title").lastElementChild.remove();
		}


		const title_input = document.getElementById("title_input");
		const desc_input = document.getElementById("desc_input");
		const step1_input = document.getElementById("recipe_step1");
		title_input.addEventListener("keyup", FieldsAreValid);
		desc_input.addEventListener("keyup", FieldsAreValid);
		step1_input.addEventListener("keyup", FieldsAreValid);
	});
}