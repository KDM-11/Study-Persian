
// Shows a green (good) or red (bad) message under the boxes
function showMessage(text, kind) {
    var message = document.getElementById("message");
    message.className = "message " + kind;
    message.textContent = text;
}

// Log in button
async function logIn() {
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value;

    if (email == "" || password == "") {
        showMessage("Enter your email and password.", "bad");
        return;
    }

    var result = await db.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (result.error) {
        showMessage(result.error.message, "bad");
        return;
    }

    window.location.href = "colloquial.html";
}
