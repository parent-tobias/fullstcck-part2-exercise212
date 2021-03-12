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

    const filteredList =  countries.filter(({name, altSpellings}) =>
                          name.toLowerCase().includes(search.toLowerCase() )||
                          altSpellings.some(spelling=>spelling.toLowerCase().includes(search.toLowerCase() ))
  ) 
  console.log(filteredList.length, filteredList);
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
      {search ? filteredCountries.length > 1 ? (
      <div>
        <h2>Filtered list (filtered by {search} )</h2>
        <div className='country-listing'>
          {filteredCountries.length > 10 
                    ? `Too many to list, please enter/continue a search term.` 
                    : filteredCountries.map(country=>(<div>{country.name}</div>))}
        </div>
      </div>
      ) : filteredCountries.length === 0 ? (
        <div className='country-listing'>
          <div>No Matching Countries found.</div>
        </div>
        ) : (
          <div className='country-detail'>
            <div>
              <h3>{filteredCountries[0].name}</h3>
              <figure>
                <img src={filteredCountries[0].flag} alt='The country flag' />
                <figcaption>{filteredCountries[0].name}</figcaption>
              </figure>
              <div>
                <span><strong>Capital:</strong> {filteredCountries[0].capital}</span>
                <div>
                  <h4>Languages Spoken:</h4>
                  {filteredCountries[0].languages.map(language=>(<div>{language.name}</div>))}
                </div>
              </div>
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