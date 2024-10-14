function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoLista = document.getElementById('carrito-lista');
    const totalCarrito = document.getElementById('total-carrito');
    
    // Limpiar la lista antes de mostrar
    carritoLista.innerHTML = '';
    let total = 0;

    carrito.forEach(producto => {
        // Crear un elemento de lista para cada producto
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - Subtotal: $${producto.subtotal.toFixed(2)}`;
        
        // Sumar al total
        total += producto.subtotal;

        // Añadir al carrito
        carritoLista.appendChild(li);
    });

    // Mostrar el total en el carrito
    totalCarrito.textContent = `$${total.toFixed(2)}`;
}

// Llamar a la función mostrarCarrito al cargar la página
window.onload = mostrarCarrito;


function vaciarCarrito() {
    // Eliminar el carrito del localStorage
    localStorage.removeItem('carrito');

    // Limpiar la lista de productos en el carrito en la interfaz
    const carritoLista = document.getElementById('carrito-lista');
    carritoLista.innerHTML = '';

    // Actualizar el total en la interfaz
    const totalCarrito = document.getElementById('total-carrito');
    totalCarrito.textContent = '$0.00';

    // Opcional: Notificar al usuario
    alert('El carrito ha sido vaciado.');
}

function enviarCarritoPorWhatsApp() {
    // Obtener el carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    // Construir el mensaje
    let mensaje = 'Carrito de compras:\n\n';
    let total = 0;

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        mensaje += `Producto: ${producto.nombre}\nDescripción: ${producto.descripcion}\nCantidad: ${producto.cantidad}\nPrecio: $${producto.precio}\nSubtotal: $${subtotal.toFixed(2)}\n\n`;
    });

    mensaje += `Total: $${total.toFixed(2)}`;

    // Codificar el mensaje para la URL
    const mensajeCodificado = encodeURIComponent(mensaje);

    // Número de WhatsApp al que enviar el mensaje
    const numeroWhatsApp = '+50588237177'; // Cambia esto por el número real

    // Crear la URL para WhatsApp
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensajeCodificado}`;

    // Abrir la URL en una nueva pestaña
    window.open(urlWhatsApp, '_blank');

    // Vaciar el carrito después de enviar el mensaje
    vaciarCarrito();
}
