// ============================================================
//  SETTINGS  (paste your two Supabase values here)
//  Supabase > Project Settings > API
// ============================================================

var SUPABASE_URL = "https://fwpkjxqwgrbjmzftanla.supabase.co/rest/v1/";
var SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3cGtqeHF3Z3Jiam16ZnRhbmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyODU5MDMsImV4cCI6MjEwODg2MTkwM30.TxN-LouZWr2vFM0pSDhKjOcdSkczYzm9mXqEer7WidE";


// ============================================================
//  CODE  (you shouldn't need to change anything below)
// ============================================================

var db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Finds out who is visiting. Returns one of:
// "loggedout", "pending", "approved" or "denied"
async function getStatus() {
    var result = await db.auth.getSession();
    var session = result.data.session;

    if (session == null) {
        return "loggedout";
    }

    var profile = await db
        .from("profiles")
        .select("status")
        .eq("id", session.user.id)
        .single();

    if (profile.error) {
        return "pending";
    }
    return profile.data.status;
}

// Changes "Login/Signup" in the top corner to "Log out" when logged in
async function setupLoginLink() {
    var link = document.getElementById("auth-link");
    if (link == null) {
        return;
    }

    var status = await getStatus();
    if (status != "loggedout") {
        link.textContent = "Log out";
        link.href = "#";
        link.onclick = logOut;
    }
}

// Runs when you click "Log out"
async function logOut(event) {
    event.preventDefault();
    await db.auth.signOut();
    window.location.href = "index.html";
}

setupLoginLink();
