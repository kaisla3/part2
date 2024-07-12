import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_SOME_KEY
  useEffect(() => {
    console.log('effect run, fetching weather')
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  }, [capital])

  if(!weather) {
    return null
  } else {
    console.log(`weather in ${capital} is now ${weather.weather[0].description}`)
    console.log(weather)
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <div>Temperature: {weather.main.temp} Celcius</div>
        <div><img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} /></div>
        <div>Wind: {weather.wind.speed} m/s</div>
      </div>
    )
  }
}

const Country = ({country}) => {
  return (<div>
    <h1>{country.name.common}</h1>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <div><p><b>languages:</b></p></div>
    <ul>
      {Object.values(country.languages).map(language => 
        <li key={language}>{language}</li>
        )}
    </ul>
    <div><img src={country.flags.png} /></div>
    <Weather capital={country.capital} />
  </div>)
}

const CountryList = ({country, onClick, shownCountries, selectedCountry}) => {
  if(shownCountries.length <= 10 && !selectedCountry) {
    return (
      <div key={country}>{country} 
      <button onClick={onClick}>show</button>
      </div>
    )
  }
}

const Countries = ({country, value, shownCountries}) => {
  if (shownCountries.length > 10 && value.length > 0 && !country){
    return (
    <div>Too many matches, specify another filter</div>)
  } else if (country) {
      console.log(`country is now ${country.name.common}`)
      console.log(country)
      return (
      <div>
        <Country country={country} />
      </div>
      )
  }
}

const App = () => {
  const [value, setValue] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countries, setCountries] = useState([])


  useEffect(() => {
    console.log('effect run, fetching countries')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
    setSelectedCountry(null)
    console.log(`country is now ${selectedCountry}`)
  }

  const allCountries = countries

  const countriesToShow = () => {
    const countryList = allCountries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))
    if(countryList.length === 1 && selectedCountry !== countryList[0]) {
      setSelectedCountry(countryList[0])
    }
      return(countryList)
  }

  return (
    <div>
        find countries<input value={value} onChange={handleChange} />
        {countriesToShow().map(country => 
          <CountryList 
            key={country.name.common} 
            country={country.name.common} 
            onClick={() => setSelectedCountry(country)} 
            shownCountries={countriesToShow()} 
            selectedCountry={selectedCountry}/>
        )}
        <Countries 
          country={selectedCountry} 
          value={value} 
          shownCountries={countriesToShow()}/>
    </div>
  )
}

export default App
