// Given 2 arrays. create a function that lets a user know whether the two arrays contain any common items
var arr1 = ['a', 'b', 'c', 'x'];
var arr2 = ['z', 'y', 'x']
function elemFound(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        console.log('There is a match, ' + arr1[i] + ' is equal to ' + arr2[j] + '.');
        return true;
      }
    }
  }
  return false;
}

// Brute force but not scalable as we have a BigO of O(a*b) because the 2 arrays are of different sizes. If of the same size, we we have O(n^2)

// To reduce O(a*b) to O(a+b), we can convert one of the arrays to an object (hash table)

function foundCommonItems(arr1, arr2) {
  let map = {};
  // loop through the first array to create an object
  for (let i = 0; i < arr1.length; i++) {
    if (!map[arr1[i]]) {
      map[arr1[i]] = true;
    }
  }

  // loop through the 2nd array to check if its item is available in the map
  for (let j = 0; j < arr2.length; j++) {
    const item = arr2[j]
    if (map[item]) {
      console.log(item)
      return true
    }
  }

  return false
}

var res = elemFound(arr1, arr2);
console.log(res)

var res2 = foundCommonItems(arr1, arr2)
console.log(res2)
// looping through different arrays separately, of different lengths will give us O(a+b), quite better than O(a*b)


function hasPairWithSum(arr, sum) {
  const mySet = new Set();
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    if (mySet.has(arr[i])) {
      console.log(mySet.has(arr[i]))
      return true
    }
    mySet.add(sum - arr[i]);
    console.log(mySet)
  }
  return false;
}

hasPairWithSum([6, 4, 3, 2, 1, 7], 9)

// find out the reason for this behavior
const myName = { name: 'John' };
const herName = { name: 'Jane' };

function changeName(obj1, obj2) {
  obj1 = obj2;
  obj1.name = 'Alice';
  console.log('obj1 is now ', obj1);
  console.log('obj2 is now ', obj2);
}

console.log(myName)
console.log(herName)
changeName(myName, herName)
console.log(myName)
console.log(herName)