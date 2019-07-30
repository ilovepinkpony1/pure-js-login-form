function getNameInputValidate() {
  nameInput.addEventListener('input', function() {
    this.classList.remove('valid');
    this.classList.remove('not-valid');

    const { value } = this;
    const partsOfName = value.trim().split(' ');
    const isValidLength = partsOfName.length > 1 && partsOfName.length < 4;
    const allPartsIsName = partsOfName.every(item => {
      return NAME_REGEXP.test(item);
    });

    if (isValidLength && allPartsIsName) {
      this.classList.add('valid');
    } else {
      this.classList.add('not-valid');
    }
    checkFormValidateTurgets();
  });

  nameInput.addEventListener('blur', function() {
    if (this.value === '') {
      this.classList.add('not-valid');
    }
  })
}

function getEmailInputValidate() {
  emailInput.addEventListener('input', function() {
    this.classList.remove('valid');
    this.classList.remove('not-valid');

    const { value } = this;

    if (EMAIL_REGEXP.test(String(value).toLowerCase())) {
      this.classList.add('valid');
    } else {
      this.classList.add('not-valid');
    }
    checkFormValidateTurgets();
  });

  emailInput.addEventListener('blur', function() {
    if (this.value === '') {
      this.classList.add('not-valid');
    }
  });
}

function getPhoneNumberValidateInput() {
  numberInput.addEventListener('input', function() {
    this.classList.remove('valid');
    this.classList.remove('not-valid');

    const { value } = this;
    const formatingData = value.trim().replace(/[\s\-\(\)]/g, '');

    if (formatingData.match(/^((\+?3)?8)?0\d{9}$/)) {
      this.classList.add('valid');
    } else {
      this.classList.add('not-valid');
    }
    checkFormValidateTurgets();
  });

  numberInput.addEventListener('blur', function () {
    if (this.value === '') {
      this.classList.add('not-valid');
    }
  });
}

function setCheckboxesStatus() {
  checkBoxMale.addEventListener('change', function() {
    const { checked } = this;
    validateCheckbox(checked, checkBoxFemale, checkBoxNoOptions);
  });

  checkBoxFemale.addEventListener('change', function() {
    const { checked } = this;
    validateCheckbox(checked, checkBoxMale, checkBoxNoOptions);
  });

  checkBoxNoOptions.addEventListener('change', function() {
    const { checked } = this;
    validateCheckbox(checked, checkBoxMale, checkBoxFemale);
  });
}

function setButtonStatus() {
  submitButton.addEventListener('click', function() {
    nameInput.classList.remove('valid');
    emailInput.classList.remove('valid');
    numberInput.classList.remove('valid');
    sexIsChecked = false;
    form.classList.add('hide');
    spinnerBody.classList.remove('hide');
    fetch(URL)
      .then(response => response.json())
      .then(posts => {
        setTimeout(() => {
          spinnerBody.classList.add('hide');
          showPosts(posts);
        }, 1000);
      });
  });
}

function checkFormValidateTurgets() {
  if (
    nameInput.classList.contains('valid') &&
    emailInput.classList.contains('valid') &&
    numberInput.classList.contains('valid') &&
    sexIsChecked
  ) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function deleteValidateClassList(element) {
  element.addEventListener('focus', () => {
    const { classList: inputClassList } = element;
    inputClassList.remove('not-valid');
    inputClassList.remove('valid');
  });
}

function showPosts(data) {
  const container = document.querySelector('main');
  const wrapper = document.createElement('div');
  wrapper.classList.add('posts');

  data.forEach(post => {
    const title = post.title;
    const text = post.body;

    const titleWrapper = document.createElement('h3');
    titleWrapper.classList.add('post-title');

    const textWrapper = document.createElement('p');
    textWrapper.classList.add('post-text');

    const postWrapper = document.createElement('div');
    postWrapper.classList.add('post');

    titleWrapper.append(title);
    textWrapper.append(text);
    postWrapper.append(titleWrapper, textWrapper);
    wrapper.append(postWrapper);
  });

  container.append(wrapper);
}

function validateCheckbox(checked, checkboxOne, checkboxTwo) {
  if (checkboxOne.checked) {
    checkboxOne.checked = false;
  }
  if (checkboxTwo.checked) {
    checkboxTwo.checked = false;
  }
  if (checked) {
    sexIsChecked = true;
  } else {
    sexIsChecked = false;
  }
  checkFormValidateTurgets();
}
