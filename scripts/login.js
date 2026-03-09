document.getElementById('submitbtn')
  .addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin123') {
      alert('Sign in successful.');
      window.location.assign("home.html");
    } else {
      alert('Sign in not successful. Use admin & admin123');
      return;
    }
  });