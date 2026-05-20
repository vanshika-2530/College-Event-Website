function openLoginPopup() {
    document.getElementById("loginPopup").style.display = "flex";
}
function closeLoginPopup() {
    document.getElementById("loginPopup").style.display = "none";
}
function openSignupPopup() {
    document.getElementById("signupPopup").style.display = "flex";
}
function closeSignupPopup() {
    document.getElementById("signupPopup").style.display = "none";
}


const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = signupForm.querySelector('input[placeholder="Full Name"]').value.trim();
        const email = signupForm.querySelector('input[placeholder="Email"]').value.trim();
        const password = signupForm.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;
        const roll = signupForm.querySelector('input[placeholder="Roll Number"]').value.trim(); // NEW


        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        let userExists = users.find(user => user.email === email);

        if (userExists) {
            alert("User already exists! Please login.");
            return;
        }


    users.push({ 
    name, 
    email, 
    password, 
    roll,  
    phone: "", 
    degree: "", 
    department: "", 
    year: "", 
    registeredEvents: [], 
    activity: [] 
});

localStorage.setItem("users", JSON.stringify(users));
localStorage.setItem("currentUser", JSON.stringify(users[users.length - 1]));

alert("You are registered successfully!");
signupForm.reset();


closeSignupPopup();
openLoginPopup();

    });
}


const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = loginForm.querySelector('input[type="email"]').value.trim();
        const password = loginForm.querySelector('input[type="password"]').value;

        let users = JSON.parse(localStorage.getItem("users"));

        if (!users || users.length === 0) {
            alert("No account found! Please sign up first.");
            return;
        }

        let user = users.find(u => u.email === email);

        if (!user) {
            alert("This email is not registered. Please sign up first.");
            return;
        }

        if (user.password !== password) {
            alert("Incorrect password!");
            return;
        }

        alert("Login successful!");
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.setItem("userPassword", password);

        window.location.href = "projnp.html";
    });
    localStorage.setItem("userPassword", password);
}


if (window.location.pathname.includes("register.html")) {
    let user = localStorage.getItem("loggedInUser");

    if (!user) {
        alert("Please login first!");
        window.location.href = "events.html";
    }
}

function toggleSave(btn, eventName, pageLink) {
    let saved = JSON.parse(localStorage.getItem("savedEvents")) || [];

    let exists = saved.find(e => e.name === eventName);

    if (exists) {
      
        saved = saved.filter(e => e.name !== eventName);
        btn.innerText = "🤍";
        btn.classList.remove("active");
    } else {
       
        saved.push({ name: eventName, link: pageLink });
        btn.innerText = "❤️";
        btn.classList.add("active");
    }

    localStorage.setItem("savedEvents", JSON.stringify(saved));
}


function saveEvent(eventName) {
    let saved = JSON.parse(localStorage.getItem("savedEvents")) || [];

    if (saved.includes(eventName)) {
        alert("Already added!");
        return;
    }

    saved.push(eventName);
    localStorage.setItem("savedEvents", JSON.stringify(saved));

    alert("Event saved ❤️");
}


function toggleSave(btn, eventName, pageLink) {
    let saved = JSON.parse(localStorage.getItem("savedEvents")) || [];

    let index = saved.findIndex(e => e.name === eventName);

    if (index !== -1) {
       
        saved.splice(index, 1);
        btn.innerText = "🤍";
        btn.classList.remove("active");
    } else {
    
        saved.push({ name: eventName, link: pageLink });
        btn.innerText = "❤️";
        btn.classList.add("active");
    }

    localStorage.setItem("savedEvents", JSON.stringify(saved));
}

function openLogoutPopup(){

    document.getElementById("logoutPopup")
    .style.display = "flex";

}


function closeLogoutPopup(){

    document.getElementById("logoutPopup")
    .style.display = "none";

}

function confirmLogout(){

    let password =
    document.getElementById("logoutPassword").value;
    let correctPassword =
localStorage.getItem("userPassword");


    if(password === correctPassword){

        localStorage.clear();

        alert("Logout Successful!");

        window.location.href = "index.html";

    }
    else{

        alert("Wrong Password!");

    }

}