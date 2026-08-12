// js/procesadorPlano.js
// Cerebro para leer el plano, validar saldos en Supabase y descontar automáticamente

async function procesarPlanoYDescontar(resumenJugadores) {
    for (let item of resumenJugadores) {
        const aliasJugador = item.alias;
        const montoTotal = item.totalJugado;

        // A. Consultar el saldo actual del jugador en Supabase
        const { data: perfil, error: errorPerfil } = await db
            .from('perfiles')
            .select('id, saldo_disponible')
            .eq('alias', aliasJugador)
            .single();

        if (errorPerfil || !perfil) {
            console.error(`No se encontró el perfil para: ${aliasJugador}`);
            continue;
        }

        // B. Validar si el saldo es suficiente
        if (perfil.saldo_disponible < montoTotal) {
            alert(`❌ El usuario ${aliasJugador} no tiene suficiente saldo. Saldo actual: $${perfil.saldo_disponible}, Total jugada: $${montoTotal}`);
            continue;
        }

        // C. Calcular el nuevo saldo
        const nuevoSaldo = perfil.saldo_disponible - montoTotal;

        // D. Actualizar el saldo automáticamente en la base de datos de Supabase
        const { error: errorUpdate } = await db
            .from('perfiles')
            .update({ saldo_disponible: nuevoSaldo })
            .eq('id', perfil.id);

        if (errorUpdate) {
            console.error(`Error al descontar saldo a ${aliasJugador}:`, errorUpdate.message);
        } else {
            console.log(`✅ Descuento exitoso para ${aliasJugador}. Nuevo saldo: $${nuevoSaldo}`);
        }
    }

    alert("¡Plano procesado y saldos descontados en la Bóveda exitosamente!");
}
// js/procesadorPlano.js (añadir al final)

async function cargarSaldosBoveda() {
    const contenedor = document.getElementById("contenedorSaldos");
    contenedor.innerHTML = "Cargando saldos...";

    // Consultar todos los perfiles de la base de datos
    const { data, error } = await db
        .from('perfiles')
        .select('alias, saldo_disponible');

    if (error) {
        contenedor.innerHTML = "❌ Error al cargar saldos.";
        return;
    }

    // Crear la tabla de saldos
    let html = "<table><tr><th>Jugador</th><th>Saldo</th></tr>";
    data.forEach(item => {
        html += `<tr><td>${item.alias}</td><td>$${item.saldo_disponible}</td></tr>`;
    });
    html += "</table>";
    
    contenedor.innerHTML = html;
}
