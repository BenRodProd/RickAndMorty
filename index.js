import createCharacterCard from "./components/card/card.js";
import paginationNavigator from "./components/nav-pagination/nav-pagination.js";
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
let CharacterID = 1;
let currentPage = 40;
let maxPage;
let maxCharacters;
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

//fetch API Data
async function fetchCharacters() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${currentPage}`
  );
  const data = await response.json();
  // const dataString = JSON.parse(data);

  console.log("currentpage:", currentPage);
  console.log("currentIndex", CharacterID);
  const character = data.results[CharacterID - 1];
  const occurencies = character.episode.length;
  maxCharacters = data.info.count;
  maxPage = Math.round(maxCharacters / 20 + 1);
  maxCharacters = (maxCharacters % 20) + 1;
  console.log("maxPage", maxPage);
  console.log("maxCharacters", maxCharacters);
  createCharacterCard(
    character.image,
    character.name,
    character.status,
    character.type,
    occurencies
  );
  paginationNavigator(CharacterID, currentPage);

  return data.results;
}

fetchCharacters();
nextButton.addEventListener("click", () => {
  CharacterID++;
  if (CharacterID > 20) {
    currentPage++;
    CharacterID = 1;
    fetchCharacters();
  }
  if (currentPage === maxPage && CharacterID >= maxCharacters) {
    CharacterID = 1;
    currentPage = 1;
  }
  fetchCharacters();
});
prevButton.addEventListener("click", () => {
  if (CharacterID === 1 && currentPage != 1) {
    currentPage--;
    CharacterID = 20;
    fetchCharacters();
  } else if (CharacterID === 1 && currentPage === 1) {
  } else {
    CharacterID--;
    fetchCharacters();
  }
});
// States

const searchQuery = "";
