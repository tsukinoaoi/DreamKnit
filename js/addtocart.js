function agregarAlCarrito(productElement) {
    // Obtener información del producto
    const card = productElement.closest('.card');
    const nombre = card.querySelector('.card-title').textContent;
    const descripcion = card.querySelector('.card-text').textContent;
    const precio = parseFloat(card.querySelector('.precio').textContent.replace('$', ''));
    const cantidad = parseInt(card.querySelector('.cantidad').value);

    // Calcular subtotal
    const subtotal = precio * cantidad;

    // Crear objeto del producto
    const producto = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        cantidad: cantidad,
        subtotal: subtotal
    };

    // Obtener el carrito actual del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Agregar el producto al carrito
    carrito.push(producto);

    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Opcional: Mostrar el total en la consola
    console.log(carrito);
    alert(`añadido al carrito!`);
}
