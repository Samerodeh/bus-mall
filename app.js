'use strict';

let imageArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];



const image = document.getElementById( 'image' );
const leftImage = document.getElementById( 'leftImage' );
const middleImage = document.getElementById( 'middleImage' );
const rightImage = document.getElementById( 'rightImage' );

let clickNumber = 0;
let leftImageIndex = 0;
let middleImageIndex = 0;
let rightImageIndex = 0;

function Images( name ) {
  this.name = name;
  this.img = `./img/${name}.png`;
  this.shown = 0;
  this.clicks = 0;
  Images.all.push( this );
}

    Images.all = [];

for ( let i = 0; i < imageArray.length; i++ ) {
  new Images( imageArray[i] );
}

function eventHandler( event ) {
  if ( ( event.target.id == 'leftImage' || event.target.id == 'middleImage'  || event.target.id == 'rightImage' )  && clickNumber < 25 ) {

    if( event.target.id == 'leftImage' ) {
      Images.all[leftImageIndex].clicks++;
    }

    if( event.target.id == 'middleImage' ) {
        Images.all[middleImageIndex].clicks++;
      }

    if( event.target.id == 'rightImage' ) {
      Images.all[rightImageIndex].clicks++;
    }

    clickNumber++;
    renderImages();

  } else {
    console.log( Images.all );
  }
}

function renderImages() {
  let leftIndex = randomNumber( 0, imageArray.length - 1 );
  let middleIndex = randomNumber( 0, imageArray.length - 1 );
  let rightIndex = randomNumber( 0, imageArray.length - 1 );

  do {
    rightIndex = randomNumber( 0, imageArray.length - 1 );
  } while ( leftIndex === middleIndex === rightIndex );

  leftImage.src = Images.all[leftIndex].img;
  middleImage.src = Images.all[middleIndex].img;
  rightImage.src = Images.all[rightIndex].img;

  leftImageIndex = leftIndex;
  middleImageIndex = middleIndex;
  rightImageIndex = rightIndex;

  Images.all[leftIndex].shown++;
  Images.all[middleIndex].shown++;
  Images.all[rightIndex].shown++;
  
}

let results = document.getElementById('image');
let ulElement = document.createElement('ul');
results.appendChild(ulElement); 

function ViewResults() {
    for (let i = 0; i < Images.all.length; i++){
        let liElement = document.createElement('li'); 
        ulElement.appendChild(liElement); 
        liElement.textContent = `${Images.all[i].name}  ${Images.all[i].clicks} votes ${Images.all[i].shown} times`
        
        renderChartjs();
    }
}


function randomNumber( min, max ) {
  min = Math.ceil( min );
  max = Math.floor( max );
  return Math.floor( Math.random() * ( max - min + 1 ) + min ); 
}

function renderChartjs() { 

  let clicks = []; 
  let names = [];
  let shown = [];

  for (let i = 0; i < Images.all.length; i++) {
    clicks.push(Images.all[i].clicks); 
    names.push(Images.all[i].name); 
    shown.push(Images.all[i].shown); 
  }

  let ctx = document.getElementById('jsChart').getContext('2d');
let jsChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: names,
        datasets: [{
            label: '# of Votes',
            data: clicks,
            backgroundColor: [
                
                'rgba(54, 162, 235, 0.2)',
                
            ],
            borderColor: [
                
                'rgba(54, 162, 235, 1)',
                
            ],
            borderWidth: 1
    }, { 
      
      label: '# of shown',
    data: shown,
    backgroundColor: [
        
      'rgba(255, 99, 132, 0.2)',
        
    ],
    borderColor: [
        
      'rgba(255, 99, 132, 1)',
        
    ],
    borderWidth: 1
  }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}

image.addEventListener( 'click', eventHandler );
renderImages();