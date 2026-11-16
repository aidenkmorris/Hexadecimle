// Aiden K Morris
import { SeededRandom } from "./tool";

const date = new Date().toLocaleDateString("en-US", {
  timeZone: "America/New_York",
}).replaceAll('/', '');

const dateSeed = parseInt(date, 10);
export let srand = new SeededRandom(dateSeed);

// Generate color
const color = Math.floor(srand.random() * 16777215)
  .toString(16).padStart(6, '0');

const hexToDecimal = (hex: string) => parseInt(hex, 16);

let numberOfGuesses = 1;
let bestDistance = 500;
let previousGuess = "------";
let previousDistance = 500;

document.querySelector<HTMLFormElement>("#formMakeGuess")?.reset();

export function makeGuess() {	
  const r = document.querySelector<HTMLInputElement>("#R")!.value;
  const g = document.querySelector<HTMLInputElement>("#G")!.value;
  const b = document.querySelector<HTMLInputElement>("#B")!.value;
  const guess = (r + g + b).toLowerCase();
  
  if(guess == color) {
    alert("You got the Hexadecimle (#" + color + ") in " + numberOfGuesses + " guesses!");
  }
  
  document.querySelector<HTMLElement>("#box")!.style.backgroundColor = "#" + guess;
  
  const redGuess = hexToDecimal(r);
  const greenGuess = hexToDecimal(g);
  const blueGuess = hexToDecimal(b);
  
  const redValue = hexToDecimal(color.charAt(0) + color.charAt(1));
  const greenValue = hexToDecimal(color.charAt(2) + color.charAt(3));
  const blueValue = hexToDecimal(color.charAt(4) + color.charAt(5));
  
  const distance = Math.sqrt(
      (redValue - redGuess) * (redValue - redGuess)
    + (greenValue - greenGuess) * (greenValue - greenGuess)
    + (blueValue - blueGuess) * (blueValue - blueGuess)
  );

  const labelGuess = document.querySelector<HTMLElement>("#infoGuess");
  if(labelGuess) labelGuess.innerHTML = "Your Guess: #" + guess;

  const labelDistance = document.querySelector<HTMLElement>("#infoDistance");
  if(labelDistance) labelDistance.innerHTML = "Distance: " + Math.round(distance * 1000) / 1000;
  
  if(distance < bestDistance) {
    document.querySelector<HTMLElement>("#infoBestGuess")!.innerHTML = "Best Guess: #" + guess;
    document.querySelector<HTMLElement>("#infoBestDistance")!.innerHTML = "Best Distance: " + Math.round(distance * 1000) / 1000;
    bestDistance = distance;
  }
  
  document.querySelector<HTMLElement>("#infoPreviousGuess")!.innerHTML = "Previous Guess: #" + previousGuess;
  document.querySelector<HTMLElement>("#infoPreviousDistance")!.innerHTML = "Previous Distance: " + previousDistance;
  
  previousGuess = guess;
  previousDistance = Math.round(distance * 1000) / 1000;
  
  numberOfGuesses++;
  let infoNumber = document.querySelector<HTMLElement>("#infoNumber");
  if(infoNumber) infoNumber.innerHTML = "Submit Guess #" + numberOfGuesses;
}

function main() {
  document.body.style.backgroundColor = "#" + color;
}

window.onload = main;