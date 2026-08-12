// js/supabaseClient.js
// Conexión oficial con Supabase para Club del Dinero

const SUPABASE_URL = "https://ogizwiesmscpibwhsaks.supabase.co";
const SUPABASE_KEY = "sb_publishable_RJlqpIuWl7GrkN_cUsUTJQ_D8HMqj2P)";

// Inicializar cliente global de Supabase
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
