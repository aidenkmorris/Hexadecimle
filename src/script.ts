// Aiden K Morris
import { SeededRandom } from "./tool";

sessionStorage.removeItem("results");

const date = new Date().toLocaleDateString("en-US", {
  timeZone: "America/New_York",
  month: "long",
  day: "numeric",
  year: "numeric"
});

const dateNum = new Date().toLocaleDateString("en-US", {
  timeZone: "America/New_York",
}).replaceAll('/', '');

const dateSeed = parseInt(dateNum, 10);
const srand = new SeededRandom(dateSeed);

// Generate color
const color = Math.floor(srand.random() * 16777215)
  .toString(16).padStart(6, '0');

const hexToDecimal = (hex: string) => parseInt(hex, 16);

let numberOfGuesses = 1;
let bestDistance = 500;
let bestGuess = "------";
let previousGuess = "------";
let previousDistance = 500;

interface Results {
  date: string;
  numberOfGuesses: number;
  bestGuess: string;
  bestDistance: number;
  guessDistances: Array<number>
};

let guessDistances: Array<number> = [];
export let results: Results

document.querySelector<HTMLFormElement>("#formMakeGuess")?.reset();

export function makeGuess() {	
  const r = document.querySelector<HTMLInputElement>("#R")!.value;
  const g = document.querySelector<HTMLInputElement>("#G")!.value;
  const b = document.querySelector<HTMLInputElement>("#B")!.value;
  const guess = (r + g + b).toLowerCase();
  
  document.querySelector<HTMLElement>("#box")!.style.backgroundColor = "#" + guess;
  
  // Guessed color
  const redGuess = hexToDecimal(r);
  const greenGuess = hexToDecimal(g);
  const blueGuess = hexToDecimal(b);
  
  // Actual color
  const redValue = hexToDecimal(color.charAt(0) + color.charAt(1));
  const greenValue = hexToDecimal(color.charAt(2) + color.charAt(3));
  const blueValue = hexToDecimal(color.charAt(4) + color.charAt(5));
  
  const distance = Math.sqrt(
      (redValue - redGuess) * (redValue - redGuess)
    + (greenValue - greenGuess) * (greenValue - greenGuess)
    + (blueValue - blueGuess) * (blueValue - blueGuess)
  );

  guessDistances.push(distance);
  console.log(guessDistances);

  const labelGuess = document.querySelector<HTMLElement>("#infoGuess");
  if(labelGuess) labelGuess.innerHTML = "Your Guess: #" + guess;

  const labelDistance = document.querySelector<HTMLElement>("#infoDistance");
  if(labelDistance) labelDistance.innerHTML = "Distance: " + Math.round(distance * 1000) / 1000;
  
  if(distance < bestDistance) {
    document.querySelector<HTMLElement>("#infoBestGuess")!.innerHTML = "Best Guess: #" + guess;
    bestGuess = guess;

    document.querySelector<HTMLElement>("#infoBestDistance")!.innerHTML = "Best Distance: " + Math.round(distance * 1000) / 1000;
    bestDistance = distance;
  }
  
  document.querySelector<HTMLElement>("#infoPreviousGuess")!.innerHTML = "Previous Guess: #" + previousGuess;
  document.querySelector<HTMLElement>("#infoPreviousDistance")!.innerHTML = "Previous Distance: " + previousDistance;
  
  previousGuess = guess;
  previousDistance = Math.round(distance * 1000) / 1000;
  
  if(guess == color || numberOfGuesses >= 6) {
    alert("You got the Hexadecimle (#" + color + ") in " + numberOfGuesses + " guesses!");
    results = {
      date: date,
      numberOfGuesses: numberOfGuesses,
      bestGuess: bestGuess,
      bestDistance: bestDistance,
      guessDistances: guessDistances
    }
    
    // Set session variable for results
    sessionStorage.setItem("results", JSON.stringify(results));
    window.location.replace("/results/");
  }

  numberOfGuesses++;
  let infoNumber = document.querySelector<HTMLElement>("#infoNumber");
  if(infoNumber) infoNumber.innerHTML = "Submit Guess #" + numberOfGuesses;
}

function main() {
  document.body.style.backgroundColor = "#" + color;
}

window.onload = main;