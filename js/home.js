document.addEventListener("DOMContentLoaded", async () => {
  const userData = await getUserData(); // ← función backend que ya hay
  const ahorroData = await getAhorrosMensuales(); // ← array de objetos tipo {mes, cantidad}

  // Saludo personalizado
  document.getElementById("user-nombre").textContent = `${userData.nombre} ${userData.apellido.split(" ")[0]}`;

  // Método recomendado
  document.getElementById("metodo").innerHTML = `Método recomendado: <strong>${userData.metodo_ahorro}</strong>`;
  document.getElementById("total-ahorrado").textContent = `${userData.total_ahorrado}€`;

  // Gráfico
  const ctx = document.getElementById("graficaAhorros").getContext("2d");
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ahorroData.map(e => e.mes),
      datasets: [{
        label: 'Ahorros por mes (€)',
        data: ahorroData.map(e => e.cantidad),
        backgroundColor: '#0EAF21'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
});
