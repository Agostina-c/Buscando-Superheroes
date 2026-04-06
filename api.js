import { BASE_URL } from './config.js';

export const obtenerDetalles = async (id) => {
     try {
         const response = await fetch(`${BASE_URL}/${id}`);
         const datos = await response.json();
         if(datos.response==="error"){
            console.error("error de la api:", datos.error);
            return null;
        }
        return datos;
    } catch (error) {
        console.error("Hubo un fallo:", error);
        return null;
    }
}
export const buscarPersonajes = async (nombre) => {
    try {
        const response = await fetch(`${BASE_URL}/search/${nombre}`);
        if (!response.ok) {
            throw new Error("Error al conectar con la API");
        }
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Hubo un fallo:", error);
        return [];
    }
};