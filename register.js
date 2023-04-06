document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;
  
    const userData = {
      email,
      password,document.getElementById('register-form').addEventListener('submit', async (event) => {
        event.preventDefault();
      
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const userType = document.getElementById('userType').value;
      
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            userType,
          }),
        });
      
        if (response.status === 201) {
          const user = await response.json();
          console.log('User registered:', user);
          // Redirect to another page or display a success message
        } else {
          const error = await response.json();
          console.error('Failed to register user:', error.message);
          // Display an error message
        }
      });
      
      userType,
    };
  
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.status !== 201) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      alert('User registered successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to register user');
    }
  });
  