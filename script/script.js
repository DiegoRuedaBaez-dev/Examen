// Función para buscar coincidencias de ADN
async function searchDNA() {
    const searchCode = document.getElementById("searchCode").value;
    const response = await fetch(`http://localhost:3001/ciudadanos`);
    const data = await response.json();
  
    const matches = [];
  
    // Calcular la similitud de cada muestra en la base de datos con el código de búsqueda
    data.forEach(entry => {
      const similarity = calculateSimilarity(entry.codigo_adn, searchCode);
      matches.push({ name: entry.nombre_completo, similarity: similarity });
    });
  
    // Ordenar las coincidencias por similitud (de mayor a menor)
    matches.sort((a, b) => b.similarity - a.similarity);
  
    // Mostrar los primeros 5 resultados en orden ascendente de mayor coincidencia
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = "";
    for (let i = 0; i < Math.min(5, matches.length); i++) {
      const listItem = document.createElement("li");
      listItem.textContent = `${matches[i].name} - Similitud: ${matches[i].similarity}%`;
      resultsList.appendChild(listItem);
    }
}
//Calcular la similitud de la base de datos de ADNs
function calculateSimilarity(code1, code2) {
    let matches = 0;
    for (let i = 0; i < code1.length; i++) {
      if (code1[i] === code2[i]) {
        matches++;
      }
    }
    return (matches / code1.length) * 100;
}
  
async function registerDNA(citizenName, dnaCode,citizenAddress,citizenPhone) {
    const response = await fetch(`http://localhost:3001/ciudadanos`);
    const data = await response.json();
  
    // Verificar si el código de ADN ya existe en la base de datos
    if (data.some(entry => entry.codigo_adn === dnaCode)) {
      alert("Error: Este código de ADN ya está registrado.");
      return;
    }
  
    // Agregar nueva entrada a la base de datos
    const newData = { nombre_completo: citizenName, direccion: citizenAddress,celular:citizenPhone, codigo_adn: dnaCode };
    await fetch(`http://localhost:3001/ciudadanos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });
  
    alert("Muestra de ADN registrada con éxito.");
}
  
  // Event listener para el formulario de registro de ADN
document.getElementById("dnaForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const citizenName = document.getElementById("citizenName").value;
    const dnaCode = document.getElementById("dnaCode").value;
    const citizenAddress = document.getElementById("citizenAddress").value;
    const citizenPhone = document.getElementById("citizenPhone").value;
    registerDNA(citizenName,dnaCode,citizenAddress,citizenPhone);
});

function hideAllSections() {
  var containerElements = document.getElementsByClassName('container');

  for (var i = 0; i < containerElements.length; i++) {
      var sections = containerElements[i].children;

      for (var j = 0; j < sections.length; j++) {
          sections[j].style.display = 'none';
      }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  hideAllSections();
});


function showSection(sectionId) {
  hideAllSections();
  var section = document.getElementById(sectionId);
  if (section) {
      section.style.display = 'block';
}
}

document.addEventListener('DOMContentLoaded', function () {
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function (event) {
          event.preventDefault();
          var sectionId = this.getAttribute('href').substring(1); 
          showSection(sectionId);
      });
  }
});