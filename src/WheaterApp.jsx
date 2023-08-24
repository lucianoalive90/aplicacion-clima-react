import { useState } from "react"

export const WheaterApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '84fb8afa8b557ff2b55ebcba1ebe6676'
    const difKelvin = 271.15

    const [ciudad, setciudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setciudad(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(ciudad.length >0) fetchClima()
    }

    const fetchClima = async() =>{
        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
        } catch{
            console.error('Ocurrio el siguiente problema: ', error)
        }
    }

    return (
        <div className="container">
            <h1>Aplicación de Clima</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" value={ciudad} onChange={handleCambioCiudad} />
                <button type="submit">Buscar</button>
            </form>
            {
                dataClima && (
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima?.main?.temp-difKelvin)}°C</p>
                        <p>Condicion Meteologica: {dataClima.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
                    </div>
                )
            }
        </div>
    )
}
