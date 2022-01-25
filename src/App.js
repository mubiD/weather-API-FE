import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// the variable below holds the object api containing the api key and the base key along with their values
const api = {
    key: "522ac2d49731820402545af15b8c8e97",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {


  // here we are initializing react useState hooks to manage state changes
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  // the code block below contains the logic and function that fetches the data from the openweather api
  const search = (e) => {
    // the line below initializes an if statement to check if the enter button was used within the search bar
    if (e.key === 'Enter') {
      // the line below fetches the data from the openweather 
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      // a promise is returned. the result is then passed onto res.json
      .then(res => res.json())
      // which in turn brings another promise that delivers the results of the fetch/get request
      .then (result => {
        // the result is then stored in state using the already initialized hooks
        setWeather(result);
        setQuery('');
        // e.preventDefault();
        // console.log(result);
      });
    }
  }

  // the code block below dynamically calculates the current date and returns the different variables
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
                      // here we create an onChange event that takes in the event and sets its value to state using the useState hook that we initialised as setQuery
                      onChange = {e => setQuery(e.target.value)}
                      value={query}
                      onKeyPress={search}
                      />
                </div>
                {/* the code below is wrapped in an if statement which will only render the data if the fetch/get request is successful ie)weather.main has a value */}
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
                        {/* we round the temp up because the openweatherapi returns a decimal value which isnt user friendly */}
                        {/* we also access the relevant returned data and display it using JSX */}
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
