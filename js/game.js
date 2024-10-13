let canvas;
let world;
let keyboard = new Keyboard();
const fullScreenButton = document.getElementById("FULLSCREEN");
let isFullScreen = false;

function init() {
  canvas = document.getElementById("canvas");
  showStartScreen();
}

function showStartScreen() {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let startScreenImage = new Image();
  startScreenImage.src = "img/9_intro_outro_screens/start/startscreen_1.png";
  startScreenImage.onload = function () {
    ctx.drawImage(startScreenImage, 0, 0, canvas.width, canvas.height);
    addButtonToCanvas("Start Game", startGame);
  };
}

function addButtonToCanvas(text, callback) {
  const button = document.createElement("button");
  button.innerHTML = text;
  button.className = "game-button";
  button.style.position = "absolute";
  button.style.zIndex = 2;

  const updateButtonPosition = () => {
    const canvasRect = canvas.getBoundingClientRect();
    button.style.top = `${canvasRect.top + 20}px`;
  };

  updateButtonPosition();

  window.addEventListener("resize", updateButtonPosition);
  document.addEventListener("fullscreenchange", updateButtonPosition);

  button.onclick = () => {
    callback();
    document.body.removeChild(button);
  };

  document.body.appendChild(button);
}

function startGame() {
  world = new World(canvas, keyboard);
  world.setWorld();
  world.run();
  world.draw();
  bindBtsTouchEvents();
}

fullScreenButton.addEventListener("click", async () => {
  try {
    await canvas.requestFullscreen();
  } catch (error) {
    console.error("Error entering full screen mode:", error);
  }
});

document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 39:
    case 68:
      keyboard.RIGHT = true;
      break;
    case 37:
    case 65:
      keyboard.LEFT = true;
      break;
    case 38:
    case 87:
      keyboard.UP = true;
      break;
    case 40:
    case 83:
      keyboard.DOWN = true;
      break;
    case 32:
      keyboard.SPACE = true;
      break;
    case 81:
      keyboard.ATTACK = true;
      break;
  }
});

function bindBtsTouchEvents() {
  document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById('leftBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById('rightBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  document.getElementById('jumpBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  document.getElementById('throwBtn').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.q = true;
  });

  document.getElementById('throwBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.q = false;
  });
}

document.addEventListener("keyup", (event) => {
  switch (event.keyCode) {
    case 39:
    case 68:
      keyboard.RIGHT = false;
      break;
    case 37:
    case 65:
      keyboard.LEFT = false;
      break;
    case 38:
    case 87:
      keyboard.UP = false;
      break;
    case 40:
    case 83:
      keyboard.DOWN = false;
      break;
    case 32:
      keyboard.SPACE = false;
      break;
    case 81:
      keyboard.ATTACK = false;
      break;
  }
});

