// script.js

// Se espera a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", function() {
    // Se obtiene el elemento del botón por su id
    var btn = document.getElementById("btnRedirect");
  
    // Se agrega un evento para redirigir al hacer clic en el botón
    btn.addEventListener("click", function() {
      window.location.href = "https://www.ideam.gov.co";
    });
  });
  