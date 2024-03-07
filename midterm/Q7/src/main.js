document.addEventListener("DOMContentLoaded", function () {
	document.querySelector("#submitbtn").addEventListener("click", function () {
		const dept = document.querySelector("#dept").value;
		const ret = document.querySelector("#ret").value;
		const dept_date = new Date(dept);
		const ret_date = new Date(ret);


		const days = (ret_date - dept_date) / 86400000
		if (ret_date - dept_date == 0)
			alert("it appears you are coming back the same day as your departure. Please make sure this is correct");
		else if (dept_date > ret_date)
			alert("It appears your dates are inverted, please correct.");
		else if (days > 365)
			alert("It appears your travel duration is greater than 1 year. Please make sure this is correct.");
		else if (days > 30)
			alert("It appears your travel duration is 30+ days Please make sure this is correct.");
		else
			alert("Your travel duration in days: " + days);

		
	});
});