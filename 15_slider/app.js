function qs(title) {
  return document.querySelector(title)
}
const slides = document.querySelectorAll('.slide');
const prevBtn = qs('.prevBtn');
const nextBtn = qs('.nextBtn');

slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
})

let counter = 0;

nextBtn.addEventListener('click', () => {
  counter++;
  carousel2()
})

prevBtn.addEventListener('click', () => {
  counter--;
  carousel2()
})

/** OPTION 1 - if we want to cycle through the images */
function carousel() {
  if (counter === slides.length) {
    counter = 0
  }

  if (counter < 0) {
    counter = slides.length - 1
  }
  slides.forEach(slide => {
    slide.style.transform = `translateX(-${counter * 100}%)`
  })
}


/** OPTION 2 - if we don't want to cycle through the images */

// hide the previous button at first
prevBtn.style.display = 'none';

function carousel2() {
  if (counter < slides.length - 1) {
    nextBtn.style.display = 'block';
  } else {
    nextBtn.style.display = 'none';
  }

  if (counter > 0) {
    prevBtn.style.display = 'block'
  } else {
    prevBtn.style.display = 'none'
  }

  slides.forEach(slide => {
    slide.style.transform = `translateX(-${counter * 100}%)`
  })
}


