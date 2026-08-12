// js/auth.js
// Lógica para manejar el inicio de sesión en Club del Dinero

async function iniciarSesion(event) {
    if (event) event.preventDefault();

    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    // Llamada oficial a Supabase Auth para iniciar sesión
    const { data, error } = await db.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("❌ Error al iniciar sesión: " + error.message);
        return false;
    }

    alert("✅ ¡Bienvenido Admin!");
    // Redirigir o cambiar de vista a la Bóveda principal
    window.location.href = "dashboard.html";
    return true;
}
