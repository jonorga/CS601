export function AddNewRecipe() {
	document.addEventListener("DOMContentLoaded", function() {
		const finishButton = document.getElementById("finish_recipe");
		finishButton.addEventListener("click", function() {
			const recipe_title = document.getElementById("title_input").value;
			const recipe_desc = document.getElementById("desc_input").value;
			document.getElementById("title_output").innerHTML = "Recipe for: " + recipe_title;
			document.getElementById("desc_output").innerHTML = "Description: " + recipe_desc;


			document.getElementById("recipe_input").style.display = "none";
			document.getElementById("recipe_display").style.display = "block";
		});

		function FieldsAreValid() {
			const recipe_title = document.getElementById("title_input").value;
			const recipe_desc = document.getElementById("desc_input").value;
			const recipe_step = document.getElementById("recipe_step").value;
			if (recipe_title != "" && recipe_desc != "" && recipe_step != "") {
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
		const step1_input = document.getElementById("recipe_step");
		title_input.addEventListener("keyup", FieldsAreValid);
		desc_input.addEventListener("keyup", FieldsAreValid);
		step1_input.addEventListener("keyup", FieldsAreValid);
	});
}