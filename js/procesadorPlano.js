// js/procesadorPlano.js

async function cargarSaldosBoveda() {
    // Verificamos si el elemento existe antes de intentar escribir en él
    const contenedor = document.getElementById("contenedorSaldos");
    
    if (!contenedor) {
        console.warn("El elemento 'contenedorSaldos' no se encontró en la página.");
        return;
    }

    contenedor.innerHTML = "Cargando saldos...";

    const { data, error } = await db
        .from('perfiles')
        .select('alias, saldo_disponible');

    if (error) {
        contenedor.innerHTML = "❌ Error al cargar saldos: " + error.message;
        return;
    }

    let html = "<table><tr><th>Jugador</th><th>Saldo</th></tr>";
    data.forEach(item => {
        html += `<tr><td>${item.alias}</td><td>$${item.saldo_disponible}</td></tr>`;
    });
    html += "</table>";
    
    contenedor.innerHTML = html;
}
