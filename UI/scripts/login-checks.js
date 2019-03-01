function loginRedirect() {
  const user = JSON.parse(localStorage.getItem('user-data'));
  if (user) { // if the user is logged in 
    // replace login with logout and show profile menu
    const loginLink = document.getElementById('login-link');
    const profileLink = document.getElementById('profile-link');

    profileLink.style.display = 'inline-block';
    loginLink.innerHTML = `<a href="logout.html">Logout</a>`;
  } else {
    // redirect if the page requires authentication ie not Index or about page' and hide the profile menu
    profileLink.style.display = 'none';
    const currentPage = window.location.pathname();
    if (!(currentPage.includes('index.html')) || !(currentPage.includes('login.html'))) {
      window.location.replace('login.html');
    }
  }
}