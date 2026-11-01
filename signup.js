// ============================================================
//  CODE  (you shouldn't need to change anything in this file)
// ============================================================

// Shows a green (good) or red (bad) message under the boxes
function showMessage(text, kind) {
    var message = document.getElementById("message");
    message.className = "message " + kind;
    message.textContent = text;
}

// First and last names: only letters, 1 to 15 characters
// (\p{L} means "any letter", so names like Zahra or Darius both work)
function nameIsOk(text) {
    return /^\p{L}{1,15}$/u.test(text);
}

// Username: only letters and numbers, 1 to 15 characters
function usernameIsOk(text) {
    return /^[A-Za-z0-9]{1,15}$/.test(text);
}

// Sign up button: checks everything, then makes the account
// (it starts as "pending")
async function signUp() {
    var firstName = document.getElementById("first-name").value.trim();
    var lastName = document.getElementById("last-name").value.trim();
    var username = document.getElementById("username").value.trim();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value;
    var wantsNewsletter = document.getElementById("newsletter").checked;

    // 1. Check the boxes on this page first
    if (firstName == "" || lastName == "" || username == "" || email == "" || password == "") {
        showMessage("Fill in every box.", "bad");
        return;
    }
    if (!nameIsOk(firstName)) {
        showMessage("First name: letters only, up to 15 characters.", "bad");
        return;
    }
    if (!nameIsOk(lastName)) {
        showMessage("Last name: letters only, up to 15 characters.", "bad");
        return;
    }
    if (!usernameIsOk(username)) {
        showMessage("Username: letters and numbers only, up to 15 characters.", "bad");
        return;
    }
    if (password.length < 6) {
        showMessage("Password must be at least 6 characters.", "bad");
        return;
    }

    // 2. Ask the database if the username is already taken
    var check = await db.rpc("username_taken", { name: username });

    if (check.error) {
        showMessage("Could not check the username. Try again.", "bad");
        return;
    }
    if (check.data == true) {
        showMessage("That username is already taken.", "bad");
        return;
    }

    // 3. Make the account
    var result = await db.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                newsletter: wantsNewsletter,
                first_name: firstName,
                last_name: lastName,
                username: username
            }
        }
    });

    if (result.error) {
        if (result.error.message.indexOf("Database error") != -1) {
            showMessage("That username may already be taken. Try a different one.", "bad");
        } else {
            showMessage(result.error.message, "bad");
        }
        return;
    }

    if (result.data.session) {
        showMessage("Account created! Your access request is pending approval.", "good");
    } else {
        showMessage("Account created! Check your email to confirm it, then log in.", "good");
    }
}
