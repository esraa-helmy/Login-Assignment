// * variables---------------------------------------------------------------
// & Sign Up form----------------------------------------------------
let signUPFormEl = document.getElementById("signUPForm");
let signUpNameEl = document.getElementById("signUpName");
let signUpEmailEl = document.getElementById("signUpEmail");
let signUpPasswordEl = document.getElementById("signUpPassword");
let signUpBtnEl = document.getElementById("signUpBtn");
let signUpEl = document.getElementById("signUp");
// &login form-----------------------------------------------------
let loginFormEl =document.getElementById("loginForm")
let loginEmailEL = document.getElementById("loginEmail")
let loginPasswordEl = document.getElementById("loginPassword");
let loginBtnEl = document.getElementById("loginBtn");
let signInEl = document.getElementById("signIn");
// & Alert Variables -----------------------------------------------
let nameAlertEl = document.getElementById("nameAlert");
let emailAlertEl = document.getElementById("emailAlert");
let passwordAlertEl =document.getElementById("passwordAlert");
let successAlertEl =document.getElementById("successAlert");
let loginAlertEl = document.getElementById("loginAlert");
let emailExistsAlert = document.getElementById("emailExistsAlert")
// & After Login Form-------------------------------------------------
let navBarEl = document.getElementById("navBar");
let welcomeEl = document.getElementById("welcome");
let loginHeaderEl = document.getElementById("loginHeader");
let logoutBtnEl = document.getElementById("logoutBtn")
// & Another Variables-----------------------------------------------
var signUpList =[]
signUpList = JSON.parse(localStorage.getItem("loginData")) || []

// * Functions ------------------------------------------------------------
function displaySinUpForm () {
    signUPFormEl.classList.replace('d-none','d-block')
    loginFormEl.classList.replace('d-block','d-none')
}
function displayLogInForm () {
    signUPFormEl.classList.replace('d-block','d-none')
    loginFormEl.classList.replace('d-none','d-block')
}

// ~ Function Of Sign Up Data
function signUpForm () {
    if ( validateName() && emailValidation () && passwordValidation ()) {
        

        var isEmailExist = false;
        for (let i = 0; i < signUpList.length; i++) {
            if (signUpEmailEl.value === signUpList[i].email) {
              isEmailExist = true;
              break; // Email exists, exit the loop
            }
          }
      
          if (isEmailExist) {
            emailExistsAlert.classList.remove('d-none');
            successAlertEl.classList.add('d-none');
           
          } else {
            var signUpData = {
                name: signUpNameEl.value,
                email:signUpEmailEl.value,
                password:signUpPasswordEl.value
        
            }
            console.log(signUpData)
            signUpList.push(signUpData)
            console.log(signUpList);
            localStorage.setItem("loginData",JSON.stringify(signUpList))
            successAlertEl.classList.remove('d-none');
            emailExistsAlert.classList.add('d-none');
            
          }
       

        
    }else{
        alert("Enter Valid Data")
    }
   

    
}

// & Login Function------------------------------------------------------
function loginForm () {
    for (let i = 0; i < signUpList.length; i++) {
        if(loginEmailEL.value == signUpList[i].email && loginPasswordEl.value == signUpList[i].password ){
            loginAlertEl.classList.add('d-none');
            navBarEl.classList.remove('d-none')
            loginFormEl.classList.replace('d-block','d-none');
            welcomeEl.classList.replace('d-none','d-block');
            welcomeEl.innerHTML = `Welocme ${signUpList[i].name}`
            loginHeaderEl.classList.replace('d-block','d-none')
        }else{
            loginAlertEl.classList.remove('d-none')
    
        }

        console.log(signUpList[i].email);
        console.log(signUpList[i].password)
        
    }
    
}

// & logOut Function -----------------------------------------------------
function logOut () {
    navBarEl.classList.add('d-none')
    loginFormEl.classList.replace('d-none','d-block');
    welcomeEl.classList.replace('d-block','d-none');
    loginHeaderEl.classList.replace('d-none','d-block')
    
    
    
}


// ^ Validation Functions--------------------------------------------
function validateName(){
    let regexName = /^[A-Z][a-z]{3,8}$/;
    let nameRegex = regexName.test(signUpNameEl.value)
    if (nameRegex == false) {
        nameAlertEl.classList.remove('d-none');
        signUpNameEl.classList.remove('is-valid');
        signUpNameEl.classList.add('is-invalid');
    }else{
        nameAlertEl.classList.add('d-none');
        signUpNameEl.classList.remove('is-invalid');
        signUpNameEl.classList.add('is-valid');
    }
    return nameRegex
   
}
function emailValidation () {
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let regexEmail = emailRegex.test(signUpEmailEl.value);
    if (regexEmail == false) {
        emailAlertEl.classList.remove('d-none');
        signUpEmailEl.classList.remove('is-valid');
        signUpEmailEl.classList.add('is-invalid');

    }else{
        emailAlertEl.classList.add('d-none');
        signUpEmailEl.classList.remove('is-invalid');
        signUpEmailEl.classList.add('is-valid');
    }
    return regexEmail
    
}


function passwordValidation () {
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    let regexPassword = passwordRegex.test(signUpPasswordEl.value);
    if (regexPassword == false) {
        passwordAlertEl.classList.remove('d-none');
        signUpPasswordEl.classList.remove('is-valid');
        signUpPasswordEl.classList.add('is-invalid');
    }else{
        passwordAlertEl.classList.add('d-none');
        signUpPasswordEl.classList.remove('is-invalid');
        signUpPasswordEl.classList.add('is-valid')
        
    }
    return regexPassword
}





// * Events------------------------------------------------------
signUpEl.addEventListener('click',displaySinUpForm);
signInEl.addEventListener('click',displayLogInForm);
signUpBtnEl.addEventListener('click',signUpForm);
loginBtnEl.addEventListener('click',loginForm);
logoutBtnEl.addEventListener('click',logOut)

// ^ Validation Events ----------------------------
signUpNameEl.addEventListener('blur',validateName);
signUpEmailEl.addEventListener('blur',emailValidation);
signUpPasswordEl.addEventListener('blur',passwordValidation);


