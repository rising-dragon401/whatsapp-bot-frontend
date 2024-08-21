export function signOut() {
  // Remove token from localStorage
  localStorage.removeItem('accessToken');

  // You can also clear cookies if needed
  // document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

  // Redirect to sign-in page or home page
  window.location.href = '/auth/signin'; // or '/'; for home page
}
