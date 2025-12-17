const API_BASE = "http://localhost:5000/api";

/* ================= REGISTER ================= */
document.getElementById("regBtn").addEventListener("click", async () => {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const msg = document.getElementById("regMsg");
  msg.textContent = "";

  if (!name || !email || password.length < 6) {
    msg.style.color = "#b03";
    msg.textContent = "Enter valid name, email, and password (min 6 chars).";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      msg.style.color = "green";
      msg.textContent = "Registered successfully! Please login.";
    } else {
      msg.style.color = "#b03";
      msg.textContent = data.message || "Registration failed";
    }
  } catch (err) {
    msg.style.color = "#b03";
    msg.textContent = "Network error";
  }
});

/* ================= LOGIN ================= */
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const msg = document.getElementById("loginMsg");
  msg.textContent = "";

  if (!email || !password) {
    msg.style.color = "#b03";
    msg.textContent = "Enter email and password.";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      sessionStorage.setItem("token", data.token);
      msg.style.color = "green";
      msg.textContent = "Login successful!";
    } else {
      msg.style.color = "#b03";
      msg.textContent = data.message || "Invalid email or password";
    }
  } catch (err) {
    msg.style.color = "#b03";
    msg.textContent = "Network error";
  }
});

/* ================= PROFILE ================= */
document.getElementById("fetchProfile").addEventListener("click", async () => {
  const profileEl = document.getElementById("profile");
  profileEl.textContent = "";

  const token = sessionStorage.getItem("token");
  if (!token) {
    profileEl.textContent = "Not logged in.";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/profile`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();

    if (res.ok) {
      profileEl.textContent = JSON.stringify(data, null, 2);
    } else {
      profileEl.textContent = data.message || "Could not fetch profile";
    }
  } catch (err) {
    profileEl.textContent = "Network error";
  }
});
