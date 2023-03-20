import searchQuery from "./components/search-bar/search-bar.js";
import createCharacterCard from "./components/card/card.js";
import paginationNavigator from "./components/nav-pagination/nav-pagination.js";
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
let CharacterID = 1;
let currentPage = 1;
let maxPage;
let maxCharacters;
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

//fetch API Data
async function fetchCharacters(name = "") {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${currentPage}&name=${name}`
  );
  const data = await response.json();
  // const dataString = JSON.parse(data);

  // console.log("currentpage:", currentPage);
  // console.log("currentIndex", CharacterID);
  // const character = data.results[CharacterID - 1];

  maxCharacters = data.info.count;
  maxPage = Math.round(maxCharacters / 20 + 1);
  maxCharacters = (maxCharacters % 20) + 1;
  // console.log("maxPage", maxPage);
  // console.log("maxCharacters", maxCharacters);
  for (let i = 0; i < 19; i++) {
    const occurencies = data.results[i].episode.length;
    createCharacterCard(
      data.results[i].image,
      data.results[i].name,
      data.results[i].status,
      data.results[i].type,
      occurencies
    );
    CharacterID++;
  }
  paginationNavigator(currentPage, maxPage);
  console.log(data.results);
  return data.results;
}
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  removeCharachters();
  console.log("HI");
  fetchCharacters(event.target.elements.item(0).value);
});

fetchCharacters();
nextButton.addEventListener("click", () => {
  removeCharachters();
  currentPage++;

  if (currentPage === maxPage) {
  }
  fetchCharacters();
});
function removeCharachters() {
  cardContainer.innerHTML = "";
}
prevButton.addEventListener("click", () => {
  if (currentPage === 1) {
  } else {
    removeCharachters();
    currentPage--;
    fetchCharacters();
  }
});
