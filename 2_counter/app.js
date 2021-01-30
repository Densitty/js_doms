// set the initial count
let count = 0;

const value = document.getElementById('value');
const btns = document.querySelectorAll('.btn');

btns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const styles = e.target.classList;
    if (styles.contains('increase')) {
      count += 1;
    } else if (styles.contains('decrease')) {
      count--;
    } else {
      count = 0;
    }

    if (count > 0) {
      value.style.color = 'green'
    }

    if (count < 0) {
      value.style.color = 'red'
    }

    if (count === 0) {
      value.style.color = 'black'
    }
    value.textContent = count;
  })
})
