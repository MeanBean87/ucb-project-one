const validateData = (name, age, gender, feet, inches, weight) => {
  let errors = [];
  if (name === "") {
    errors.push("Name is required");
  }

  if (isNaN(age)) {
    errors.push("Age is required and must be a number");
  } else if (age > 130) {
    errors.push("Age must be less than 120");
  }

  if (
    gender !== "Male" &&
    gender !== "Female" &&
    gender !== "Other" &&
    gender === ""
  ) {
    errors.push("Gender must be selected");
  }

  if (isNaN(feet)) {
    errors.push("Feet must be a number");
  }

  if (isNaN(inches)) {
    errors.push("Inches must be a number or 0");
  }

  if (isNaN(weight)) {
    errors.push("Weight must be a number");
  }

  if (errors.length > 0) {
    const tdeeFormErrors = document.getElementById("tdee-form-errors");
    tdeeFormErrors.innerHTML = "";
    errors.forEach((error) => {
      const errorEl = document.createElement("p");
      errorEl.setAttribute("class", "text-lime-500");
      errorEl.textContent = error;
      tdeeFormErrors.appendChild(errorEl);
    });
    return false;
  }
  return true;
};

export { validateData };
