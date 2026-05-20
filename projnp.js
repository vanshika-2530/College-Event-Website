let user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
    user = {
        name: "Guest",
        email: "",
        phone: "",
        roll: "",
        degree: "",
        department: "",
        year: "",
        registeredEvents: [],
        activity: []

    };
    
    if (!user.activity) {
    user.activity = [];
}

}


// Show user info
document.addEventListener("DOMContentLoaded", () => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    document.getElementById("user-name").textContent = currentUser.name || "Not set";
    document.getElementById("user-email").textContent = currentUser.email || "Not set";
    document.getElementById("user-roll").textContent = currentUser.roll || "Not set"; // ✅ Add here
    document.getElementById("user-phone").textContent = currentUser.phone || "Not set";
    document.getElementById("user-degree").textContent = currentUser.degree || "Not set";
    document.getElementById("user-department").textContent = currentUser.department || "Not set";
    document.getElementById("user-year").textContent = currentUser.year || "Not set";
});



// Registered Events with Cancel button
const eventsList = document.getElementById("events-list");
eventsList.innerHTML = "";
user.registeredEvents.forEach(event => {
    const li = document.createElement("li");
    li.textContent = event;

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.style.marginLeft = "5px";
    cancelBtn.onclick = () => removeEvent(event);

    li.appendChild(cancelBtn);
    eventsList.appendChild(li);
});


// Activity Log
const activityLog = document.getElementById("activity-log");
activityLog.innerHTML = "";
user.activity.forEach(action => {
    const li = document.createElement("li");
    li.textContent = action;
    activityLog.appendChild(li);
});

// Progress + Badges
updateProgress();
checkAchievements();


function updateProfile() {
    const newName = document.getElementById("edit-name").value;
    const newEmail = document.getElementById("edit-email").value;
    const newPhone = document.getElementById("edit-phone").value;
    const newDegree = document.getElementById("edit-degree").value;
    const newDepartment = document.getElementById("edit-department").value;
    const newYear = document.getElementById("edit-year").value;

    if(newName) user.name = newName;
    if(newEmail) user.email = newEmail;
    if(newPhone) user.phone = newPhone;
    if(newDegree) user.degree = newDegree;
    if(newDepartment) user.department = newDepartment;
    if(newYear) user.year = newYear;

    localStorage.setItem("currentUser", JSON.stringify(user));

    document.getElementById("user-name").textContent = user.name;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("user-phone").textContent = user.phone;
    document.getElementById("user-degree").textContent = user.degree;
    document.getElementById("user-department").textContent = user.department;
    document.getElementById("user-year").textContent = user.year;

    user.activity.push("Updated profile info");   
    localStorage.setItem("currentUser", JSON.stringify(user)); 

    const log = document.createElement("li");
    log.textContent = "Updated profile info";
    document.getElementById("activity-log").appendChild(log);

    showToast("Profile updated successfully!");
}

function removeEvent(eventName) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    currentUser.registeredEvents = currentUser.registeredEvents.filter(e => e !== eventName);

    if (currentUser.activity) {
        currentUser.activity = currentUser.activity.filter(action => action !== `Registered for ${eventName}`);
    }

    currentUser.activity.push(`Cancelled ${eventName}`);

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    user = currentUser;

    const eventsList = document.getElementById("events-list");
    eventsList.innerHTML = "";
    user.registeredEvents.forEach(event => {
        const li = document.createElement("li");
        li.textContent = event;

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.style.marginLeft = "10px";
        cancelBtn.onclick = () => removeEvent(event);

        li.appendChild(cancelBtn);
        eventsList.appendChild(li);
    });

    const activityLog = document.getElementById("activity-log");
    activityLog.innerHTML = "";
    user.activity.forEach(action => {
        const li = document.createElement("li");
        li.textContent = action;
        activityLog.appendChild(li);
    });
    updateProgress();
    checkAchievements();
}




/*search bar*/
function searchEvent() {
    const keyword = document.getElementById("search-event").value;
    const items = document.querySelectorAll("#events-list li");
    items.forEach(li => {
        li.style.display = li.textContent.includes(keyword) ? "list-item" : "none";
    });
}


/*toast notif*/

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}

/*progress*/
function updateProgress() {
    const count = user.registeredEvents.length;
    const percent = (count / 10) * 100;

    document.getElementById("progress").textContent = `You are registered for ${count} events.`;
    document.getElementById("progress-fill").style.width = `${percent}%`;

    let message;
    if (count < 1) {
        message = "Register 1 event to unlock your first badge.";
    } else if (count < 4) {
        message = (4 - count) + " events left for next badge.";
    } else if (count < 10) {
        message = (10 - count) + " events left for next badge.";
    } else {
        message = "All badges unlocked! 🎉";
    }

    document.getElementById("progress-info").textContent = message;
    checkAchievements();

}


/* badge*/

function checkAchievements() {
    const badgeBox = document.getElementById("badges");
    badgeBox.innerHTML = "";

    if (user.registeredEvents.length >= 1) {
        badgeBox.innerHTML += `<div class="badge unlocked">🎉 First Event!</div><br>`;
    }
    if (user.registeredEvents.length >= 4) {
        badgeBox.innerHTML += `<div class="badge unlocked">⭐ Event Enthusiast! <small class="badge-sub">Unlocked at 4 events</small></div>`;
    }
    if (user.registeredEvents.length >= 10) {
        badgeBox.innerHTML += `<div class="badge unlocked">🏆 Super Participant! <small class="badge-sub">Unlocked at 10 events</small></div>`;
    }
}