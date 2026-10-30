// ============================================================
//  CONTENT  (the paywall messages. The colloquial sentences
//  themselves live in the database, in the "colloquial" table)
// ============================================================

var messages = {
    loggedout: "Create a free account to request access. Once you are approved, Colloquial mode unlocks here.",
    pending: "Your request is pending. Come back once you have been approved.",
    denied: "Your request was not approved."
};


// ============================================================
//  CODE  (you shouldn't need to change anything below)
// ============================================================

// Runs when the page opens: decides paywall or members
async function loadPage() {
    var status = await getStatus();

    document.getElementById("loading").hidden = true;

    if (status == "approved") {
        document.getElementById("members").hidden = false;
        loadCards();
        return;
    }

    // everyone else sees the paywall
    document.getElementById("paywall").hidden = false;
    document.getElementById("paywall-text").textContent = messages[status];

    // only logged out visitors need the Login/Signup button
    if (status != "loggedout") {
        document.getElementById("paywall-button").hidden = true;
    }
}

// Gets the sentences from the database and puts them on the page
async function loadCards() {
    var result = await db.from("colloquial").select("*").order("id");
    var box = document.getElementById("cards");

    if (result.error) {
        box.textContent = "Could not load the content.";
        return;
    }

    for (var i = 0; i < result.data.length; i++) {
        box.appendChild(makeCard(result.data[i]));
    }
}

// Makes one card: formal, casual, pronunciation, English
function makeCard(row) {
    var card = document.createElement("div");
    card.className = "read-card colloquial-card";

    card.appendChild(makeLine("formal", row.formal, true));
    card.appendChild(makeLine("persian", row.casual, true));
    card.appendChild(makeLine("pron", row.pron, false));
    card.appendChild(makeLine("english", row.english, false));

    return card;
}

// Makes one line of text. isPersian = true makes it right-to-left
function makeLine(className, text, isPersian) {
    var line = document.createElement("p");
    line.className = className;
    line.textContent = text;
    if (isPersian) {
        line.lang = "fa";
        line.dir = "rtl";
    }
    return line;
}

loadPage();
