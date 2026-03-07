const color = Math.floor(Math.random()*16777215)
    .toString(16).padStart(6, '0');

const hexToDecimal = hex => parseInt(hex, 16);

let numberOfGuesses = 1;
let bestDistance = "500.000";
let previousGuess = "------";
let previousDistance = "---.---";

function makeGuess() {	
  let r = document.getElementById("R").value;
  let g = document.getElementById("G").value;
  let b = document.getElementById("B").value;
  let guess = r + g + b;
  
  if(guess == color) {
    alert("You got the Hexadecimle (#" + color + ") in " + numberOfGuesses + " guesses!");
  }
  
  document.getElementById("box").style.backgroundColor = "#" + guess;
  
  let redGuess = hexToDecimal(r);
  let greenGuess = hexToDecimal(g);
  let blueGuess = hexToDecimal(b);
  
  let redValue = hexToDecimal(color.charAt(0) + color.charAt(1));
  let greenValue = hexToDecimal(color.charAt(2) + color.charAt(3));
  let blueValue = hexToDecimal(color.charAt(4) + color.charAt(5));
  
  let distance = "" + Math.sqrt(
      (parseInt(redValue) - parseInt(redGuess)) * (parseInt(redValue) - parseInt(redGuess)) 
    + (parseInt(greenValue) - parseInt(greenGuess)) * (parseInt(greenValue) - parseInt(greenGuess)) 
    + (parseInt(blueValue) - parseInt(blueGuess)) * (parseInt(blueValue) - parseInt(blueGuess))
  );

  let x = document.getElementById("infoGuess");
  x.innerHTML = "Your Guess: #" + guess;

  let y = document.getElementById("infoDistance");
  y.innerHTML = "Distance: " + Math.round(distance * 1000) / 1000;
  
  if(parseInt(distance) < parseFloat(bestDistance)) {
    document.getElementById("infoBestGuess").innerHTML = "Best Guess: #" + guess;
    document.getElementById("infoBestDistance").innerHTML = "Best Distance: " + Math.round(distance * 1000) / 1000;
    bestDistance = distance;
  }
  
  document.getElementById("infoPreviousGuess").innerHTML = "Previous Guess: #" + previousGuess;
  document.getElementById("infoPreviousDistance").innerHTML = "Previous Distance: " + previousDistance;
  
  previousGuess = guess;
  previousDistance = Math.round(distance * 1000) / 1000;
  
  numberOfGuesses += 1;
  let z = document.getElementById("infoNumber");
  z.innerHTML = "Submit Guess #" + numberOfGuesses;
}

function main() {
  document.body.style.backgroundColor = "#" + color;
}

window.onload = main;