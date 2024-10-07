function mostrarSaludo() {
    const saludoElement = document.getElementById("saludo");
    const imagenElement = document.getElementById("saludo-imagen");
    const horaActual = new Date().getHours();
    let saludo;
    let imagenUrl;

    // Definir saludo e imagen según la hora
    if (horaActual >= 6 && horaActual < 12)
         {
        saludo = "Buenos días";
        imagenUrl ="https://i.pinimg.com/564x/22/85/f3/2285f384f94a5557fe83fcac0ff8161d.jpg"; 
    } else if (horaActual >= 12 && horaActual < 18) {
        saludo = "Buenas tardes";
        imagenUrl = "https://i.pinimg.com/564x/be/45/67/be45675469a95f39c07616bd188aa185.jpg"; 
    } else {
        saludo = "Buenas noches";
        imagenUrl = "https://i.pinimg.com/564x/5d/9e/41/5d9e4180fdfa967169eb4c2b62b2ba96.jpg"; 
    }

    // Mostrar saludo e imagen
    saludoElement.textContent = saludo;
    imagenElement.src = imagenUrl;
}

function mostrarHoraActual() {
    const horaElement = document.getElementById("hora-actual");
    const ahora = new Date(); // Obtener la fecha y hora actual

    // Obtener las horas, minutos y segundos
    let horas = ahora.getHours();
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    
    // Determinar si es AM o PM
    const ampm = horas >= 12 ? 'PM' : 'AM';
    
    // Convertir la hora al formato 12 horas
    horas = horas % 12;
    horas = horas ? horas : 12; // Si la hora es 0, cambiarla a 12

    // Mostrar la hora actual en formato 12 horas HH:MM:SS AM/PM
    horaElement.textContent = `Hora actual: ${horas}:${minutos}:${segundos} ${ampm}`;
}

// Actualizar la hora cada segundo
setInterval(mostrarHoraActual, 1000);

// Llamar a la función para mostrar la hora al cargar la página
mostrarHoraActual();



// Llamar a la función cuando se carga la página
mostrarSaludo();