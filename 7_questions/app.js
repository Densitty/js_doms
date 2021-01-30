//using selectors inside the element
const questions = document.querySelectorAll('.question');

questions.forEach(question => {
  // console.log(question)
  const qBtn = question.querySelector('.question-btn')
  // on clicking the icon button
  qBtn.addEventListener('click', () => {
    // first remove the 'show-text' class on the article not clicked
    questions.forEach(qtn => {
      if (qtn !== question) {
        qtn.classList.remove('show-text')
      }
    })
    question.classList.toggle('show-text')
  })
})

// traversing the dom
/*
const questionBtns = document.querySelectorAll('.question-btn');

questionBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    console.log(e.target)
    const question = e.currentTarget.parentElement.parentElement;

    question.classList.toggle('show-text')
  })
})
*/
