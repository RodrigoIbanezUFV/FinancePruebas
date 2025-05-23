document.addEventListener("DOMContentLoaded", () => {
  // Datos simulados del usuario
  const userData = {
    nombre: "Rodrigo",
    apellido: "Ibáñez",
    metodo_ahorro: "Método 50 - 30 - 20",
    total_ahorrado: 1260
  };

  // Datos simulados de ahorro mensual
  const ahorroData = [
    { mes: "Enero", cantidad: 120 },
    { mes: "Febrero", cantidad: 140 },
    { mes: "Marzo", cantidad: 100 },
    { mes: "Abril", cantidad: 110 },
    { mes: "Mayo", cantidad: 130 },
    { mes: "Junio", cantidad: 130 },
    { mes: "Julio", cantidad: 150 },
    { mes: "Agosto", cantidad: 150 },
    { mes: "Septiembre", cantidad: 130 },
  ];

  // Inyectar nombre y método
  document.getElementById("user-nombre").textContent = `${userData.nombre} ${userData.apellido}`;
  document.getElementById("metodo").textContent = userData.metodo_ahorro;
  document.getElementById("total-ahorrado").textContent = `${userData.total_ahorrado}€`;

  // Dibujar gráfica simulada
  const ctx = document.getElementById("graficaAhorros").getContext("2d");
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ahorroData.map(e => e.mes),
      datasets: [{
        label: 'Ahorros por mes (€)',
        data: ahorroData.map(e => e.cantidad),
        backgroundColor: '#187444'
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
