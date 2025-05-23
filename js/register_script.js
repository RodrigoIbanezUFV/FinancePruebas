document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    const nameIn = document.getElementById('name');
    const userIn = document.getElementById('username');
    const emailIn = document.getElementById('email');
    const passIn = document.getElementById('password');
    const confirmIn = document.getElementById('confirm-password');
  
    const nameErr = document.getElementById('name-error');
    const userErr = document.getElementById('username-error');
    const emailErr = document.getElementById('email-error');
    const passErr = document.getElementById('password-error');
    const confirmErr = document.getElementById('confirm-password-error');
  
    const formMsg = document.getElementById('form-message');
    const submitBtn = document.getElementById('register-button');
  
    // Toggle both password fields
    function setupToggle(toggleId, inputEl) {
      document.getElementById(toggleId).addEventListener('click', () => {
        const type = inputEl.type === 'password' ? 'text' : 'password';
        inputEl.type = type;
        const icon = inputEl.nextElementSibling.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
      });
    }
    setupToggle('toggle-password', passIn);
    setupToggle('toggle-confirm-password', confirmIn);
  
    // Validation helpers
    function highlight(el, valid) {
      el.style.borderColor  = valid ? '#e0e0e0':'#f44336';
      el.style.boxShadow    = valid ? 'none':'0 0 0 2px rgba(244,67,54,0.1)';
    }
    function isEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }
  
    function validateName() {
      const v = nameIn.value.trim();
      if (!v) {
        nameErr.textContent = 'El nombre es obligatorio';
        highlight(nameIn,false);
        return false;
      }
      nameErr.textContent = '';
      highlight(nameIn,true);
      return true;
    }
  
    function validateUsername() {
      const v = userIn.value.trim();
      if (!v) {
        userErr.textContent = 'El username es obligatorio';
        highlight(userIn,false);
        return false;
      }
      userErr.textContent = '';
      highlight(userIn,true);
      return true;
    }
  
    function validateEmail() {
      const v = emailIn.value.trim();
      if (!v) {
        emailErr.textContent = 'El email es obligatorio';
        highlight(emailIn,false);
        return false;
      }
      if (!isEmail(v)) {
        emailErr.textContent = 'Formato de email no válido';
        highlight(emailIn,false);
        return false;
      }
      emailErr.textContent = '';
      highlight(emailIn,true);
      return true;
    }
  
    function validatePassword() {
      const v = passIn.value;
      if (!v) {
        passErr.textContent = 'La contraseña es obligatoria';
        highlight(passIn,false);
        return false;
      }
      if (v.length < 6) {
        passErr.textContent = 'Mínimo 6 caracteres';
        highlight(passIn,false);
        return false;
      }
      passErr.textContent = '';
      highlight(passIn,true);
      return true;
    }
  
    function validateConfirm() {
      const v1 = passIn.value;
      const v2 = confirmIn.value;
      if (!v2) {
        confirmErr.textContent = 'Confirma tu contraseña';
        highlight(confirmIn,false);
        return false;
      }
      if (v1 !== v2) {
        confirmErr.textContent = 'Las contraseñas no coinciden';
        highlight(confirmIn,false);
        return false;
      }
      confirmErr.textContent = '';
      highlight(confirmIn,true);
      return true;
    }
  
    // Real-time
    nameIn.addEventListener('input',    validateName);
    userIn.addEventListener('input',    validateUsername);
    emailIn.addEventListener('input',   validateEmail);
    passIn.addEventListener('input',    validatePassword);
    confirmIn.addEventListener('input', validateConfirm);
  
    form.addEventListener('submit', e => {
      e.preventDefault();
      formMsg.textContent = '';
      formMsg.className = 'form-message';
  
      const ok =
        validateName() &&
        validateUsername() &&
        validateEmail() &&
        validatePassword() &&
        validateConfirm();
  
      if (!ok) return;
  
      // Simulate registration
      submitBtn.disabled = true;
      submitBtn.textContent = 'Registrando...';
  
      setTimeout(() => {
        formMsg.textContent = '¡Registro exitoso! Redirigiendo…';
        formMsg.classList.add('success');
        // aquí podrías redirigir de verdad
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    }, 1500);
    });
  });
  