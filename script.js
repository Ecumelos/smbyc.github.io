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
        tdTematica.innerHTML =
          '<p style="text-align:center; color:#123662;">' +
            '<span style="white-space:nowrap;">' + (item.Tematica || "") + '</span>' +
          '</p>';
        tr.appendChild(tdTematica);

        // Columna Objeto
        var tdObjeto = document.createElement("td");
        tdObjeto.innerHTML =
          '<p style="text-align:center; color:#123662;">' +
            '<span style="white-space:nowrap;">' + (item.Objeto || "") + '</span>' +
          '</p>';
        tr.appendChild(tdObjeto);

        // Columna Tipo
        var tdTipo = document.createElement("td");
        tdTipo.innerHTML =
          '<p style="text-align:center; color:#123662;">' +
            '<span style="white-space:nowrap;">' + (item.Tipo || "") + '</span>' +
          '</p>';
        tr.appendChild(tdTipo);

        // Columna Estado
        var tdEstado = document.createElement("td");
        tdEstado.style.textAlign = "center";

        if (item.Estado === "Oficializada" || item.Estado === "Oficializado") {
          var sello = document.createElement("span");
          sello.className = "stamp";
          sello.textContent = item.Estado;
          tdEstado.appendChild(sello);
        } else {
          tdEstado.innerHTML =
            '<p style="text-align:center; color:#123662;">' +
              '<span style="white-space:nowrap;">' + (item.Estado || "") + '</span>' +
            '</p>';
        }
        tr.appendChild(tdEstado);

        // Columna Geoservicio (hasta 3 opciones)
        var tdGeo = document.createElement("td");
        var geoOptions = [];
        if (item.Geoservicio_1_Label && item.Geoservicio_1_URL) {
          geoOptions.push({ label: item.Geoservicio_1_Label, url: item.Geoservicio_1_URL });
        }
        if (item.Geoservicio_2_Label && item.Geoservicio_2_URL) {
          geoOptions.push({ label: item.Geoservicio_2_Label, url: item.Geoservicio_2_URL });
        }
        if (item.Geoservicio_3_Label && item.Geoservicio_3_URL) {
          geoOptions.push({ label: item.Geoservicio_3_Label, url: item.Geoservicio_3_URL });
        }
        tdGeo.appendChild(createDropdownFromArray(geoOptions, "URL"));
        tr.appendChild(tdGeo);

        // Columna Descarga (hasta 3 opciones)
        var tdDescarga = document.createElement("td");
        var descargaOptions = [];
        if (item.Descarga_1_Label && item.Descarga_1_URL) {
          descargaOptions.push({ label: item.Descarga_1_Label, url: item.Descarga_1_URL });
        }
        if (item.Descarga_2_Label && item.Descarga_2_URL) {
          descargaOptions.push({ label: item.Descarga_2_Label, url: item.Descarga_2_URL });
        }
        if (item.Descarga_3_Label && item.Descarga_3_URL) {
          descargaOptions.push({ label: item.Descarga_3_Label, url: item.Descarga_3_URL });
        }
        tdDescarga.appendChild(createDropdownFromArray(descargaOptions, "Descarga"));
        tr.appendChild(tdDescarga);

        // Columna Catálogo
        var tdCatalogo = document.createElement("td");
        tdCatalogo.style.textAlign = "center";
        if (item.Catalogo) {
          tdCatalogo.innerHTML =
            '<a href="' + item.Catalogo + '" target="_blank">' +
              '<img src="https://cdn-icons-png.freepik.com/256/2326/2326855.png" alt="Catálogo" style="width:60%;">' +
            '</a>';
        } else {
          var spanCat = document.createElement("span");
          spanCat.style.color = "#888";
          spanCat.style.fontSize = "0.9em";
          spanCat.textContent = "No disponible";
          tdCatalogo.appendChild(spanCat);
        }
        tr.appendChild(tdCatalogo);

        // Columna Metadato
        var tdMetadato = document.createElement("td");
        tdMetadato.style.textAlign = "center";
        if (item.Metadato) {
          tdMetadato.innerHTML =
            '<a href="' + item.Metadato + '" target="_blank">' +
              '<img src="https://cdn-icons-png.freepik.com/256/10868/10868143.png" alt="Metadato" style="width:60%;">' +
            '</a>';
        } else {
          var spanMeta = document.createElement("span");
          spanMeta.style.color = "#888";
          spanMeta.style.fontSize = "0.9em";
          spanMeta.textContent = "No disponible";
          tdMetadato.appendChild(spanMeta);
        }
        tr.appendChild(tdMetadato);

        // Columna Salida gráfica
        var tdSalida = document.createElement("td");
        tdSalida.style.textAlign = "center";
        if (item.SalidaGrafica) {
          tdSalida.innerHTML =
            '<a href="' + item.SalidaGrafica + '" target="_blank">' +
              '<img src="https://cdn-icons-png.freepik.com/256/5320/5320547.png" alt="Salida gráfica" style="width:70%;">' +
            '</a>';
        } else {
          var spanSal = document.createElement("span");
          spanSal.style.color = "#888";
          spanSal.style.fontSize = "0.9em";
          spanSal.textContent = "No disponible";
          tdSalida.appendChild(spanSal);
        }
        tr.appendChild(tdSalida);

        // Agregar la fila al cuerpo de la tabla
        tbody.appendChild(tr);
      });

      // Inicializar DataTables para paginación, filtros y traducción al español
      $('#tabla-cobertura-table').DataTable({
        language: {
          url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
        },
        paging: true,
        searching: true,
        info: true,
        order: [] // Sin orden inicial
      });
    }
  });

  /**
   * Crea un dropdown a partir de un array de opciones.
   * Si no hay opciones, devuelve un letrero “No disponible”.
   */
  function createDropdownFromArray(options, buttonLabel) {
    var container = document.createElement("div");
    container.style.textAlign = "center";

    if (!options || options.length === 0) {
      var span = document.createElement("span");
      span.style.color = "#888";
      span.style.fontSize = "0.9em";
      span.textContent = "No disponible";
      container.appendChild(span);
      return container;
    }

    var button = document.createElement("button");
    button.className = "btn btn-default dropdown-toggle";
    button.setAttribute("data-toggle", "dropdown");
    button.innerHTML = buttonLabel + ' <span class="caret"></span>';
    container.appendChild(button);

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

    container.appendChild(ul);

    button.addEventListener("click", function(event) {
      event.stopPropagation();
      closeAllDropdowns();
      ul.style.display = (ul.style.display === "block") ? "none" : "block";
    });

    return container;
  }

  // Cierra todos los dropdowns abiertos
  function closeAllDropdowns() {
    document.querySelectorAll(".dropdown-menu").forEach(function(menu) {
      menu.style.display = "none";
    });
  }

  // Al hacer clic fuera de un dropdown, cerrarlos
  document.addEventListener("click", closeAllDropdowns);
});