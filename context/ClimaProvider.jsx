import { useState, createContext } from 'react';

const ClimaContext = createContext();

const ClimaProvider = ({ children }) => {
    const [busqueda, setBusqueda] = useState({
        ciudad: '',
        pais: '',
    });
    const [clima, setClima] = useState({});
    const [cargando, setCargando] = useState(false);
    const [noResultado, setNoResultado] = useState('');

    const datosBusqueda = (e) => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value,
        });
    };

    const consultarClima = async (datos) => {
        setCargando(true);
        setNoResultado(false);
        try {
            const { ciudad, pais } = datos;

            const appId = import.meta.env.VITE_API_KEY;
            // Latitud y Longitud
            const urlLatLon = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`;
            const pedidoLatitudLongitud = await fetch(urlLatLon);
            const resultadoLatitudLongitud = await pedidoLatitudLongitud.json();
            const { lat, lon } = resultadoLatitudLongitud[0];

            // Clima
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
            const pedidoClima = await fetch(urlClima);
            const resultadoClima = await pedidoClima.json();

            setClima(resultadoClima);
        } catch (error) {
            setNoResultado('No hay resultados');
        } finally {
            setCargando(false);
        }
    };

    return clima ? (
        <ClimaContext.Provider
            value={{
                busqueda,
                datosBusqueda,
                consultarClima,
                clima,
                setClima,
                cargando,
                noResultado,
            }}
        >
            {children}
        </ClimaContext.Provider>
    ) : null;
};

export { ClimaProvider };

export default ClimaContext;
