document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;
  
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, userType }),
      });
  
      if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else if (response.status !== 201) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      alert('User registered successfully');
    } catch (error) {
      console.error(error);
      if (error.message === 'User already exists') {
        alert('User already exists');
      } else {
        alert('Failed to register user');
      }
    }
  });
  