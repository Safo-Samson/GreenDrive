document.addEventListener("DOMContentLoaded", function () {
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
        body: JSON.stringify({ email, password}),
      });

      console.log(response.headers.get('authorization'));

      if (response.status !== 200) {
        const errorData = await response.json();
        alert(errorData.message);
        return;
      } 
  
      const userData = await response.json();
      console.log(userData)
      // console.log(response.headers.get('authorization'));

      // Checking if the authorization header exists in the response
      const authorizationHeader = response.headers.get('authorization');
      if (authorizationHeader) {
        localStorage.setItem('token', `Bearer ${authorizationHeader.split(' ')[1]}`);
      } else {
        console.error('Authorization header is missing in the response');
      }

      localStorage.setItem('userId', userData.userId);
      localStorage.setItem('userType', userData.userType)
      localStorage.setItem('token', `Bearer ${response.headers.get('authorization').split(' ')[1]}`);  // to save the token in localStorage
      alert('Login successful');
      window.location.href = '/'; // Redirect to the homepage or any desired page
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    }
  });
});
