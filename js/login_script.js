document.addEventListener('DOMContentLoaded', function() {
    const loginForm      = document.getElementById('login-form');
    const emailInput     = document.getElementById('email');
    const passwordInput  = document.getElementById('password');
    const emailError     = document.getElementById('email-error');
    const passwordError  = document.getElementById('password-error');
    const formMessage    = document.getElementById('form-message');
    const togglePassword = document.getElementById('toggle-password');
    const loginButton    = document.getElementById('login-button');

    // Mostrar / ocultar contraseña
    togglePassword.addEventListener('click', function() {
        const tipo = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', tipo);
        togglePassword.querySelector('i').classList.toggle('fa-eye');
        togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Validación en tiempo real para email
    emailInput.addEventListener('input', validateEmail);

    // Validación en tiempo real para contraseña
    passwordInput.addEventListener('input', validatePassword);

    // Envío del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Limpiar mensajes anteriores
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        // Validar campos
        const emailValido    = validateEmail();
        const passwordValido = validatePassword();

        if (emailValido && passwordValido) {
            // Simular llamada a API
            loginButton.disabled    = true;
            loginButton.textContent = 'Iniciando sesión...';

            setTimeout(function() {
                // Simular comprobación de credenciales
                const mockUsers = [
                    { email: 'user@example.com',  password: 'Password123' },
                    { email: 'admin@example.com', password: 'Admin123'   }
                ];

                const user = mockUsers.find(u => u.email === emailInput.value);

                if (user && user.password === passwordInput.value) {
                    // Éxito
                    formMessage.textContent = '¡Inicio de sesión exitoso! Redirigiendo...';
                    formMessage.className   = 'form-message success';

                    // Simular redirección
                    setTimeout(function() {
                        alert('Redirigiendo al panel (simulación)');
                    }, 1500);

                } else if (user) {
                    // Contraseña incorrecta
                    formMessage.textContent = 'Contraseña incorrecta. Por favor, inténtalo de nuevo.';
                    formMessage.className   = 'form-message error';
                } else {
                    // Usuario no existe
                    formMessage.textContent = 'Usuario no encontrado. Verifica tu email o regístrate.';
                    formMessage.className   = 'form-message error';
                }

                loginButton.disabled    = false;
                loginButton.textContent = 'Iniciar sesión';
            }, 1500);
        }
    });

    // ─── Funciones de validación ────────────────────────────────────────
    function validateEmail() {
        const valor = emailInput.value.trim();
        let   valido = true;

        if (valor === '') {
            emailError.textContent = 'El email es obligatorio';
            valido = false;
        } else if (!isValidEmail(valor)) {
            emailError.textContent = 'Por favor, ingresa un email válido';
            valido = false;
        } else {
            emailError.textContent = '';
        }

        highlightInput(emailInput, valido);
        return valido;
    }

    function validatePassword() {
        const valor = passwordInput.value;
        let   valido = true;

        if (valor === '') {
            passwordError.textContent = 'La contraseña es obligatoria';
            valido = false;
        } else if (valor.length < 6) {
            passwordError.textContent = 'Debe tener al menos 6 caracteres';
            valido = false;
        } else {
            passwordError.textContent = '';
        }

        highlightInput(passwordInput, valido);
        return valido;
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function highlightInput(input, valido) {
        if (valido) {
            input.style.borderColor = '#e0e0e0';
            input.style.boxShadow   = 'none';
        } else {
            input.style.borderColor = '#f44336';
            input.style.boxShadow   = '0 0 0 2px rgba(244, 67, 54, 0.1)';
        }
    }
});
