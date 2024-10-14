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
    horaElement.textContent = `Hora: ${horas}:${minutos}:${segundos} ${ampm}`;
}

function iniciarContador() {
    const fechaFin = new Date(document.getElementById("fechaFin").textContent);

    function actualizarContador() {
        const ahora = new Date();
        const tiempoRestante = fechaFin - ahora;

        // Calcular días, horas, minutos y segundos restantes
        const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
        const horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

        // Mostrar los resultados en el HTML
        document.getElementById("dias").textContent = dias;
        document.getElementById("horas").textContent = horas;
        document.getElementById("minutos").textContent = minutos;
        document.getElementById("segundos").textContent = segundos;

        // Mostrar mensaje de fin de promoción
        document.getElementById("mensajeFin").textContent = `Válido hasta : ${fechaFin.toLocaleDateString()}`;

        // Si el tiempo se ha acabado, mostrar un mensaje
        if (tiempoRestante < 0) {
            clearInterval(intervalo);
            document.querySelector('.alert').innerHTML = "<strong>¡La promoción ha terminado!</strong>";
        }
    }

    // Actualizar el contador cada segundo
    actualizarContador(); // Llamar a la función para mostrar la cuenta inicial
    const intervalo = setInterval(actualizarContador, 1000); // Actualiza cada segundo
}

// Iniciar el contador al cargar la página
window.onload = iniciarContador;



// Actualizar la hora cada segundo
setInterval(mostrarHoraActual, 1000);

// Llamar a la función para mostrar la hora al cargar la página
mostrarHoraActual();



// Llamar a la función cuando se carga la página
mostrarSaludo();



function abrirModalOrden(producto) {
    // Obtener los detalles del producto
    const nombreProducto = producto.querySelector('.card-title').textContent;
    const precioProducto = producto.querySelector('.precio strong').textContent;

    // Rellenar los detalles en el modal
    document.getElementById("detallesProducto").textContent = `Producto: ${nombreProducto}\nPrecio: ${precioProducto}`;

    // Asignar el evento al botón para enviar la orden
    document.getElementById("btnEnviarOrden").onclick = function() {
        enviarOrden(nombreProducto, precioProducto);
    };

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('ordenModal'));
    modal.show();
}

function enviarOrden(nombreProducto, precioProducto) {
    const nombreCliente = document.getElementById("nombreCliente").value;
    const direccionEnvio = document.getElementById("direccionEnvio").value;

    const mensaje = `Nuevo pedido:\nNombre del Cliente: ${nombreCliente}\nDirección de Envío: ${direccionEnvio}\nProducto: ${nombreProducto}\nPrecio: ${precioProducto}`;
    
    // Aquí reemplaza 'YOUR_PHONE_NUMBER' con el número de teléfono al que deseas enviar el mensaje
    const telefono = '50588237177';
    const apiURL = `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(mensaje)}`;

    // Redirigir a la URL de WhatsApp
    window.open(apiURL, '_blank');

    // Limpiar el modal
    document.getElementById("nombreCliente").value = '';
    document.getElementById("direccionEnvio").value = '';
    
    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('ordenModal'));
    modal.hide();
}

