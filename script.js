Here's your updated code with JWT support using the standard `Bearer` token format:

```javascript
let token = null;
let countdownInterval = null;

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      alert('Registration successful! You can now log in.');
    } else {
      alert('Registration failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      token = data.token;
      updateTokenVisual();
    } else {
      alert('Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

function updateTokenVisual() {
  const tokenInfo = document.getElementById('token-info');
  tokenInfo.textContent = `Token: ${token.substr(0, 20)}...`;

  let timeLeft = 3600;
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('countdown').textContent = `Expires in: ${minutes}m ${seconds}s`;
    if (timeLeft === 0) {
      clearInterval(countdownInterval);
      token = null;
      tokenInfo.textContent = 'Token expired';
    }
    timeLeft--;
  }, 1000);
}

document.getElementById('access-protected').addEventListener('click', async () => {
  if (!token) {
    alert('Please login first');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/protected', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      const data = await response.json();
      document.getElementById('result').textContent = `Protected data: ${JSON.stringify(data)}`;
      animateTokenUsage();
    } else {
      alert('Access denied');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

function animateTokenUsage() {
  const tokenVisual = document.getElementById('token-visual');
  tokenVisual.style.transform = 'translateX(10px)';
  setTimeout(() => {
    tokenVisual.style.transform = 'translateX(-10px)';
    setTimeout(() => {
      tokenVisual.style.transform = 'translateX(0)';
    }, 100);
  }, 100);
}
```
