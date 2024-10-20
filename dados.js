// Definimos variables para almacenar el nombre del usuario, el número elegido y el número de intentos
let nombreUsuario;
let numeroElegido;
let intentos = [];
let intentosRealizados = 0;

// Función para iniciar el juego (cuando cambian el número o el nombre)
function iniciarJuego() {
    // Obtenemos el nombre y el número introducido por el usuario
    nombreUsuario = document.getElementById('nombre').value;
    numeroElegido = parseInt(document.getElementById('numero').value);
    
    // Validamos que el nombre no esté vacío y que el número esté entre 1 y 6
    if (!nombreUsuario || isNaN(numeroElegido) || numeroElegido < 1 || numeroElegido > 6) {
        alert('Por favor, introduce un nombre y un número válido entre 1 y 6.');
        return;
    }

    // Reiniciamos los intentos y el contador
    intentos = [];
    intentosRealizados = 0;
    
    // Limpiamos los resultados anteriores
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('intentos').innerHTML = '';
}

// Función para simular el lanzamiento del dado
function lanzarDado() {
    // Comprobamos que el nombre y número están definidos correctamente
    if (!nombreUsuario || isNaN(numeroElegido) || numeroElegido < 1 || numeroElegido > 6) {
        alert('Por favor, introduce un nombre y un número válido entre 1 y 6.');
        return;
    }
    
    // Generamos un número aleatorio entre 1 y 6 para simular el lanzamiento del dado
    const numeroLanzado = Math.floor(Math.random() * 6) + 1;
    
    // Aumentamos el contador de intentos
    intentosRealizados++;

    // Guardamos el número lanzado en el array de intentos
    intentos.push(numeroLanzado);

    // Mostramos el intento actual en la lista de intentos
    mostrarIntento(numeroLanzado, intentosRealizados);

    // Si el número lanzado coincide con el elegido, mostramos el resultado final
    if (numeroLanzado === numeroElegido) {
        mostrarResultado();
    }
}

// Función para mostrar cada intento en la lista
function mostrarIntento(numeroLanzado, intentoNumero) {
  const listaIntentos = document.getElementById('intentos');
  const li = document.createElement('li');
  li.textContent = `Intento ${intentoNumero}: ${numeroLanzado}`;
  
  // Cambiamos el color dependiendo de si coincide con el número elegido
  if (numeroLanzado === numeroElegido) {
      li.classList.add('green'); // Color verde si coincide
  } else {
      li.classList.add('red'); // Color rojo si no coincide
  }

  // Añadimos la imagen correspondiente al intento
  const img = document.createElement('img');
  img.src = `imagen/${numeroLanzado}.png`; // Asumimos que las imágenes están nombradas del 1 al 6
  img.alt = `Cara del dado ${numeroLanzado}`;
  li.appendChild(img);

  // Insertamos el nuevo intento al principio de la lista
  if (listaIntentos.firstChild) {
      listaIntentos.insertBefore(li, listaIntentos.firstChild);
  } else {
      listaIntentos.appendChild(li);
  }
}



// Función para mostrar el resultado final
function mostrarResultado() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `¡Enhorabuena, ${nombreUsuario}! Has elegido el número ${numeroElegido} y lo has conseguido en ${intentosRealizados} intentos.`;
}

// Añadimos el evento de clic al botón para que el juego se reinicie cada vez que se lanza el dado
document.getElementById('lanzar').addEventListener('click', () => {
    if (intentosRealizados === 0) {
        iniciarJuego(); // Iniciamos el juego solo si es el primer lanzamiento
    }
    lanzarDado(); // Lanzamos el dado
});
