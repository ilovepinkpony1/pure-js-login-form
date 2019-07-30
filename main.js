window.addEventListener('load', validateForm);

function validateForm() {
  getNameInputValidate();
  getEmailInputValidate();
  getPhoneNumberValidateInput();
  setCheckboxesStatus();
  setButtonStatus();
  deleteValidateClassList(nameInput);
  deleteValidateClassList(emailInput);
  deleteValidateClassList(numberInput);
}
