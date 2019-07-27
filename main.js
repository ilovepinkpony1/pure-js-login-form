window.addEventListener('load', validateForm);

function validateForm() {
  const nameInput = document.querySelector('.input_name');
  const emailInput = document.querySelector('.input_email');
  const numberInput = document.querySelector('.input_number');
  const checkBoxMale = document.querySelector('#sex-check_male');
  const checkBoxFemale = document.querySelector('#sex-check_female');
  const checkBoxNoOptions = document.querySelector('#sex-check_no-options');
  const submitButton = document.querySelector('.register-form_submit-button');
  let sexIsChecked = false;

  nameInput.addEventListener('blur', function() {
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
  });
  nameInput.addEventListener('change', () => {
    checkFormValidateTurgets();
  })

  emailInput.addEventListener('blur', function() {
    const { value } = this;

    if (EMAIL_REGEXP.test(String(value).toLowerCase())) {
      this.classList.add('valid');
    } else {
      this.classList.add('not-valid');
    }
  });

  emailInput.addEventListener('change', () => {
    checkFormValidateTurgets();
  })

  numberInput.addEventListener('blur', function() {
    const { value } = this;
    const formatingData = value.trim().replace(/[\s\-\(\)]/g, '');

    if (formatingData.match(/^((\+?3)?8)?0\d{9}$/)) {
      this.classList.add('valid');
    } else {
      this.classList.add('not-valid');
    }
  });

  numberInput.addEventListener('change', () => {
    checkFormValidateTurgets();
  })

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

  checkBoxMale.addEventListener('change', function() {
    const { checked } = this;
    if (checkBoxFemale.checked) {
      checkBoxFemale.checked = false;
    }
    if (checkBoxNoOptions.checked) {
      checkBoxNoOptions.checked = false;
    }
    if (checked) {
      sexIsChecked = true;
    }
    checkFormValidateTurgets();
  });
  checkBoxFemale.addEventListener('change', function() {
    const { checked } = this;
    if (checkBoxMale.checked) {
      checkBoxMale.checked = false;
    }
    if (checkBoxNoOptions.checked) {
      checkBoxNoOptions.checked = false;
    }
    if (checked) {
      sexIsChecked = true;
    }
    checkFormValidateTurgets();
  });
  checkBoxNoOptions.addEventListener('change', function() {
    const { checked } = this;
    if (checkBoxMale.checked) {
      checkBoxMale.checked = false;
    }
    if (checkBoxFemale.checked) {
      checkBoxFemale.checked = false;
    }
    if (checked) {
      sexIsChecked = true;
    }
    checkFormValidateTurgets();
  });

  submitButton.addEventListener('click', function() {
    nameInput.classList.remove('valid');
    emailInput.classList.remove('valid');
    numberInput.classList.remove('valid');
    sexIsChecked = false;
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => {
        showPosts(posts)
      })
  })

  deleteValidateClassList(nameInput);
  deleteValidateClassList(emailInput);
  deleteValidateClassList(numberInput);
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