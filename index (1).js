
const today = document.querySelector(".today"); //TO DELETE
const forecast = document.querySelector("#forecast");
const btnNext = document.querySelector("#btn--next");
const btn1 = document.getElementById("btn-1");
const btn2 = document.querySelector("#btn-2");
const btn3 = document.querySelector("#btn-3");
btn1?.addEventListener("click", () => giveScore(1));
btn2?.addEventListener("click", () => giveScore(2));
btn3?.addEventListener("click", () => giveScore(3));
today.innerHTML = new Date().toISOString();
const jokeCard = document.querySelector("#joke--card");
let jokeText = document.querySelector("#joke--text");
const arrayJokes = []; //do I need it?


btnNext?.addEventListener("click", nextJoke);

/*function check() {
    console.log("check the button")
}*/

/*
class Joke {
    constructor(joke : string,  score : number, date : string) {
        this.joke = joke;
        this.score = score;
        this.date = date;
    }

    getDate() {
        return dateJoke = new Date(0).toISOString()
    }
}*/
let data;
async function getJoke() {
  const response = await fetch("https://icanhazdadjoke.com/", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  data = await response.json();
  console.log(data);
  jokeText.innerHTML = data.joke;
}

getJoke();

async function getJokeChuck() {
  const response = await fetch("https://api.chucknorris.io/jokes/random", {
    method: "GET"});
  const data = await response.json();
  jokeText.innerHTML = data.value;

  console.log("chuck", data);
}
let userScore;

function giveScore(score) {
  userScore = score;
  return score;
}
let reportJokes = [];

const jokeObject = {
  joke: "",
  score: 0,
  date: "",
};
let swapApi = 0;
function nextJoke() {
  jokeObject.joke = data.joke;
  jokeObject.score = parseInt(userScore);
  jokeObject.date = new Date().toISOString();

  console.log("jokeObject", jokeObject);

  reportJokes.push(jokeObject);
  console.log("report", reportJokes)
  swapApi++;
  console.log(swapApi);
  if (swapApi % 2 === 0) {
    getJoke();

  } else {
    getJokeChuck();
  }
}

function myDate() {
  let date1;
  date1 = new Date();
  return console.log(date1);
}
myDate();


//WEATHER

//open-meteo
async function getWeather() {
  const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&current=temperature_2m,is_day,precipitation");
  const dataWeather = await response.json();
  const currentTemp = dataWeather.current.temperature_2m;
  const dayNight = dataWeather.current.is_day;
  const precipitation = dataWeather.current.precipitation;
  forecast.innerHTML = `temperature: ${currentTemp}, it is ${dayNight === 1 ? "day" : "night"}`;
  console.log("dataweather", dataWeather);
  console.log("temp", currentTemp, dayNight);
}

getWeather();