const signupForm = document.getElementById("signup-form");
const inputs = signupForm.querySelectorAll("input");
const dialog = document.getElementById("dialog");

function showError(input) {
  const field = input.closest(".field");
  const icon = field.querySelector("img");
  const errorMessage = field.querySelector("p");

  input.setAttribute("aria-invalid", "true");

  errorMessage.textContent = getErrorMessage(input);

  icon.hidden = false;
  errorMessage.hidden = false;
}

function hideError(input) {
  const field = input.closest(".field");
  const icon = field.querySelector("img");
  const errorMessage = field.querySelector("p");

  input.removeAttribute("aria-invalid");

  icon.hidden = true;
  errorMessage.hidden = true;
}

function getErrorMessage(input) {
  if (input.validity.valueMissing) {
    return `${input.placeholder} cannot be empty`;
  }

  if (input.validity.typeMismatch) {
    return "Looks like this is not an email";
  }

  return "";
}

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isFormValid = true;

  inputs.forEach((input) => {
    if (input.checkValidity()) {
      hideError(input);
    } else {
      showError(input);
      isFormValid = false;
    }
  });

  if (isFormValid) {
    dialog.showModal();
    signupForm.reset();
  }

});

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.checkValidity()) {
      hideError(input);
    }
  });
});