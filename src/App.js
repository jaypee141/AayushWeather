import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
// import { debounce } from "@mui/material";
// import InputBase from '@mui/material/InputBase';

// import SearchIcon from "@mui/material";

export default function App() {
  const [findSearch, setFindSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [weatherData, setWeatherData] = useState({
    city: "",
    region: "",
    country: "",
    pngIcon: "",
    condition: "",
    temp_c: "",
    temp_f: "",
    wind_kph: "",
    humidity: "",
    cloud: "",
    last_updated: "",
  });

  useEffect(() => {
    const setTimer = setTimeout(() => {
      if (query !== "") {
        callAPI(query);
      } else {
        setFindSearch(true);
      }
    }, 800);
    return () => clearTimeout(setTimer);
  }, [query]);

  const callAPI = async (data) => {
    setLoading(true);
    try {
      let response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=a2012864a32b4056a7b114238230212&q=${data}`,
      );
      // console.log(response.data.current.temp_f);
      setFindSearch(false);
      setWeatherData({
        city: response.data.location.name,
        region: response.data.location.region,
        country: response.data.location.country,
        pngIcon: response.data.current.condition.icon,
        condition: response.data.current.condition.text,
        temp_c: response.data.current.temp_c,
        temp_f: response.data.current.temp_f,
        wind_kph: response.data.current.wind_kph,
        humidity: response.data.current.humidity,
        cloud: response.data.current.cloud,
        last_updated: response.data.current.last_updated,
      });
      console.log("response", response);
      // printdata(weatherData);
    } catch (e) {
      console.error(e.meassage);
    } finally {
      setLoading(false);
    }
  };
  // console.log("latestData", findSearch);

  return (
    <>
      <div className="App">
        <nav className="navbar">
          <h3 className="heading">Weather App</h3>
        </nav>
        <input
          className="searchcity"
          type="text"
          placeholder="Search City"
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        {/* {Object.keys(weatherData).length === 0 ? ( */}
        {loading ? (
          <div>Loading...</div>
        ) : findSearch ? (
          <div></div>
        ) : query.toLowerCase() === weatherData.city.toLowerCase() ? (
          <div className="upperDiv">
            <div className="lowerDiv">
              <h3>{`${weatherData.city}, ${weatherData.region},  ${weatherData.country}`}</h3>
            </div>
            <div className="lowerDiv">
              <img src={`${weatherData.pngIcon}`} alt="png" />
            </div>
            <div className="lowerDiv">
              <ul>
                <li> Temperature </li>
                <li>
                  {`${weatherData.temp_c}`}°C/ {`${weatherData.temp_f}`}°F
                </li>
              </ul>
            </div>
            <div className="lowerDiv">
              <ul>
                <li> Condition </li>
                <li>{`${weatherData.condition}`}</li>
              </ul>
            </div>
            <div className="lowerDiv">
              <ul>
                <li> Wind Speed </li>
                <li>{`${weatherData.wind_kph}`}km/h</li>
              </ul>
            </div>
            <div className="lowerDiv">
              <ul>
                <li> Humidity </li>
                <li>{`${weatherData.humidity}`}%</li>
              </ul>
            </div>
            <div className="lowerDiv">
              <ul>
                <li> Cloud Coverage </li>
                <li>{`${weatherData.cloud}`} %</li>
              </ul>
            </div>
            <div className="lowerDiv">
              <ul>
                <li> Last Updated </li>
                <li>{`${weatherData.last_updated}`}</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="locationDiv">
            <h3>No matching location found</h3>
          </div>
        )}
      </div>
    </>
  );
}
