// Aiden K Morris
const resultsJSON = sessionStorage.getItem("results");

if(!resultsJSON) {
  window.location.replace("/");
}
else {
  const results = JSON.parse(resultsJSON);

  const labelBestGuess = document.querySelector<HTMLElement>("#resultsBestGuess");
  const labelBestDistance = document.querySelector<HTMLElement>("#resultsBestDistance");
  const labelDate = document.querySelector<HTMLElement>("#resultsInfoDate");
  const infoBox = document.querySelector<HTMLElement>("#resultsInfo")
  
  labelBestGuess!.textContent = results.bestGuess;
  labelBestDistance!.textContent = String(Math.round(results.bestDistance * 1000) / 1000);
  labelDate!.textContent = results.date;

  results.guessDistances.forEach((e: number) => {
    const pElement = document.createElement("p");
    pElement.textContent = "" + Math.round(e * 1000) / 1000;
    infoBox!.appendChild(pElement);
  });
}