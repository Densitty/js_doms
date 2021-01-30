// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date');
date.textContent = new Date().getFullYear()

// ********** close links ************
const linksContainer = document.querySelector('.links-container');
const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.links');
// the toggle approach is good if we are dealing with a static case, where we know the links are fixed - 
navToggle.addEventListener('click', () => {
  // linksContainer.classList.toggle('show-links');
  const linksContainerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;


  if (linksContainerHeight === 0) {
    linksContainer.style.height = linksHeight + 'px';
  } else {
    linksContainer.style.height = 0;
  }
})

// ********** fixed navbar ************
const navbar = document.getElementById('nav')
const topLink = document.querySelector('.top-link')
console.log(navbar)
window.addEventListener('scroll', () => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;

  if (scrollHeight > navHeight) {
    navbar.classList.add('fixed-nav')
  } else {
    navbar.classList.remove('fixed-nav')
  }

  if (scrollHeight > 500) {
    topLink.classList.add('show-link')
  } else {
    topLink.classList.remove('show-link')
  }
})

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    // navigate to the specific spot/section
    const id = e.currentTarget.getAttribute('href').slice(1);
    const element = document.getElementById(id);

    // calculate the heights
    const navbarHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains('fixed-nav');

    let position = element.offsetTop - navbarHeight;

    if (!fixedNav) {
      position = position - navbarHeight;
    }

    // in a situation whereby the navbar is being opened on mobile screen, then its height is more than 82px it will be on large screens
    if (navbarHeight > 82) {
      position = position + containerHeight;
    }

    console.log(navbarHeight)
    window.scrollTo({
      left: 0,
      top: position,
    })
    // close the navigation link
    linksContainer.style.height = 0
  })
})
console.log(scrollLinks)