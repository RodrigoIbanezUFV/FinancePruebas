document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const formMessage = document.getElementById('form-message');
    const togglePassword = document.getElementById('toggle-password');
    const loginButton = document.getElementById('login-button');

    // Mostrar / ocultar contraseña
    togglePassword.addEventListener('click', function () {
        const tipo = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', tipo);
        togglePassword.querySelector('i').classList.toggle('fa-eye');
        togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Validación en tiempo real
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    // Envío del formulario
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        const emailValido = validateEmail();
        const passwordValido = validatePassword();

        if (emailValido && passwordValido) {
            loginButton.disabled = true;
            loginButton.textContent = 'Iniciando sesión...';

            setTimeout(function () {
                // Simulación de usuarios en memoria
                const mockUsers = [
                    { email: 'oscar@example.com', password: 'oscar123' },
                    { email: 'marta@example.com', password: 'marta123' },
                    { email: 'admin', password: 'Abc123@'}
                ];

                const user = mockUsers.find(u => u.email === emailInput.value);

                if (user && user.password === passwordInput.value) {
                    formMessage.textContent = '¡Inicio de sesión exitoso! Redirigiendo...';
                    formMessage.className = 'form-message success';

                    setTimeout(function () {
                        window.location.href = 'home.html'; 
                    }, 1500);

                } else if (user) {
                    formMessage.textContent = 'Contraseña incorrecta. Por favor, inténtalo de nuevo.';
                    formMessage.className = 'form-message error';
                } else {
                    formMessage.textContent = 'Usuario no encontrado. Verifica tu email o regístrate.';
                    formMessage.className = 'form-message error';
                }

                loginButton.disabled = false;
                loginButton.textContent = 'Iniciar sesión';
            }, 1500);
        }
    });

    // Validaciones
    function validateEmail() {
        const valor = emailInput.value.trim();
        let valido = true;

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
        let valido = true;

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
            input.style.boxShadow = 'none';
        } else {
            input.style.borderColor = '#f44336';
            input.style.boxShadow = '0 0 0 2px rgba(244, 67, 54, 0.1)';
        }
    }
});
