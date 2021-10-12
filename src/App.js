import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const api = {
    key: "522ac2d49731820402545af15b8c8e97",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then (result => {
        setWeather(result);
        setQuery('');
        // e.preventDefault();
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return(
      `${day} ${date} ${month} ${year}`
    )
  }

  return (
    <div className="main">
       <div className=" card bg-light rounded">
                <div className="searchBox">
                      <input 
                      type="text" 
                      className="SearchBar mt-5"
                      placeholder="Enter City Name"
                      onChange = {e => setQuery(e.target.value)}
                      value={query}
                      onKeyPress={search}
                      />
                </div>
                {(typeof weather.main != "undefined")? (
                <div className="card bg-light rounded m-5 text-center" >
                    <div className="locationBox">
                      <h1 className="mt- mb-3">{query}</h1>
                    </div>
                    <div className="dateBox">
                      <p className="text-muted">{dateBuilder(new Date())}</p>
                    </div>
                    <div className="weatherBox d-flex flex-column text-center ">
                      <div className="temp card m-auto my-3 p-3">
                        <p>{Math.round(weather.main.temp)}° Celsius</p>
                      </div>
                      <div className="weather card m-auto my-3 p-3">
                        <p>{weather.weather[0].description}</p>
                      </div>
                    </div>
                </div>
                ) : ('')}
            </div>
    </div>
  );
}

export default App;
