export default function searchQuery() {
  const searchBar = document.querySelector('[data-js="search-bar"]');
  searchBar.addEventListener("submit", (event) => {
    event.preventDefault();
    return event.target.elements.item(0).value;
  });
}
