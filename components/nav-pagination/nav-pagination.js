export default function paginationNavigator(currentID, currentPage) {
  const pagination = document.querySelector('[data-js="pagination"]');
  return (pagination.innerHTML = `${currentID} / ${currentPage}`);
}
