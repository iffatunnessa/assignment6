const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
  console.log(images);
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  const span1 = 1;
  const span2 = 2;
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = `<img class= "img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" onmouseover=showPopularity(${image.id},${image.comments},${image.downloads},${image.favorites}) onmouseout=hidePopularity(${image.id}) alt="${image.tags}"> 
    <div id="${image.id}" onmouseover=showPopularity(${image.id},${image.comments},${image.downloads},${image.favorites}) onmouseout=hidePopularity(${image.id})>
    </div>
    <div><i class="fas fa-heart"></i> ${image.likes} <i class="far fa-eye"></i> ${image.views}</div>`;
    gallery.appendChild(div);
  })
  
}
//<i class="fas fa-comments"></i> <i class="fas fa-download"></i></i> 
//bonus: showing popularity (favorites and downloads) by hovering the image and hide them
const showPopularity = (id,comments,downloads,favorites) =>{
  const div = document.getElementById(id);
  div.className = "overlay";
  div.innerText = `Comments: ${comments} \nDownloads: ${downloads} \nFavourites: ${favorites}`;
}
const hidePopularity = (id) =>{
  const div = document.getElementById(id);
  div.classList.remove("overlay");
  div.innerText = '';
}

const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add('added');
  
  let item = sliders.indexOf(img);
  if (item === -1) {
     sliders.push(img);
     //change the css or removed the class name for selected border
     element.classList.remove("border");
  }
  else {
    //popped unselected element and added the 'border' class to make it as before
    sliders.pop(img);
    element.classList.add("border");
  }
}

var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000;
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })
  //condition for negative slide duration
  if(duration < 0){
    document.getElementById('duration').value ="";
    imagesArea.style.display = 'block';
    document.querySelector('.main').style.display = 'none';
    alert('Time interval should not be negative!');
    return;
  }
  else{
    changeSlide(0)
    timer = setInterval(function () {
        slideIndex++;
        changeSlide(slideIndex);
    }, duration);
  }
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

search.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    searchElements();
  }
})

searchBtn.addEventListener('click', function () {
    searchElements();
});

const searchElements = () =>{
  document.querySelector('.main').style.display = 'none';
  const search = document.getElementById('search');
  clearInterval(timer);
  getImages(search.value)
  sliders.length = 0;
}

sliderBtn.addEventListener('click', function () {
  createSlider()
})
