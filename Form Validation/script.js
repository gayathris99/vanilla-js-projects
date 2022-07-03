const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


function showError (input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerText =  message
}

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//check valid email 
const isValidEmail = (email) => {
    const regExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regExp.test(String(email.value).toLowerCase())) {
        showSuccess(email)
    } else {
        showError(email, 'Email is not valid')
    }
}

const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

const checkRequired = (inputArr) => {
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
        }
        else {
            showSuccess(input)
        }
    })
}

const checkLength = (input, min, max) => {
if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be atleast ${min} characters`)
} else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be atmost ${max} characters`)
}
}

const checkConfirmPassword = () => {
    if (password.value === password2.value) {
        showSuccess(password2)
    } else {
        showError(password2, 'Passwords dont match')
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    checkRequired ([username, email, password, password2])
    if (username.value !== '') {
        checkLength(username, 3, 15)
    }
    if (password.value !== '') {
        checkLength(password, 6,25)
    }
    if (email.value !== '') {
        isValidEmail(email)
    }
    if (password.value && password2.value !== '') {
        checkConfirmPassword ()
    }
    
})

// with multiple if statements - not optimised
// form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     // name
// //     if (username.value === '') {
// //         showError(username, 'Username is required')
// //     } else {
// //         showSuccess(username)
// //     }

// // //email
// //     if (email.value === '') {
// //         showError(email, 'Email is required')
// //     } else if (!isValidEmail(email.value)) {
// //         showError(email, 'Email is not valid')
// //     }
// //     else {
// //         showSuccess(email)
// //     }

// // //password
// //     if (password.value === '') {
// //         showError(password, 'Password is required')
// //     } else {
// //         showSuccess(password)
// //     }

// // //confirm password
// //     if (password2.value === '') {
// //         showError(password2, 'Confirm Password is required')
// //     } else {
// //         showSuccess(password2)
// //     }
// })