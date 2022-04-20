// import { Pool } from 'pg';
// const Pool = require('pg');

console.log('here');

const emailTest = document.querySelector('#email');
console.log('email works');
const passwordTest = document.querySelector('#password');
console.log('password works');
const confirmPasswordTest = document.querySelector('#confirm-password');
console.log('confirm pw works');

const form = document.querySelector('#signup');

function checkEmail() {
    let valid = false;
    if (!isRequired(emailTest)) {
        showError(emailTest, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailTest, 'Email is not valid.')
    } else {
        showSuccess(emailTest);
        valid = true;
    }
    return valid;
};

function checkConfirmPassword() {
    let valid = false;
    // check confirm password
    const confirmPassword = confirmPasswordTest;
    const password = passwordTest;

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordTest, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordTest, 'The password does not match');
    } else {
        showSuccess(confirmPasswordTest);
        valid = true;
    }

    return valid;
}

console.log('how about this');

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

console.log('does this all work?');

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

console.log('bop');

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

console.log('blip');

//     form.addEventListener('submit', function (e) {
//     // prevent the form from submitting
//     e.preventDefault();
//     // validate fields
//     let isEmailValid = checkEmail(),
//         isPasswordValid = checkPassword(),
//         isConfirmPasswordValid = checkConfirmPassword();

//     let isFormValid = isEmailValid &&
//         isPasswordValid &&
//         isConfirmPasswordValid;

//     // submit to the server if the form is valid
//     if (isFormValid) {
//         console.log('Form is valid');
//         // insertUser();
//         // console.log('sql is updated');
//     }
// });

async function insertUser (email, password) {
    console.log("Inserting user");
    let query = `INSERT INTO USERS(email, password) VALUES (\'${email}\', \'${password}\')`
    const client = await pool.connect();
    let res
    try {
      await client.query('BEGIN')
      try {
        res = await client.query(query)
        await client.query('COMMIT')
        console.log('')
      } catch (err) {
        await client.query('ROLLBACK')
        throw err
      }
    } finally {
      client.release()
    }
    if (res){

        console.log("Successfully inserted new user into table.")
    }
    return res
};

console.log('bip');

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }

}));

  