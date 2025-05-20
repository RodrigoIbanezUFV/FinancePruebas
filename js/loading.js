// Al cargar, espera 3s y redirige al login
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 3000);
  });
  