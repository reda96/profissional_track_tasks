/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
const apiKey = "73894593384057bad94a70083847d6f2";

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// api.openweathermap.org/data/2.5/weather?q=London&appid={API key}

const fetchWeather = async (url, apiKey) => {
  let response = await fetch(url + apiKey);
  let data = await response.json();
  console.log(data);
  return data;
};

// an asynchronous function to fetch the data from the app endpoint
const fetchData = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

// add an entry to the project endpoint using a POST route take two arguments, the URL to make a POST to, and an object holding the data to POST.
const postData = async (url = "", data = {}) => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
};

const clickHandler = () => {
  postData("http://localhost:3000/weather", {
    zipCode: document.getElementById("zip").value,
    feelings: document.getElementById("feelings").value,
  }).then((result) => {
    fetchWeather(
      `http://api.openweathermap.org/data/2.5/weather?zip=${
        document.getElementById("zip").value
      }&appid=`,
      apiKey
    ).then((weather) => {
      fetchData("http://localhost:3000/weather").then((data) => {
        document.getElementById("date").textContent = new Date();
        document.getElementById("temp").textContent = weather.main.temp;
        document.getElementById("content").textContent = data.pop().feelings;
      });
    });
  });
};

document.getElementById("generate").addEventListener("click", clickHandler);
