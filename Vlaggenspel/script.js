// Initial References
let draggableObjects;
let dropPoints;
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const dragContainer = document.querySelector(".draggable-objects");
const dropContainer = document.querySelector(".drop-points");
const timerDisplay = document.getElementById("timer");
const data = [
  "belgium",
  "germany",
  "spain",
  "france",
  "italy",
  "UK"
];

let initialX = 0,
  initialY = 0;
let currentElement = "";
let moveElement = false;
let count = 0;
let timerInterval;
let startTime;
let endTime;

// Random value from Array
const randomValueGenerator = () => {
  return data[Math.floor(Math.random() * data.length)];
};

// Format time as mm:ss
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Update timer display
const updateTimer = () => {
  timerDisplay.textContent = formatTime(time);
  time += 1;
};

// Win Game Display
const stopGame = () => {
  controls.classList.remove("hide");
  endTime = new Date(); // end time
  clearInterval(timerInterval); // stop timer
  const durationInSeconds = Math.round((endTime - startTime) / 1000); // calc seconds
  result.innerText = `Well Done! You completed the game in ${formatTime(durationInSeconds)} seconds!`;
};


// Drag & Drop Functions
function dragStart(e) {
  e.dataTransfer.setData("text", e.target.id);
}

// Events fired on the drop target
function dragOver(e) {
  e.preventDefault();
}

const drop = (e) => {
  e.preventDefault();
  // Access data
  const draggedElementData = e.dataTransfer.getData("text");
  // Get custom attribute value
  const droppableElementData = e.target.getAttribute("data-id");
  if (draggedElementData === droppableElementData) {
    const draggedElement = document.getElementById(draggedElementData);
    // dropped class
    e.target.classList.add("dropped");
    // hide current img
    draggedElement.classList.add("hide");
    // draggable set to false
    draggedElement.setAttribute("draggable", "false");
    e.target.innerHTML = ``;
    // insert new img
    e.target.insertAdjacentHTML(
      "afterbegin",
      `<img src="vlaggen/${draggedElementData}.png">`
    );
    count += 1;
  }
  // Win
  if (count == 6) { 
    stopGame();
  }
};

// Creates flags and countries
const creator = () => {
  dragContainer.innerHTML = "";
  dropContainer.innerHTML = "";
  let randomData = [];
  // for string random values in array
  for (let i = 1; i <= 6; i++) { 
    let randomValue = randomValueGenerator();
    if (!randomData.includes(randomValue)) {
      randomData.push(randomValue);
    } else {
      i -= 1;
    }
  }
  for (let i of randomData) {
    const flagDiv = document.createElement("div");
    flagDiv.classList.add("draggable-image");
    flagDiv.setAttribute("draggable", true);
    flagDiv.innerHTML = `<img src="vlaggen/${i}.png" id="${i}">`;
    dragContainer.appendChild(flagDiv);
  }
  
  randomData = randomData.sort(() => 0.5 - Math.random());
  for (let i of randomData) {
    const countryDiv = document.createElement("div");
    countryDiv.innerHTML = `<div class='countries' data-id='${i}'>
    ${i.charAt(0).toUpperCase() + i.slice(1).replace("-", " ")}
    </div>`;
    dropContainer.appendChild(countryDiv);
  }
};

// Start Game Immediately
const startGame = async () => {
  startTime = new Date(); 
  currentElement = "";
  controls.classList.add("hide");

  await creator();
  count = 0;
  dropPoints = document.querySelectorAll(".countries");
  draggableObjects = document.querySelectorAll(".draggable-image");

  // Events
  draggableObjects.forEach((element) => {
    element.addEventListener("dragstart", dragStart);
  });
  dropPoints.forEach((element) => {
    element.addEventListener("dragover", dragOver);
    element.addEventListener("drop", drop);
  });

  // Initialize timer
  time = 0;
  updateTimer(); 
  timerInterval = setInterval(updateTimer, 1000); 
};


window.onload = startGame;

//stop button
document.getElementById('stopButton').addEventListener('click', function() {
  window.location.href = 'empty.html';
});
