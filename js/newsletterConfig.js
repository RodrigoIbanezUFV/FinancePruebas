document.addEventListener("DOMContentLoaded", function () {
    const ahorroSwitch = document.getElementById("notificacionesAhorros");
    const metasSwitch = document.getElementById("notificacionesMetas");
    const ahorroMsg = document.getElementById("msgAhorros");
    const metasMsg = document.getElementById("msgMetas");

    function mostrarMensaje(msgContainer, texto, tipo) {
        msgContainer.textContent = texto;
        msgContainer.style.color = tipo === "on" ? "green" : "gray";
        msgContainer.style.fontSize = "14px";
        msgContainer.style.marginTop = "5px";
    }

    function guardarYMostrar() {
        const estado = {
            ahorros: ahorroSwitch.checked,
            metas: metasSwitch.checked
        };
        localStorage.setItem("finansmart_prefs", JSON.stringify(estado));

        mostrarMensaje(ahorroMsg,
            estado.ahorros ? "✅ Notificaciones de ahorros activadas" : "🔕 Notificaciones de ahorros desactivadas",
            estado.ahorros ? "on" : "off"
        );

        mostrarMensaje(metasMsg,
            estado.metas ? "✅ Notificaciones de metas activadas" : "🔕 Notificaciones de metas desactivadas",
            estado.metas ? "on" : "off"
        );
    }

    // Cargar estado
    const prefs = JSON.parse(localStorage.getItem("finansmart_prefs"));
    if (prefs) {
        ahorroSwitch.checked = prefs.ahorros;
        metasSwitch.checked = prefs.metas;
        guardarYMostrar(); // Mostrar mensaje inicial también
    }

    ahorroSwitch.addEventListener("change", guardarYMostrar);
    metasSwitch.addEventListener("change", guardarYMostrar);
});
