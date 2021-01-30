// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.querySelector('#grocery');
const submit = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn')
// edit option
let editElement;
let editFlag = false;
let editID = '';
// ****** EVENT LISTENERS **********
// submit form
form.addEventListener('submit', addItem)
// clear items
clearBtn.addEventListener('click', clearItems)
// when window loads, get the items from the local storage if they are prsent
window.addEventListener('DOMContentLoaded', setUpItems)

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  // to assign a unique id to any grocery - just a cheat instead of using uuid
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    // load item created to the DOM
    createListItems(id, value)
    // add the created item to local storage
    addToLocalStorage(id, value)
    // set back to default
    setBackToDefault()

    displayAlert('grocery list item added', 'success')
    container.classList.add('show-container')
  } else if (value && editFlag === true) {
    // edit element is previousElementSibling of button
    editElement.textContent = value;
    displayAlert('item value changed', 'success');
    // edit local storage
    editLocalStorage(editID, value)
    setBackToDefault();
  } else {
    displayAlert('please enter a valid item', 'danger')

  }
}

// edit function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // const id = element.dataset.id
  // set edit item - first get the item entered 
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // then set the input value to the element
  grocery.value = editElement.textContent;
  editFlag = true;
  editID = element.dataset.id;
  submit.textContent = 'edit';
}
// delete function
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // get the id of the item added
  const id = element.dataset.id
  // console.log(list.children.length)
  list.removeChild(element);
  // if the children of the list parent is none
  if (list.children.length === 0) {
    container.classList.remove('show-container');
  }
  displayAlert('you have removed the last item in your list', 'danger');
  // set input back to default
  setBackToDefault();
  // remove item from LS
  removeFromLocalStorage(id)
}
// reset our input
function setBackToDefault() {
  // empty the input
  grocery.value = '';
  editFlag = false;
  editID = '';
  submit.textContent = 'submit'
}

// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`)

  // remove display alert
  setTimeout(() => {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`)
  }, 1000)
}

// clear items
function clearItems() {
  const items = document.querySelectorAll('.grocery-item');

  if (items.length > 0) {
    items.forEach(item => {
      list.removeChild(item)
    })
  }
  container.classList.remove('show-container');
  displayAlert('you have emptied your list', 'danger')
  // reset every input
  setBackToDefault()
  // remove all items from local storage
  localStorage.removeItem('groceryList');
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  const grocery = {
    id,
    value
  };
  // items from storage, if it exists
  const groceryItems = getFromLocalStorage();
  // push the item input onto the array gotten from LS
  groceryItems.push(grocery);
  // set the localStorage to include the grocery item newly added
  localStorage.setItem('groceryList', JSON.stringify(groceryItems))
}

function removeFromLocalStorage(id) {
  let groceryItems = getFromLocalStorage();
  // filter out the item that matches the id 
  groceryItems = groceryItems.filter(item => item.id !== id);
  // update the local storage to reflect the state
  localStorage.setItem('groceryList', JSON.stringify(groceryItems))
}

function editLocalStorage(id, value) {
  let groceryItems = getFromLocalStorage();
  groceryItems = groceryItems.map(item => {
    if (item.id === id) {
      // set the value of that item into a new value
      item.value = value;
    }
    // if there is no match to the id, then return the item
    return item;
  })
  // update the local storage to reflect the change of state again
  localStorage.setItem('groceryList', JSON.stringify(groceryItems))
}

function getFromLocalStorage() {
  let items = localStorage.getItem('groceryList') ? JSON.parse(localStorage.getItem('groceryList')) : [];
  return items;
}

// ****** SETUP ITEMS **********
function setUpItems() {
  let groceryItems = getFromLocalStorage();
  if (groceryItems.length > 0) {
    groceryItems.forEach(item => {
      createListItems(item.id, item.value)
    })
    // make the container visible on the DOM
    container.classList.add('show-container')
  }
}

// dump items to DOM
function createListItems(id, value) {
  const element = document.createElement('article');
  element.classList.add('grocery-item');
  // add id
  // const attr = document.getAttribute('data-id')
  element.setAttribute('data-id', id);
  // console.log(element);
  element.innerHTML = `
      <p class="title">${value}</p>
      <div class="btn-container">
        <button class="edit-btn"><i class="fas fa-edit"></i></button>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
      </div>
    `;
  /** at this point, both edit and delete btns are available on the DOM
      it's better to place the event listeners on those dynamic buttons here
  */
  const deleteBtn = element.querySelector('.delete-btn')
  const editBtn = element.querySelector('.edit-btn')

  deleteBtn.addEventListener('click', deleteItem)
  editBtn.addEventListener('click', editItem)
  /** event listeners on the dynamic buttons carried out above */

  // append it to the list
  list.insertAdjacentElement('beforeend', element);
}