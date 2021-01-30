const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const deadline = document.querySelector('.deadline');
const giveaway = document.querySelector('.giveaway');
const timeDisplay = document.querySelectorAll('.deadline-format h4');

// to set the deadline date dynamically; say 10 days from present date
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();


// let futureDate = new Date(2020, 11, 27, 19, 30, 02);
let futureDate = new Date(tempYear, tempMonth, tempDay + 15, 18, 30);
// console.log(futureDate)
const futureYear = futureDate.getFullYear();
const futureHours = futureDate.getHours();
let month = months[futureDate.getMonth()];
const futureMinutes = futureDate.getMinutes()
const date = futureDate.getDate()
const weekday = weekdays[futureDate.getDay()]
// console.log(date)
// console.log(weekday)

const currentTime = new Date().getTime()
// future time in milliseconds

const timeDifference = getTimeDifference();

giveaway.textContent = `giveaway ${timeDifference < 0 ? 'ended' : 'ends'} on ${weekday}, ${date} ${month} ${futureYear}, ${futureHours < 12 ? `${futureHours - 0}` : `${futureHours === 12 ? `12` : `${futureHours - 12}`}`}:${futureMinutes}${futureHours >= 12 ? 'pm' : 'am'}`



function getRemainingTime() {
  const timeDifference = getTimeDifference();
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // to get the number of days remaining
  let days = Math.floor(timeDifference / oneDay);
  // to get the number of hours remaining
  let hours = Math.floor((timeDifference % oneDay) / oneHour);
  // console.log(hours)
  // to get the remaining minutes
  let minutes = Math.floor((timeDifference % oneHour) / oneMinute);
  // to get the remaining seconds
  let seconds = Math.floor((timeDifference % oneMinute) / 1000);

  // set the values
  const values = [days, hours, minutes, seconds];

  // to format the time
  function formatTime(item) {
    if (item < 10) {
      return item = `0${item}`
    }
    return item;
  }

  timeDisplay.forEach((time, index) => {
    time.textContent = formatTime(values[index])
  })

  if (timeDifference < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired </h4>`;
  }
}

function getTimeDifference() {
  // future time in milliseconds
  const futureTime = futureDate.getTime()
  // current time in milliseconds
  const currentTime = new Date().getTime()
  return futureTime - currentTime;
}

let countdown = setInterval(getRemainingTime, 1000)

getRemainingTime()