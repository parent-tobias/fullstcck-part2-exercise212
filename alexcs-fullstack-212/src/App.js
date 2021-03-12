import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
// import Filter from './components/Filter';
// import DisplayCountries from './components/DisplayCountries';

function App() {
  const [ countries, setCountries ] = useState([])
  const [filteredCountries, setFilteredCountries ] = useState([]);
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
        setFilteredCountries(response.data);
      })
  }, [])

  useEffect(() => {
    console.log(`Search term changed, ${search}`)
    // axios
    //   .get(`https://restcountries.eu/rest/v2/name/${search}`)
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     console.log(response.data)
    //     setCountries(response.data)
    //   })
    const filteredList =  countries.filter(({name, altSpellings}) =>
                          name.toLowerCase().includes(search.toLowerCase() )||
                          altSpellings.some(spelling=>spelling.toLowerCase().includes(search.toLowerCase() ))
  ) 
    setFilteredCountries( filteredList )
  }, [search,countries])

  const handleOnChange = (event) => {
    setSearch(event.target.value)
  }
  
  // const filterCountries = countries.filter(country => country.name.toLowerCase().includes( search.toLowerCase() )).map(filteredCountries => (
  //   <div>{filteredCountries.name}</div>
  // ))
  // console.log(filterCountries);
  // // const displayCountries = filterCountries.map((country, index) => <div key={index}>{country.name}</div>)

  return (
    <div className="app">
      <div>
        <input
          placeholder="type in a country"
          onChange={(event) => {handleOnChange(event)}}
        />
      </div>
      {search ? (
      <div>
        <h2>Filtered list (filtered by {search} )</h2>
        <div className='country-listing'>
          {filteredCountries.length > 10 
                    ? `Too many to list, please enter/continue a search term.` 
                    : filteredCountries.map(country=>(<div>{country.name}</div>))}
        </div>
      </div>
      ) : (
      <div>
        <h2>All countries</h2>
        <div className='country-listing'>
          { filteredCountries.map(country=>(<div>{country.name}</div>))}
        </div>
      </div>
      )}
    </div>
  );
}

export default App;