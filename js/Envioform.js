(function(){
  emailjs.init("EkcS8rhYe7S7SbRbA"); // Public Key
})();

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contact-form");
  
  if (form) {
    form.addEventListener("submit", function(event) {
      event.preventDefault();

      emailjs.sendForm("service_l37ru64", "template_chmv914", this)
        .then(function() {
          console.log("Mensaje enviado correctamente");
          window.location.href = "mensajeEnviado.html";
        }, function(error) {
          console.error("Fallo al enviar", error);
          alert("Hubo un error al enviar el mensaje.");
        });
    });
  }
});