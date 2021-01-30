const btns = document.querySelectorAll('.tab-btn');
const about = document.querySelector('.about');
const articles = document.querySelectorAll('.content');

about.addEventListener('click', e => {
  // console.log(e.currentTarget)
  const id = e.target.dataset.id;
  if (id) {
    // console.log(e.target)
    // remove the active class from all the buttons first
    btns.forEach(btn => {
      btn.classList.remove('active');
      // then add it back to the current button being clicked
      e.target.classList.add('active');
    });
    // target the articles and remove the active class on them and target the one whose dataset.id matches that of the current btn clicked
    articles.forEach(article => {
      article.classList.remove('active');
      // if (article.id === e.target.dataset.id) {
      //   article.classList.add('active');
      // }
    })
    const targetArticle = document.getElementById(id)
    targetArticle.classList.add('active')
  }
})