//DO NOT CHANGE ANYTHING IN THIS FILE//

// This file is responsible for rendering the full flashcard set,
// with buttons to navigate between cards, a form to create new cards,
// and a button to shuffle the cards.

// This function is responsible for generating the form used to create a new card.
import { renderCardForm } from "./createCard.js";
// This function is responsible for shuffling the flashcard
import { shuffle } from "./shuffle.js";
// Functions responsible for creating toggle button used to toggle the forms visibility
import { createToggleButton } from "./utilityRenderFunctions.js";

// The flash cards have two sides
// This generates one side of a flashcard card
const renderSide = (text, className) => {
  const div = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = text;
  div.className = className;
  div.append(p);
  return div;
};

// This generates the flashcard elements
const generateFlashCard = (card) => {
  const termSide = renderSide(card.term, "term");
  const descriptionSide = renderSide(card.description, "description");

  const innerCard = document.createElement("div");
  innerCard.className = "innerCard";
  innerCard.append(termSide, descriptionSide);

  const cardContainer = document.createElement("div");
  cardContainer.className = "cardContainer";
  cardContainer.append(innerCard);

  return cardContainer;
};

const renderFlashCards = (set, index = 0) => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const container = document.createElement("div");
  container.className = "cardPageContainer";

  if (set.length !== 0) {
    const currentCard = generateFlashCard(set[index]);

    const previousBtn = createNavigationButton("Previous", () => {
      index = index > 0 ? index - 1 : set.length - 1;
      renderFlashCards(set, index);
    });

    const nextBtn = createNavigationButton("Next", () => {
      index = index < set.length - 1 ? index + 1 : 0;
      renderFlashCards(set, index);
    });

    const nextAndPrevBtn = document.createElement("div");
    nextAndPrevBtn.append(previousBtn, nextBtn);
    nextAndPrevBtn.className = "nextAndPrevBtnContainer";

    container.append(currentCard, nextAndPrevBtn);
  }

  const form = renderCardForm(set);
  form.className = "notVisible";

  const addCardBtn = createToggleButton("Add New Card", form);
  addCardBtn.setAttribute("data-cy", "toggle_form");

  const shuffleBtn = document.createElement("button");
  shuffleBtn.textContent = "Shuffle Cards";
  shuffleBtn.addEventListener("click", () => shuffleCards(set));

  container.append(shuffleBtn, addCardBtn, form);
  main.append(container);
};

const createNavigationButton = (text, onClick) => {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.addEventListener("click", onClick);
  return btn;
};

const shuffleCards = (set) => {
  const shuffledCards = shuffle(set);
  renderFlashCards(shuffledCards);
};

export { renderSide, generateFlashCard, renderFlashCards };
