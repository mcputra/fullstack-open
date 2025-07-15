import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5";

const getWeather = (lat, lon, apiKey) => {
  const request = axios.get(
    `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
  return request.then((response) => response.data);
};

export default { getWeather };
