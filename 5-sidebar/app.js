const sideBarToggle = document.querySelector('.sidebar-toggle');
const closeBtn = document.querySelector('.close-btn');
const sidebar = document.querySelector('.sidebar');

sideBarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('show-sidebar')
})

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('show-sidebar')
})

