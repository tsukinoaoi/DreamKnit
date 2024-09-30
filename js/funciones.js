// Mostrar el cargador durante 5 segundos y simular la barra de progreso
window.addEventListener('load', function() {
    const progressBar = document.getElementById("progress-bar");
    const loadingText = document.getElementById("loading-text");
    const loadingMessages = ["recursos 50%", "recursos 90%", "recursos 100%"];
    let width = 0;
    let messageIndex = 0;

    // Intervalo para cambiar el texto de carga
    const messageInterval = setInterval(function() {
        messageIndex = (messageIndex + 1) % loadingMessages.length; // Cambiar al siguiente mensaje
        loadingText.textContent = loadingMessages[messageIndex];
    }, 1666); // Cambiar cada 1.666 segundos (5 segundos / 3 mensajes)

    // Intervalo para simular la carga
    const progressInterval = setInterval(function() {
        if (width >= 100) {
            clearInterval(progressInterval);
            clearInterval(messageInterval);
            setTimeout(function() {
                // Ocultar el cargador
                document.getElementById("loader").style.display = "none";
                // Mostrar el contenido del body
                document.body.style.display = "block";
            }, 1000); // Esperar un segundo después de alcanzar el 100%
        } else {
            width += 20; // Aumentar la barra en 20% cada intervalo
            progressBar.style.width = width + '%';
            progressBar.setAttribute('aria-valuenow', width);
        }
    }, 100); // Aumentar la barra cada 500 ms (5 segundos / 5 incrementos)
});
