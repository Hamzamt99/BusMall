'use strict';

let attemptEl = document.getElementById('attempts');
let container = document.getElementById('image-container');
let leftImg = document.getElementById('leftImg');
let midImg = document.getElementById('midImg');
let rightImg = document.getElementById('rightImg');
let result = document.getElementById('results');


let productArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

let products = [];
let maxAttempts = 10;
let attempt = 1;

function product(productName) {
  this.productName = productName.split('.',[0]);
  this.productImg = `images/${productName}`;
  this.votes = 0;
  this.views = 0;
  products.push(this);


}

for (let i = 0; i < productArray.length; i++) {
  new product(productArray[i]);



}
console.log(products);


function randomImage() {
  return Math.floor(Math.random() * products.length);
}
let leftIndex;
let midIndex;
let rightIndex;
function renderImg() {
  leftIndex = randomImage();
  midIndex = randomImage();
  rightIndex = randomImage();
  while (leftIndex === midIndex === rightIndex) {
    leftIndex = randomImage();
    midIndex = randomImage();
    rightIndex = randomImage();

  }
  leftImg.setAttribute('src', products[leftIndex].productImg);
  midImg.setAttribute('src', products[midIndex].productImg);
  rightImg.setAttribute('src', products[rightIndex].productImg); 
  products[leftIndex].views++;
  products[midIndex].views++;
  products[rightIndex].views++;
}
renderImg();
leftImg.addEventListener('click', clickHandler);
midImg.addEventListener('click', clickHandler);
rightImg.addEventListener('click', clickHandler);

function clickHandler(event) {
  if (attempt <= maxAttempts) {
    let clickedImage = event.target.id;
    if (clickedImage === 'leftImg') {
      products[leftIndex].votes++;
    } else if (clickedImage === 'midImg') {
      products[rightIndex].votes++;
    }
    else if (clickedImage === 'rightImg') {
      products[rightIndex].votes++;
    }
    renderImg();
    attempt++;
  } else {

    for (let i = 0; i < products.length; i++) {
      let liEl = document.createElement('li');
      result.appendChild(liEl);
      liEl.textContent = `${products[i].productName} : ${products[i].votes} votes   `;
    }
    leftImg.removeEventListener('click', clickHandler);
    rightImg.removeEventListener('click', clickHandler);
  }
}