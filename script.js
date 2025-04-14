// script.js

document.addEventListener("DOMContentLoaded", function() {
  // Se parsea el archivo CSV (cobertura.csv) alojado en la raíz
  Papa.parse("cobertura.csv", {
    download: true,
    header: true,
    complete: function(results) {
      var datos = results.data;
      var tbody = document.getElementById("tabla-cobertura");

      datos.forEach(function(item) {
        // Crear una fila para cada registro
        var tr = document.createElement("tr");

        // Columna Temática
        var tdTematica = document.createElement("td");
        tdTematica.innerHTML = '<p style="text-align: center; color: #123662;"><span style="white-space: nowrap;">' + item.Tematica + '</span></p>';
        tr.appendChild(tdTematica);

        // Columna Objeto
        var tdObjeto = document.createElement("td");
        tdObjeto.innerHTML = '<p style="text-align: center; color: #123662;"><span style="white-space: nowrap;">' + item.Objeto + '</span></p>';
        tr.appendChild(tdObjeto);

        // Columna Tipo
        var tdTipo = document.createElement("td");
        tdTipo.innerHTML = '<p style="text-align: center; color: #123662;"><span style="white-space: nowrap;">' + item.Tipo + '</span></p>';
        tr.appendChild(tdTipo);

        // Columna Geoservicio: se agrupan las opciones según las 3 columnas
        var tdGeo = document.createElement("td");
        var geoOptions = [];
        if (item["Geoservicio_1_Label"] && item["Geoservicio_1_URL"]) {
          geoOptions.push({label: item["Geoservicio_1_Label"], url: item["Geoservicio_1_URL"]});
        }
        if (item["Geoservicio_2_Label"] && item["Geoservicio_2_URL"]) {
          geoOptions.push({label: item["Geoservicio_2_Label"], url: item["Geoservicio_2_URL"]});
        }
        if (item["Geoservicio_3_Label"] && item["Geoservicio_3_URL"]) {
          geoOptions.push({label: item["Geoservicio_3_Label"], url: item["Geoservicio_3_URL"]});
        }
        tdGeo.appendChild(createDropdownFromArray(geoOptions, "URL"));
        tr.appendChild(tdGeo);

        // Columna Descarga: se agrupan las opciones según las 2 columnas
        var tdDescarga = document.createElement("td");
        var descargaOptions = [];
        if (item["Descarga_1_Label"] && item["Descarga_1_URL"]) {
          descargaOptions.push({label: item["Descarga_1_Label"], url: item["Descarga_1_URL"]});
        }
        if (item["Descarga_2_Label"] && item["Descarga_2_URL"]) {
          descargaOptions.push({label: item["Descarga_2_Label"], url: item["Descarga_2_URL"]});
        }
        tdDescarga.appendChild(createDropdownFromArray(descargaOptions, "Raster (Geo TIFF)"));
        tr.appendChild(tdDescarga);

        // Columna Catálogo con icono
        var tdCatalogo = document.createElement("td");
        tdCatalogo.style.textAlign = "center";
        tdCatalogo.innerHTML = '<a href="' + item.Catalogo + '" target="_blank"><img src="https://cdn-icons-png.freepik.com/256/2326/2326855.png?semt=ais_hybrid" alt="Catálogo" style="width:60%;"></a>';
        tr.appendChild(tdCatalogo);

        // Columna Metadato con icono
        var tdMetadato = document.createElement("td");
        tdMetadato.style.textAlign = "center";
        tdMetadato.innerHTML = '<a href="' + item.Metadato + '" target="_blank"><img src="https://cdn-icons-png.freepik.com/256/10868/10868143.png?semt=ais_hybrid" alt="Metadato" style="width:60%;"></a>';
        tr.appendChild(tdMetadato);

        // Columna Salida gráfica con icono
        var tdSalida = document.createElement("td");
        tdSalida.style.textAlign = "center";
        tdSalida.innerHTML = '<a href="' + item.SalidaGrafica + '" target="_blank"><img src="https://cdn-icons-png.freepik.com/256/5320/5320547.png?semt=ais_hybrid" alt="Salida gráfica" style="width:70%;"></a>';
        tr.appendChild(tdSalida);

        // Agregar la fila al cuerpo de la tabla
        tbody.appendChild(tr);
      });

      // Una vez agregadas todas las filas, inicializamos DataTables para paginación y filtros.
      $('#tabla-cobertura-table').DataTable({
        paging: true,
        searching: true,
        info: true,
        order: [] // Si se prefiere sin orden inicial
      });
    }
  });

  /**
   * Función para crear un dropdown a partir de un array de opciones.
   * Cada opción es un objeto {label, url}. buttonLabel indica el texto del botón.
   */
  function createDropdownFromArray(options, buttonLabel) {
    var div = document.createElement("div");
    div.className = "dropdown";
    div.style.textAlign = "center";

    var button = document.createElement("button");
    button.className = "btn btn-default dropdown-toggle";
    button.setAttribute("data-toggle", "dropdown");
    button.innerHTML = buttonLabel + ' <span class="caret"></span>';
    div.appendChild(button);

    var ul = document.createElement("ul");
    ul.className = "dropdown-menu";

    options.forEach(function(option) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = option.url;
      a.target = "_blank";
      a.textContent = option.label;
      li.appendChild(a);
      ul.appendChild(li);
    });

    div.appendChild(ul);

    // Lógica para mostrar/ocultar el menú al hacer clic en el botón
    button.addEventListener("click", function(event) {
      event.stopPropagation();
      if (ul.style.display === "block") {
        ul.style.display = "none";
      } else {
        closeAllDropdowns();
        ul.style.display = "block";
      }
    });

    return div;
  }

  // Función para cerrar todos los dropdowns
  function closeAllDropdowns() {
    var menus = document.querySelectorAll(".dropdown-menu");
    menus.forEach(function(menu) {
      menu.style.display = "none";
    });
  }

  // Cierra los dropdowns si se hace clic fuera de ellos
  document.addEventListener("click", function() {
    closeAllDropdowns();
  });
});
