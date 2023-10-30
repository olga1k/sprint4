//setup link https://www.digitalocean.com/community/tutorials/typescript-new-project

const forecast = document.querySelector(".forecast");
const btnNext = document.querySelector("#btn--next");
const btn1 = document.querySelector("#emoj-1");
const btn2 = document.querySelector("#emoj-2");
const btn3 = document.querySelector("#emoj-3");
btn1?.addEventListener("click", () => giveScore(1));
btn2?.addEventListener("click", () => giveScore(2));
btn3?.addEventListener("click", () => giveScore(3));
const jokeCard = document.querySelector("#joke--card");
let jokeText = document.querySelector("#joke--text");
btnNext?.addEventListener("click", nextJoke);

//type aliases
type Joke = {joke: string, score: number, date: string};

//array to store the jokes
let newJoke: string;
let reportJokes : Joke[] = [];
let userScore: number;


async function getJoke(): Promise<void> {
  const response = await fetch("https://icanhazdadjoke.com/", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const data = await response.json();
  jokeText!.innerHTML = data.joke;
  newJoke = data.joke;
}

getJoke();

async function getJokeChuck(): Promise<void> {
  const response = await fetch("https://api.chucknorris.io/jokes/random", {
    method: "GET",
  });
  const data = await response.json();
  jokeText!.innerHTML = data.value;
  newJoke = data.value;
}


function giveScore(score: number): number {
  userScore = score;
  return score;
}

let swapApi: number = 0;

function nextJoke() : Joke[] {
  let jokeObject : Joke = {
    joke : "",
    score : 0,
    date : ""
  };

jokeObject.joke = newJoke;
  if (userScore === undefined) {
    userScore = 0;
  }
  jokeObject.score = userScore;
  jokeObject.date = new Date().toISOString().slice(0, 10);
  console.log("jokeObject", jokeObject);
  
  reportJokes.push(jokeObject);
  console.log("report", reportJokes);

  swapApi++;
  if (swapApi % 2 === 0) {
    getJoke();
  } else {
    getJokeChuck();
  }
  return reportJokes;
}
//WEATHER open-meteo
async function getWeather() {
  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=41.3&longitude=2.159997&current=temperature_2m,is_day,precipitation"
  );
  const dataWeather = await response.json();
  const currentTemp = dataWeather.current.temperature_2m;
  const dayNight = dataWeather.current.is_day;
  const precipitation = dataWeather.current.precipitation;
  forecast!.innerHTML = `${
    dayNight !== 1
      ? "<img src=images/moon.png>"
      : precipitation > 30
      ? "<img src=images/rain.png>"
      : "<img src=images/sun.png>"
  } | ${currentTemp}° C`;
  
}

getWeather();
