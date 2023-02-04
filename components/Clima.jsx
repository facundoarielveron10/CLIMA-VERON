import useClima from '../hooks/useClima';

export default function Clima() {
    const { clima } = useClima();

    const { name, main } = clima;

    // Grados Kelvin
    const kelvin = 273.15;

    return (
        <div className="contenedor clima">
            <h2>El Clima de {name} es: </h2>

            <p>
                {parseInt(main.temp - kelvin)}
                <span>° C</span>
            </p>
            <div className="temp_min_max">
                <p>
                    Min: {parseInt(main.temp_min - kelvin)}
                    <span>° C</span>
                </p>
                <p>
                    Max: {parseInt(main.temp_max - kelvin)}
                    <span>° C</span>
                </p>
            </div>
        </div>
    );
}
