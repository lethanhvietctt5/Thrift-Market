let menu = document.getElementsByClassName("menu")[0];
let submenu = document.getElementsByClassName("submenu")[0];
menu.onclick = function () {
  menu.innerHTML = "";
  if (menu.classList.contains("close")) {
    menu.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z" fill="currentColor"></path></svg>`;
    menu.classList.remove("close");
    menu.classList.add("open");
    submenu.classList.remove("hidden");
  } else {
    menu.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z" fill="currentColor"></path></svg>`;
    menu.classList.remove("open");
    menu.classList.add("close");
    submenu.classList.add("hidden");
  }
};
