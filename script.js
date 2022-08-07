const container = document.querySelector(".container");
const preloader = document.querySelector(".preloader");
const searchBtn = document.querySelector(".search_btn");
const searchBar = document.querySelector(".search_box");

let click = new Audio("./src/click.mp3");
let audio = new Audio("./src/sound1.mp3");
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
  if (e.target.closest(".box")) {
    if (prev != e.target.closest(".box")) {
      hover.play();
      prev = e.target.closest(".box");
    }
  }
});
const render = (countries) => {
  countries = countries.sort((a, b) =>
    a.name.common > b.name.common ? 1 : b.name.common > a.name.common ? -1 : 0
  );
  let allElm = "";
  container.innerHTML = "";
  countries.forEach((data) => {
    const html = `<a href="./coutnry.html?name=${data.name.common}" class="box">
    <div class="top_design"></div>
    <div class="img_box"><img src="${data.flags.png}" alt=""></div>
    <div class="details">
    <div class="name">${data.name.common}</div>
    <div class="capital">
    <label>Capital -</label>
    <span class="capital_name">${data.capital}</span>
        </div>
        <div class="continents">
            <label>Continents -</label>
            <span class="continents_name">${data.continents[0]}</span>
        </div>
        <div class="population">
            <label>Population -</label>
            <span class="population_name">${(
              data.population / 10000000
            ).toFixed(4)}CR</span>
            </div>
            </div>
    </a>`;
    allElm += html;
  });
  container.innerHTML += allElm;
  preloader.classList.add("hide");
};
const getCourntryByname = (name) => {
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status == 404) {
        alert("no country found");
        searchBar.value = "";
        getAll();
        return;
      }
      click.play();
      render(data);
    })
    .catch((err) => {
      alert(err.message);
    });
};
const getAll = () => {
  fetch(`https://restcountries.com/v3.1/all`)
    .then((res) => res.json())
    .then((data) => {
      audio.play();
      render(data);
    })
    .catch((err) => {
      alert(err.message);
    });
};
getAll();

searchBtn.addEventListener("click", () => {
  let value = searchBar.value;
  if (value.trim() == "") {
    container.innerHTML = "";
    preloader.classList.remove("hide");
    getAll();
  } else {
    container.innerHTML = "";
    preloader.classList.remove("hide");
    getCourntryByname(value);
  }
});
