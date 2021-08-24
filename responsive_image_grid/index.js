/**
 * Written by Deepak (dpkkdn@gmail.com)
 * On 24 August, 2021
 */

const shuffleBtn = document.getElementById('shuffle');
shuffleBtn.addEventListener('click', shufflePage);

const srcList = ['https://picsum.photos/200/200', 'https://loremflickr.com/200/200'] // list of image placeholders
const baseString = 'abcdefghijklmnopqrstuvwxyz 1234567890';

const imageObject = { src: '', text: '' }
var imagesList = Array.from({length: 40}, (_) => ({...imageObject})); // get list of objects

// get random image src and text
imagesList.forEach((el, ind) => {
  el.text = `${ind}_${getRandomString(10)}`
  el.src = getRandomSrc();
});

const containerDiv = document.querySelector('.container');

displayImages(imagesList);

function getRandomString(strLength) {
  let finalString = '';
  for (let i = 0; i < strLength; i++) {
    const newCharIndex = Math.floor(Math.random() * baseString.length);
    finalString += baseString[newCharIndex];
  }
  return finalString;
}

function getRandomSrc() {
  const srcIndex = Math.floor(Math.random() * srcList.length);
  return srcList[srcIndex];
}

function displayImages(imgList) {
  imgList.forEach((imageObj, i) => {
    // create div and image
    const div = document.createElement('div');
    div.id = i;
    div.setAttribute('class', 'imgContainer');
    const imageEl = document.createElement('img');
    imageEl.src = imageObj.src;
    div.appendChild(imageEl);

    // create overlay div -> p, a; a -> icon
    const divOverlay = document.createElement('div');
    divOverlay.setAttribute('class', 'overlay');
    divOverlay.innerHTML = `<p>${imageObj.text}</p>`;
    const deleteLink = document.createElement('a');
    deleteLink.href = '#';
    deleteLink.setAttribute('class', 'icon');
    deleteLink.title = imageObj.text;
    deleteLink.innerHTML = '<i class="fa fa-trash-o"></i>';
    deleteLink.addEventListener('click', function () {
      deleteImage(i);
    });
    divOverlay.appendChild(deleteLink);

    div.appendChild(divOverlay);

    containerDiv.appendChild(div);
  });
}

function deleteImage(index) {
  const divDelete = document.getElementById(index);
  containerDiv.removeChild(divDelete);
  console.log('Removed the div at index: ', index, divDelete);
}

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function shufflePage() {
  containerDiv.innerHTML = '';
  shuffle(imagesList);
  displayImages(imagesList);
}