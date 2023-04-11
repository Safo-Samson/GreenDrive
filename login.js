document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.status !== 200) {
        const errorData = await response.json();
        alert(errorData.message);
        return;
      } 
  
      const userData = await response.json();
      localStorage.setItem('userId', userData.userId);
      alert('Login successful');
      window.location.href = '/'; // Redirect to the homepage or any desired page
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    }
  });
  