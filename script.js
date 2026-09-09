const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const themeToggle = document.getElementById('theme-toggle');
let expression = '';
const operators = ['/', '*', '+', '-', '.'];

function updateDisplay(value) {
  display.textContent = value;
}

function lastCharacter() {
  return expression.slice(-1);
}

function canAddDecimal() {
  const parts = expression.split(/[-+*/]/);
  const currentNumber = parts[parts.length - 1];
  return !currentNumber.includes('.');
}

function addValue(value) {
  const lastChar = lastCharacter();

  if (value === '.') {
    if (!canAddDecimal()) return;
    if (expression === '' || operators.includes(lastChar)) {
      expression += '0.';
      return;
    }
  }

  if (operators.includes(value)) {
    if (expression === '' && value !== '-') return;
    if (operators.includes(lastChar)) {
      expression = expression.slice(0, -1);
    }
  }

  expression += value;
}

function formatResult(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null;
  }

  const rounded = Number.parseFloat(value.toFixed(10));
  return String(rounded);
}

function calculate() {
  if (operators.includes(lastCharacter())) {
    expression = expression.slice(0, -1);
  }

  if (!expression) {
    updateDisplay('0');
    return;
  }

  try {
    const result = Function(`"use strict"; return (${expression})`)();
    const formatted = formatResult(result);

    if (formatted === null) {
      throw new Error('Invalid result');
    }

    expression = formatted;
    updateDisplay(expression);
  } catch (error) {
    expression = '';
    updateDisplay('Error');
  }
}

function clearExpression() {
  expression = '';
  updateDisplay('0');
}

function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay(expression || '0');
}

function handleButtonClick(button) {
  const value = button.dataset.value;
  const action = button.dataset.action;

  if (action === 'clear') {
    clearExpression();
    return;
  }

  if (action === 'delete') {
    deleteLast();
    return;
  }

  if (action === 'calculate') {
    calculate();
    return;
  }

  if (value !== undefined) {
    addValue(value);
    updateDisplay(expression || '0');
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => handleButtonClick(button));
});

function setTheme(theme) {
  const body = document.body;
  if (theme === 'light') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    themeToggle.textContent = '🌙 Dark';
    themeToggle.setAttribute('aria-pressed', 'false');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    themeToggle.textContent = '☀️ Light';
    themeToggle.setAttribute('aria-pressed', 'true');
  }
  localStorage.setItem('calculatorTheme', theme);
}

function loadTheme() {
  const saved = localStorage.getItem('calculatorTheme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved === 'light' || saved === 'dark' ? saved : (prefersDark ? 'dark' : 'light'));
}

const decorSlider = document.getElementById('decorSlider');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');
const showAllButton = document.getElementById('showAllButton');
let showAllActive = false;

function updateDecorMode() {
  if (!decorSlider || !showAllButton) return;
  decorSlider.classList.toggle('show-all', showAllActive);
  showAllButton.textContent = showAllActive ? 'Kthehu në slider' : 'Shfaq';
  if (sliderPrev && sliderNext) {
    sliderPrev.style.opacity = showAllActive ? '0.45' : '1';
    sliderNext.style.opacity = showAllActive ? '0.45' : '1';
    sliderPrev.style.pointerEvents = showAllActive ? 'none' : 'auto';
    sliderNext.style.pointerEvents = showAllActive ? 'none' : 'auto';
  }
}

function scrollDecor(amount) {
  if (!decorSlider) return;
  decorSlider.scrollBy({ left: amount, behavior: 'smooth' });
}

if (sliderPrev) {
  sliderPrev.addEventListener('click', () => scrollDecor(-260));
}

if (sliderNext) {
  sliderNext.addEventListener('click', () => scrollDecor(260));
}

if (showAllButton) {
  showAllButton.addEventListener('click', () => {
    if (!decorSlider) return;
    showAllActive = !showAllActive;
    updateDecorMode();
  });
}

updateDecorMode();

themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

loadTheme();

const rpsButtons = document.querySelectorAll('.game-btn');
const rpsResult = document.getElementById('rpsResult');
const guessForm = document.getElementById('guessForm');
const guessInput = document.getElementById('guessInput');
const guessResult = document.getElementById('guessResult');
const guessReset = document.getElementById('guessReset');
const ticCells = document.querySelectorAll('.tic-cell');
const ticResult = document.getElementById('ticResult');
const ticReset = document.getElementById('ticReset');

let secretNumber = Math.floor(Math.random() * 10) + 1;
let currentPlayer = 'X';
let ticBoard = Array(9).fill('');

function getRpsChoice() {
  const options = ['Rock', 'Paper', 'Scissors'];
  return options[Math.floor(Math.random() * options.length)];
}

function getRpsWinner(player, computer) {
  if (player === computer) return 'Barazim';
  if (
    (player === 'Rock' && computer === 'Scissors') ||
    (player === 'Paper' && computer === 'Rock') ||
    (player === 'Scissors' && computer === 'Paper')
  ) {
    return 'Ti fitove!';
  }
  return 'Kompjuteri fiton.';
}

rpsButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const playerChoice = button.dataset.choice;
    const computerChoice = getRpsChoice();
    const winner = getRpsWinner(playerChoice, computerChoice);
    rpsResult.textContent = `Ti zgjodhe ${playerChoice}, kompjuteri zgjodhi ${computerChoice}. ${winner}`;
  });
});

if (guessForm) {
  guessForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = Number(guessInput.value);
    if (!value || value < 1 || value > 10) {
      guessResult.textContent = 'Zgjidh një numër nga 1 deri në 10.';
      return;
    }

    if (value === secretNumber) {
      guessResult.textContent = 'Saktë! Ti fitove.';
    } else if (value < secretNumber) {
      guessResult.textContent = 'Shkon më lart.';
    } else {
      guessResult.textContent = 'Shkon më poshtë.';
    }
  });
}

if (guessReset) {
  guessReset.addEventListener('click', () => {
    secretNumber = Math.floor(Math.random() * 10) + 1;
    guessResult.textContent = 'Loja rifillon. Zgjidh një numër të ri.';
    guessInput.value = '';
  });
}

function checkTicWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.every((cell) => cell) ? 'Draw' : null;
}

function updateTicStatus() {
  const winner = checkTicWinner(ticBoard);
  if (winner === 'Draw') {
    ticResult.textContent = 'Barazim!';
    return;
  }
  if (winner) {
    ticResult.textContent = `${winner} fiton!`;
    return;
  }
  ticResult.textContent = `${currentPlayer} është radha.`;
}

function resetTicTacToe() {
  ticBoard = Array(9).fill('');
  currentPlayer = 'X';
  ticCells.forEach((cell) => {
    cell.textContent = '';
    cell.disabled = false;
  });
  ticResult.textContent = 'X fillon lojën.';
}

ticCells.forEach((cell) => {
  cell.addEventListener('click', () => {
    const index = Number(cell.dataset.cell);
    if (ticBoard[index] || checkTicWinner(ticBoard)) return;

    ticBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;

    const winner = checkTicWinner(ticBoard);
    if (winner) {
      ticCells.forEach((c) => (c.disabled = true));
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    updateTicStatus();
  });
});

if (ticReset) {
  ticReset.addEventListener('click', resetTicTacToe);
}

const raceStart = document.getElementById('raceStart');
const raceJump = document.getElementById('raceJump');
const raceReset = document.getElementById('raceReset');
const raceScore = document.getElementById('raceScore');
const runner = document.getElementById('runner');
const obstacle = document.getElementById('obstacle');

let raceInterval = null;
let raceRunning = false;
let racePosition = 0;
let raceSpeed = 4;
let raceScoreValue = 0;
let isJumping = false;

function updateRace() {
  racePosition -= raceSpeed;
  if (racePosition < -60) {
    racePosition = 100;
    raceScoreValue += 1;
    raceSpeed = Math.min(12, raceSpeed + 0.3);
  }

  obstacle.style.right = `${racePosition}%`;
  raceScore.textContent = `Distanca: ${raceScoreValue} metra`;

  const obstacleRect = obstacle.getBoundingClientRect();
  const runnerRect = runner.getBoundingClientRect();

  if (!isJumping && obstacleRect.right <= runnerRect.right + 10 && obstacleRect.left < runnerRect.right + 18 && obstacleRect.bottom > runnerRect.top + 10) {
    endRace('Loja mbaroi!');
  }
}

function startRace() {
  if (raceRunning) return;
  raceRunning = true;
  racePosition = 100;
  raceSpeed = 4;
  raceScoreValue = 0;
  raceScore.textContent = 'Garë në vazhdim...';
  obstacle.style.right = '100%';
  runner.classList.remove('jump');
  isJumping = false;
  raceStart.textContent = 'Duke Vrapuar';
  raceStart.disabled = true;
  raceJump.disabled = false;
  raceReset.disabled = false;

  raceInterval = setInterval(updateRace, 40);
}

function jumpRace() {
  if (!raceRunning || isJumping) return;
  isJumping = true;
  runner.classList.add('jump');
  setTimeout(() => {
    runner.classList.remove('jump');
    isJumping = false;
  }, 450);
}

function endRace(message) {
  clearInterval(raceInterval);
  raceInterval = null;
  raceRunning = false;
  raceScore.textContent = `${message} Rezultat: ${raceScoreValue} metra.`;
  raceStart.textContent = 'Start';
  raceStart.disabled = false;
  raceJump.disabled = true;
}

function resetRace() {
  clearInterval(raceInterval);
  raceInterval = null;
  raceRunning = false;
  racePosition = 100;
  raceSpeed = 4;
  raceScoreValue = 0;
  isJumping = false;
  runner.classList.remove('jump');
  obstacle.style.right = '100%';
  raceScore.textContent = 'Shtyp Start për të nisur.';
  raceStart.textContent = 'Start';
  raceStart.disabled = false;
  raceJump.disabled = true;
}

if (raceStart) {
  raceStart.addEventListener('click', startRace);
}

if (raceJump) {
  raceJump.addEventListener('click', jumpRace);
  raceJump.disabled = true;
}

if (raceReset) {
  raceReset.addEventListener('click', resetRace);
}

const drawCardBtn = document.getElementById('drawCard');
const playerCard = document.getElementById('playerCard');
const computerCard = document.getElementById('computerCard');
const cardResult = document.getElementById('cardResult');
const memoryGrid = document.getElementById('memoryGrid');
const memoryResult = document.getElementById('memoryResult');
const memoryReset = document.getElementById('memoryReset');

const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const cardRanks = {
  A: 14,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  J: 11,
  Q: 12,
  K: 13,
};

function getRandomCard() {
  return cardValues[Math.floor(Math.random() * cardValues.length)];
}

function playHighCard() {
  const player = getRandomCard();
  const computer = getRandomCard();
  playerCard.textContent = player;
  computerCard.textContent = computer;

  const playerRank = cardRanks[player];
  const computerRank = cardRanks[computer];
  if (playerRank > computerRank) {
    cardResult.textContent = 'Ti fitove!';
  } else if (playerRank < computerRank) {
    cardResult.textContent = 'Kompjuteri fiton.';
  } else {
    cardResult.textContent = 'Barazim!';
  }
}

if (drawCardBtn) {
  drawCardBtn.addEventListener('click', playHighCard);
}

let memoryCards = [];
let flipped = [];
let matched = [];
let busy = false;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createMemoryCards() {
  const values = ['♥', '♦', '♣', '♠', '★', '☘'];
  memoryCards = shuffle([...values, ...values]);
  flipped = [];
  matched = [];
  memoryResult.textContent = 'Kliko kartat për të gjetur çiftet.';
  memoryGrid.innerHTML = '';

  memoryCards.forEach((value, index) => {
    const button = document.createElement('button');
    button.className = 'memory-card';
    button.dataset.index = index;
    button.dataset.value = value;
    button.textContent = '';
    button.addEventListener('click', () => handleMemoryClick(button));
    memoryGrid.appendChild(button);
  });
}

function handleMemoryClick(button) {
  if (busy || matched.includes(button.dataset.index) || flipped.includes(button.dataset.index)) return;

  const index = Number(button.dataset.index);
  flipped.push(index);
  button.textContent = button.dataset.value;
  button.classList.add('revealed');

  if (flipped.length === 2) {
    const [firstIndex, secondIndex] = flipped;
    const firstCard = memoryGrid.querySelector(`[data-index="${firstIndex}"]`);
    const secondCard = memoryGrid.querySelector(`[data-index="${secondIndex}"]`);

    if (firstCard.dataset.value === secondCard.dataset.value) {
      matched.push(firstIndex, secondIndex);
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      memoryResult.textContent = 'Çift i gjetur!';
      flipped = [];
      if (matched.length === memoryCards.length) {
        memoryResult.textContent = 'Urime! Gjetët të gjitha çiftet.';
      }
      return;
    }

    busy = true;
    memoryResult.textContent = 'Jo, provo përsëri.';
    setTimeout(() => {
      firstCard.textContent = '';
      secondCard.textContent = '';
      firstCard.classList.remove('revealed');
      secondCard.classList.remove('revealed');
      flipped = [];
      busy = false;
    }, 900);
  }
}

if (memoryReset) {
  memoryReset.addEventListener('click', createMemoryCards);
}

createMemoryCards();

document.addEventListener('keydown', (event) => {
  const { key } = event;
  if (/^[0-9]$/.test(key) || ['/', '*', '+', '-', '.'].includes(key)) {
    event.preventDefault();
    addValue(key);
    updateDisplay(expression || '0');
    return;
  }

  if (key === 'Enter' || key === '=') {
    event.preventDefault();
    calculate();
    return;
  }

  if (key === 'Backspace') {
    event.preventDefault();
    deleteLast();
    return;
  }

  if (key === 'Escape' || key === 'Delete') {
    event.preventDefault();
    clearExpression();
    return;
  }
});
