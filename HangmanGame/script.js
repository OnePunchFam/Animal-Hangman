// Define a function to capitalize the first letter of a word
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Capitalize all words in the list
const words = ['antelope', 'baboon', 'badger', 'bear', 'beaver', 'bison', 'camel', 'catfish', 'chicken', 'chimpanzee', 'coyote', 'crab', 'crocodile', 'deer', 'dolphin', 'duck', 'eagle', 'elephant', 'ferret', 'flamingo', 'fox', 'frog', 'gazelle', 'giraffe', 'goat', 'gorilla', 'hamster', 'hedgehog', 'hippopotamus', 'hornet', 'horse', 'hyena', 'iguana', 'jaguar', 'jellyfish', 'kangaroo', 'koala', 'lemur', 'leopard', 'lion', 'lizard', 'lobster', 'lynx', 'meerkat', 'monkey', 'moose', 'narwhal', 'octopus', 'opossum', 'otter', 'ostrich', 'owl', 'panda', 'panther', 'pelican', 'penguin', 'porcupine', 'possum', 'quail', 'rabbit', 'raccoon', 'rattlesnake', 'reindeer', 'rhinoceros', 'salamander', 'seagull', 'seahorse', 'shark', 'sheep', 'skunk', 'snail', 'snake', 'spider', 'squid', 'squirrel', 'starfish', 'stingray', 'swan', 'tiger', 'toucan', 'turkey', 'turtle', 'unicorn', 'vulture', 'walrus', 'warthog', 'whale', 'wolf', 'wombat', 'woodpecker', 'yak', 'zebra'].map(word => capitalize(word));

// Select a random word from the list
let word = words[Math.floor(Math.random() * words.length)];

// Set up the display for the word to be guessed
const wordContainer = document.getElementById("word-container");
for (let i = 0; i < word.length; i++) {
  const letterContainer = document.createElement("div");
  letterContainer.classList.add("letter-container");
  const letter = document.createElement("p");
  letter.classList.add("letter");
  letter.textContent = "_";
  letterContainer.appendChild(letter);
  wordContainer.appendChild(letterContainer);
}

// Set up the display for the hint
const hintContainer = document.getElementById("hint");
hintContainer.textContent = `Hint: ${word.length} letters`;

// Set up the display for the guesses
const guessesContainer = document.getElementById("guesses");
let guesses = "";
guessesContainer.textContent = `Guesses: ${guesses}`;

// Set up the display for the wrong guesses
const wrongGuessesContainer = document.getElementById("wrong-guesses");
let wrongGuesses = "";
wrongGuessesContainer.textContent = `Wrong guesses: ${wrongGuesses}`;

// Set up the input and submit button
const input = document.getElementById("input");
const submit = document.getElementById("submit");

// Focus on the input field on page load
window.addEventListener('load', () => {
  input.focus();
});

// Handle the input and update the displays accordingly
submit.addEventListener("click", () => {
  const guess = capitalize(input.value.toLowerCase());
  input.value = "";

  // Check if the guess is correct
  let correctGuess = false;
  for (let i = 0; i < word.length; i++) {
    if (guess === capitalize(word[i])) {
      const letter = wordContainer.children[i].firstChild;
      letter.textContent = guess;
      correctGuess = true;
    }
  }

  // Update the displays based on the guess
  if (correctGuess) {
    guesses += guess;
    guessesContainer.textContent = `Guesses: ${guesses}`;
    if (wordContainer.textContent.indexOf("_") === -1) {
      document.body.style.backgroundColor = "green";
      wordContainer.classList.add("correct");
      const winContainer = document.getElementById("win-container");
      const winText = document.getElementById("win-text");
      winText.textContent = "YOU WIN";
      winText.style.fontSize = "4em";
      winContainer.style.display = "block";
      winText.classList.add("rotate"); // Add class to spin the text
      input.disabled = true;
      submit.disabled = true;
    }
  } else {
    wrongGuesses += guess;
    wrongGuessesContainer.textContent = `Wrong guesses: ${wrongGuesses}`;
    wordContainer.classList.add("incorrect");
    if (wrongGuesses.length >= word.length + 3) {
      alert("Game over! The correct word was " + word);
      input.disabled = true;
      submit.disabled = true;
    }
  }

  // Focus on the input field after each guess
  input.focus();
});