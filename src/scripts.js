const text = document.querySelector("#text");
const input = document.querySelector("#input");
const restart = document.querySelector("#restart");
const historic = document.querySelector("#historic");
const result = document.querySelector("#result");
const changeThemeBtn = document.querySelector("#changeTheme");

const phrases = [
  "O rápido rapaz saltou sobre o muro.",
  "Um tigre faminto correu pela floresta.",
  "O sol brilhava intensamente no céu azul.",
  "A chuva caiu suavemente sobre as folhas verdes.",
  "O vento soprava forte na beira do mar.",
  "As flores desabrocharam com a chegada da primavera.",
  "O cachorro pulou de alegria ao ver seu dono.",
  "A criança sorriu ao ganhar um presente.",
  "O carro vermelho acelerou pela estrada vazia.",
  "O pássaro cantou uma bela melodia no galho da árvore.",
];

function newPrases() {
  const index = Math.floor(Math.random() * phrases.length);
  text.textContent = phrases[index];
}

function refreshTest() {
  start();

  if (input.value === text.textContent) {
    validation();
  }
}

function start() {
  const statusTest = JSON.parse(localStorage.getItem("isTesting"));

  if (!statusTest) {
    localStorage.setItem("startTime", new Date().getTime());
    localStorage.setItem("isTesting", true);
  }
}

function validation() {
  const finishedTime = new Date().getTime();
  const startedTime = parseInt(localStorage.getItem("startTime"));
  /* spent time in seconds*/
  const spentTime = (finishedTime - startedTime) / 1000;

  result.textContent = `Parabéns, Você levou ${spentTime} segundos!`;

  addToHistory(text.textContent, spentTime);

  localStorage.setItem("isTesting", false);
  newPrases();
  input.value = "";
}

function addToHistory(text, spentTime) {
  const historicItem = document.createElement("p");
  historicItem.textContent = `Texto "${text}" - Tempo "${spentTime} segundos"`;
  historic.appendChild(historicItem);
}

function restartTest() {
  input.value = "";
  result.textContent = "";
  newPrases();
  localStorage.setItem("isTesting", false);
  historic.innerHTML = "";
}

function changeTheme() {
  const body = document.body;

  body.classList.toggle("white");
  body.classList.toggle("dark");
}

input?.addEventListener("keyup", refreshTest);
restart?.addEventListener("click", restartTest);
changeThemeBtn?.addEventListener("click", changeTheme);

newPrases();
