// Aiden K Morris
import "./style.css"
import { makeGuess } from "./script"

const formMakeGuess = document.querySelector<HTMLButtonElement>("#formMakeGuess");
if(formMakeGuess) {
  formMakeGuess.addEventListener("submit", event => {
    event.preventDefault();
    makeGuess()
  });
}
