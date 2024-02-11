const game = document.querySelector("#game");
const about = document.querySelector("#about");
const navigationList = document.querySelector(".navigation-nav__list");
const navGameButton = document.querySelector("#nav-game");
const navAboutButton = document.querySelector("#nav-about");

function onNavButtonClick(e) {
  const clickedNavButton = e.target.classList.contains("navigation-nav__list__item__button") ? e.target : e.target.parentNode;
  const selectedNavButton = navigationList.querySelector(".selected");

  if (clickedNavButton.classList.contains("navigation-nav__list__item__button") && clickedNavButton !== selectedNavButton) {
    clickedNavButton.classList.add("selected");
    selectedNavButton.classList.remove("selected");
  }

  if (clickedNavButton.id === "nav-game") {
    game.classList.add("visible");
    about.classList.remove("visible");
  } else if (clickedNavButton.id === "nav-about") {
    about.classList.add("visible");
    game.classList.remove("visible");
  }
}

navAboutButton.addEventListener("click", onNavButtonClick);
navGameButton.addEventListener("click", onNavButtonClick);
