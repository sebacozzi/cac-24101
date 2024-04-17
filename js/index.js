
const btnBack = document.getElementById('back');
// cambio de cursor
btnBack.style.cursor = "pointer";

btnBack.addEventListener("click", () => { window.history.back() });
