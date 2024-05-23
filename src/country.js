const flag = document.querySelector(".flag");
const coatOfArms = document.querySelector(".coat_arms");
const mapLink = document.querySelector(".map .title");
const time = document.querySelector(".time .live_time");
const altSpeling = document.querySelector(".alt_speling .value");
const area = document.querySelector(".area .value");
const borders = document.querySelector(".borders .value");
const capital = document.querySelector(".capital .value");
const continent = document.querySelector(".continent .value");
const population = document.querySelector(".population .value");
const independent = document.querySelector(".independent .value");
const lang = document.querySelector(".lang .value");
const car = document.querySelector(".car .value");
const container = document.querySelector(".content")
const preloader = document.querySelector(".preloader");

const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");
document.title = countryName;

const intro = new Audio("./../src/intro.mp3");

const render = ([country]) => {
  flag.querySelector("img").src = country?.flags?.png;
  flag.querySelector(".title").textContent ="flag of "+ country?.name.common;
  coatOfArms.querySelector("img").src = country?.coatOfArms?.png;
  mapLink.href = country.maps?.googleMaps || country.maps?.openStreetMaps;
  let offset = country.timezones[0].replace('UTC','').replace(':','.');
  offset = +offset
  if(offset>+(offset.toFixed())){
    offset = '+'+offset.toFixed()+'.50';
  }
  setInterval(()=>{
    let date = calcTime(offset)
    date = date.slice(date.indexOf(',')).trim();
    date = date.replace(",","")
    time.innerHTML= date;
  },1000)
  console.log(country);

  altSpeling.innerHTML = country.altSpellings.join(", ")
  area.innerHTML = country?.area + " KM<sup>2</sup>";
  borders.innerHTML = country?.borders?.join(", ") == undefined?"":country?.borders?.join(", ");
  capital.textContent = country?.capital?.join(", ") == undefined?"":country?.capital?.join(", ");
  continent.textContent = country?.continents?.join(", ") == undefined?"":country?.continents?.join(", ");
  car.textContent = country.car.side  || "";
  population.textContent = country.population  || "";
  independent.textContent = country.independent == true ? "Yes" : "No";
  let languages = '';
  for (const key in country?.languages) {
      const element = country?.languages[key];
      languages += element + ', ';
  }
  lang.textContent = languages;

  preloader.classList.add("hide");
  intro.play();
};

const getCourntryByname = (name) => {
  fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    .then((res) => res.json())
    .then((data) => {
      render(data);
    });

};
getCourntryByname(countryName);

function calcTime(offset) {
  var d = new Date();
  var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  var nd = new Date(utc + (3600000*offset));
  return nd.toLocaleString();
}


// sounds
let click = new Audio("./src/click.mp3");
document.addEventListener("click", () => {
  click.play();
});
document.addEventListener("keydown", () => {
  var press = new Audio("./src/press1.mp3");
  press.play();
});
let prev;
container.addEventListener("mouseover", (e) => {
  let hover = new Audio("./src/hover.mp3");
  if (e.target.closest(".info")) {
    if(prev != e.target.closest(".info")){
      hover.play();
      prev = e.target.closest(".info");
    }
  }
});