
let selectedEvent = "";
let redirectPage = "";

function openRegisterPopup(eventName) {
    selectedEvent = eventName;
    redirectPage = window.location.href;

    localStorage.setItem("selectedEvent", selectedEvent);
    localStorage.setItem("redirectPage", redirectPage);
 
    const popup = document.getElementById("registerPopup");
    if (popup) popup.style.display = "flex";
}

function closeRegisterPopup() {
    const popup = document.getElementById("registerPopup");
    if (popup) popup.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {

    const confirmBtn = document.getElementById("confirmBtn");

    if (!confirmBtn) return;

    confirmBtn.onclick = () => {
        closeRegisterPopup();
        window.location.href = "register.html";
    };
});

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("eventForm");
    if (!form) return;

    const eventName = localStorage.getItem("selectedEvent");
    const redirect = localStorage.getItem("redirectPage");

    const eventText = document.getElementById("selectedEventText");
    if (eventText && eventName) {
        eventText.innerText = `Selected Event: ${eventName}`;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        saveRegistration(eventName);

        showToast("🎉 Registered Successfully!");

        setTimeout(() => {
            window.location.href = redirect || "events.html";
        }, 1200);
    });
});


function saveRegistration(eventName) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    if (!currentUser.registeredEvents.includes(eventName)) {
        currentUser.registeredEvents.push(eventName);

        if (!currentUser.activity) currentUser.activity = [];
        currentUser.activity.push(`Registered for ${eventName}`);

        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
}


function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


document.addEventListener("DOMContentLoaded", () => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.registeredEvents) return;

document.querySelectorAll(".register-btn").forEach(btn => {
    const eventName = btn.dataset.event;

    if (currentUser.registeredEvents.includes(eventName)) {
        btn.innerText = "Registered ✅";
        btn.disabled = true;
    }
});
    });

function rateEvent(eventName, rating) {
    let ratings = JSON.parse(localStorage.getItem("eventRatings")) || {};
    if (!ratings[eventName]) ratings[eventName] = [];

    ratings[eventName].push(rating);
    localStorage.setItem("eventRatings", JSON.stringify(ratings));

    let sum = ratings[eventName].reduce((a, b) => a + b, 0);
    let avg = (sum / ratings[eventName].length).toFixed(1);

    document.getElementById("avg-rating-" + eventName).textContent =
        `Average Rating: ${avg}⭐ (${ratings[eventName].length} votes)`;
}


function enableRating(eventName) {
    const starsBox = document.getElementById("stars-" + eventName);
    if (starsBox) {
        starsBox.style.pointerEvents = "auto";
        starsBox.style.opacity = "1";
        document.getElementById("rating-message-" + eventName).textContent = "Rate this event:";
    }
}
