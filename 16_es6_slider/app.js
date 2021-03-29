import people from "./data.js";

const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (!element) {
    throw new Error("There is no element selected by that name.");
  }
  return element;
};

const container = getElement(".slide-container");
const nextBtn = getElement(".next-btn");
const prevBtn = getElement(".prev-btn");

// set slides
container.innerHTML = people
  .map((person, index) => {
    const { img, name, job, text } = person;

    let position = "next";

    if (index === 0) {
      position = "active";
    }

    if (index === people.length - 1) {
      position = "last";
    }

    return `
    <article class="slide ${position}">
      <img
        src="${img}"
        alt="${name}"
        class="img"
      />
      <h4>${name}</h4>
      <p class="title">${job}</p>
      <p class="text">
        ${text}
      </p>
      <div class="quote-icon"><i class="fas fa-quote-right"></i></div>
    </article>
  `;
  })
  .join("");

const startSlider = (type) => {
  const active = getElement(".active");
  const last = getElement(".last");
  let next = active.nextElementSibling;

  // console.log(next);
  // console.log(container.firstElementChild);

  if (!next) {
    /* if there is no more element in the [people] array, turn the first child of the container into the next element */
    next = container.firstElementChild;
  }

  active.classList.remove("active");
  last.classList.remove("last");
  next.classList.remove("next");

  if (type === "prev") {
    active.classList.add("next");
    last.classList.add("active");
    next = last.previousElementSibling;

    if (!next) {
      next = container.lastElementChild;
    }
    next.classList.remove("next");
    next.classList.add("last");

    return;
  }

  active.classList.add("last");
  last.classList.add("next");
  next.classList.add("active");
};

nextBtn.addEventListener("click", () => {
  startSlider();
});

prevBtn.addEventListener("click", () => {
  startSlider("prev");
});

window.addEventListener("DOMContentLoaded", () => {
  setInterval(startSlider, 10000);
});
