function validateForm() {
  const nameEl = document.getElementById("name-el").value;
  const emailEl = document.getElementById("email-el").value;

  if (nameEl.trim() === "") {
    alert("name filed is empty");
    return false;
  }

  if (emailEl.trim() === "") {
    alert("Email filed is empty");
    return false;
  }

  alert("Form submitted!");
  return false;
}
