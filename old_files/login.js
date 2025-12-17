
const API_BASE = 'http://localhost:5000/api';


// Register
document.getElementById('regBtn').addEventListener('click', async () => {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const msg = document.getElementById('regMsg');
  msg.textContent = '';

  if (!name || !email || password.length < 6)
    return msg.textContent = 'Enter valid name, email, and password (min 6 chars).';

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      sessionStorage.setItem('token', data.token);
      msg.style.color = 'green';
      msg.textContent = 'Registered and logged in!';
    } else {
      msg.style.color = '#b03';
      msg.textContent = data.message || 'Registration failed';
    }
  } catch {
    msg.style.color = '#b03';
    msg.textContent = 'Network error';
  }
});

// Login
document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const msg = document.getElementById('loginMsg');
  msg.textContent = '';

  if (!email || !password)
    return msg.textContent = 'Enter email and password.';

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      sessionStorage.setItem('token', data.token);
      msg.style.color = 'green';
      msg.textContent = 'Login successful!';
    } else {
      msg.style.color = '#b03';
      msg.textContent = data.message || 'Login failed';
    }
  } catch {
    msg.style.color = '#b03';
    msg.textContent = 'Network error';
  }
});

// Profile
document.getElementById('fetchProfile').addEventListener('click', async () => {
  const profileEl = document.getElementById('profile');
  profileEl.textContent = '';

  const token = sessionStorage.getItem('token');
  if (!token)
    return profileEl.textContent = 'Not logged in.';

  try {
    const res = await fetch(`${API_BASE}/profile`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await res.json();

    if (res.ok)
      profileEl.textContent = JSON.stringify(data, null, 2);
    else
      profileEl.textContent = data.message || 'Could not fetch profile';
  } catch {
    profileEl.textContent = 'Network error';
  }
});
