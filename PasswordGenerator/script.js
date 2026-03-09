const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

let firstPasswordShowEl = document.getElementById("first-password-generate-el");
let secondPasswordShowEl = document.getElementById(
  "second-password-generate-el"
);

function generateRandomIndex() {
  let indexNumber = Math.floor(Math.random() * characters.length);
  return indexNumber;
}

function generatePass() {
  let password = "";
  let setNumberLimitEl = parseInt(document.getElementById("number-el").value);

  for (let i = 0; i < setNumberLimitEl; i++) {
    password += characters[generateRandomIndex()];
  }
  return password;
}

function generatePasswords() {
  firstPasswordShowEl.textContent = generatePass();
  secondPasswordShowEl.textContent = generatePass();
}

function copyToClipBoardFirst() {
  navigator.clipboard.writeText(firstPasswordShowEl.textContent);
  alert(`copied: ${firstPasswordShowEl.textContent}`);
}

function copyToClipBoardSecond() {
  navigator.clipboard.writeText(secondPasswordShowEl.textContent);
  alert(`copied: ${secondPasswordShowEl.textContent}`);
}
