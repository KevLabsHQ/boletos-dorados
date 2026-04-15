// CONFIGURACIÓN DE SUPABASE
const SB_URL = 'https://usvqfxhryavwkobwuomo.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzdnFmeGhyeWF2d2tvYnd1b21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxOTU0NzUsImV4cCI6MjA5MTc3MTQ3NX0.AjI5Dkw9UHed_b2gwloVCXx5guu8Rzzm-5TD8WhLuVU';

let db;

// Esperar a que la librería cargue para inicializar
window.addEventListener('load', () => {
    if (window.supabase) {
        db = window.supabase.createClient(SB_URL, SB_KEY);
        console.log("Conexión con Supabase lista");
    }
});

// Lógica de navegación
window.mostrarSeccion = function(nombre) {
    const inicio = document.getElementById('seccion-inicio');
    const canjear = document.getElementById('seccion-canjear');

    if (nombre === 'inicio') {
        inicio.classList.remove('hidden');
        canjear.classList.add('hidden');
    } else {
        inicio.classList.add('hidden');
        canjear.classList.remove('hidden');
    }
}

// Validación
window.validar = async function() {
    const codigoInput = document.getElementById('input-codigo').value.trim();
    
    if (codigoInput === "") {
        alert("Por favor, escribe un código primero.");
        return;
    }

    if (!db) return alert("Error: No se pudo conectar a la base de datos.");

    const { data, error } = await db
        .from('boletos')
        .select('*')
        .eq('codigo', codigoInput)
        .single();

    if (error || !data) {
        alert("Código no válido o ya usado.");
    } else {
        alert(`Código reclamado: ${data.premio}`);
    }
}