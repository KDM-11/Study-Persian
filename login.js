// ============================================================
//  CODE  (you shouldn't need to change anything in this file)
// ============================================================

// Shows a green (good) or red (bad) message under the boxes
function showMessage(text, kind) {
    var message = document.getElementById("message");
    message.className = "message " + kind;
    message.textContent = text;
}

// Log in button
async function logIn() {
    var email = document.getElementById("email").value;
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

// Sign up button: makes the account (it starts as "pending")
async function signUp() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var wantsNewsletter = document.getElementById("newsletter").checked;

    if (email == "" || password == "") {
        showMessage("Enter an email and a password.", "bad");
        return;
    }

    var result = await db.auth.signUp({
        email: email,
        password: password,
        options: { data: { newsletter: wantsNewsletter } }
    });

    if (result.error) {
        showMessage(result.error.message, "bad");
        return;
    }

    if (result.data.session) {
        showMessage("Account created! Your access request is pending approval.", "good");
    } else {
        showMessage("Account created! Check your email to confirm it, then log in.", "good");
    }
}
