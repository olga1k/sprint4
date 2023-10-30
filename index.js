"use strict";
//setup link https://www.digitalocean.com/community/tutorials/typescript-new-project
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const forecast = document.querySelector(".forecast");
const btnNext = document.querySelector("#btn--next");
const btn1 = document.querySelector("#emoj-1");
const btn2 = document.querySelector("#emoj-2");
const btn3 = document.querySelector("#emoj-3");
btn1 === null || btn1 === void 0 ? void 0 : btn1.addEventListener("click", () => giveScore(1));
btn2 === null || btn2 === void 0 ? void 0 : btn2.addEventListener("click", () => giveScore(2));
btn3 === null || btn3 === void 0 ? void 0 : btn3.addEventListener("click", () => giveScore(3));
const jokeCard = document.querySelector("#joke--card");
let jokeText = document.querySelector("#joke--text");
btnNext === null || btnNext === void 0 ? void 0 : btnNext.addEventListener("click", nextJoke);
//array to store the jokes
let newJoke;
let reportJokes = [];
let userScore;
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://icanhazdadjoke.com/", {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        const data = yield response.json();
        jokeText.innerHTML = data.joke;
        newJoke = data.joke;
    });
}
getJoke();
function getJokeChuck() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://api.chucknorris.io/jokes/random", {
            method: "GET",
        });
        const data = yield response.json();
        jokeText.innerHTML = data.value;
        newJoke = data.value;
    });
}
function giveScore(score) {
    userScore = score;
    return score;
}
let swapApi = 0;
function nextJoke() {
    let jokeObject = {
        joke: "",
        score: 0,
        date: ""
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
    }
    else {
        getJokeChuck();
    }
    return reportJokes;
}
//WEATHER open-meteo
function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://api.open-meteo.com/v1/forecast?latitude=41.3&longitude=2.159997&current=temperature_2m,is_day,precipitation");
        const dataWeather = yield response.json();
        const currentTemp = dataWeather.current.temperature_2m;
        const dayNight = dataWeather.current.is_day;
        const precipitation = dataWeather.current.precipitation;
        forecast.innerHTML = `${dayNight !== 1
            ? "<img src=images/moon.png>"
            : precipitation > 30
                ? "<img src=images/rain.png>"
                : "<img src=images/sun.png>"} | ${currentTemp}° C`;
    });
}
getWeather();
