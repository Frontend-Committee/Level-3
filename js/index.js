let toggleSwitch = document.querySelector(".switch-email");
let loginSwitch = document.querySelector(".login");
let form = document.querySelector("form");
let login_section = document.querySelector(".login-section");
let signup_section = document.querySelector(".signup-section");
let emailInput = document.getElementById("email");
let passInput = document.getElementById("pass");
let fnameInput = document.getElementById("fname");
let lnameInput = document.getElementById("lname");
let signupBtn = document.getElementById("signup-btn");
let close = document.querySelector(".close-icon");
let users = [];

function signup(){
login_section.classList.toggle("hidden");
signup_section.classList.toggle("hidden");
}

if(localStorage.getItem("users")){
    users=JSON.parse(localStorage.getItem("users"));
}
function checkInputs(){
        if ((emailInput.value && passInput.value && fnameInput.value && lnameInput.value)) {
        signupBtn.disabled = false;
        return true
        }
}
form.addEventListener("submit",e=>e.preventDefault())
function addUser(){
    
    if(checkInputs()){

        let user = {
            email:emailInput.value,
            pass:passInput.value,
            fname:fnameInput.value,
            lname:lname.value,
        }
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        console.log(localStorage.getItem("users"));
    }
    signup_section.classList.toggle("hidden");
    login_section.classList.toggle("hidden");
}
function login(e) {
    e.preventDefault();
    const form = e.target.closest("form");
    const allInputs = form.querySelectorAll('input'); 
    
    let loginData = {};
    allInputs.forEach(input => {
        if (input.name) {
            loginData[input.name] = input.value;
        }
    });

    let isFound = users.find(user => {
        return user.email === loginData["user-email"] && user.pass === loginData["user-pass"];
    });

    if (isFound) {
        window.location.href = "./pages/home.html"; 
    } else {
        alert("not found user");
    }
}
if(toggleSwitch){

    toggleSwitch.addEventListener("click" , (e)=>{
        loginSwitch.classList.remove("hidden");
    });
}
if(close){

    close.addEventListener("click" , (e)=>{
        loginSwitch.classList.add("hidden");
    });
}
