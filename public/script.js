// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success) {
        window.location.href = "/dashboard.html";
    } else {
        alert("Login failed");
    }
});

// AI
async function sendAI() {
    const input = document.getElementById("aiInput").value;

    const res = await fetch("/ai-service", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ request: input })
    });

    const data = await res.json();
    document.getElementById("result").innerText = data.response;
}
