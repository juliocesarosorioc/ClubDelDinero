// js/supabaseClient.js
// Conexión oficial con Supabase para Club del Dinero

// js/supabaseClient.js
const SUPABASE_URL = "https://ogizwiesmscpibwhsaks.supabase.co";
const SUPABASE_KEY = "sb_publishable_RJlqpIuWl7GrkN_cUsUTJQ_D8HMqj2P";

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
