console.log('Hello, front end');

document.addEventListener("DOMContentLoaded", function() {
  console.log("javascript running");
  console.log("DOM loaded");

  var submitted = false;
  var scorching = false;
  var freezing = false;

  function convertToFahrenheight(temp) {
    return Math.round(temp * 9/5 + 32);
  }

  function convertToCelcius(temp) {
    return Math.round((temp - 32) * 5/9);
  }

  function submit() {
    if (submitted) {
      resetOutput();
    }
    var temp = document.getElementsByName('temp')[0].value;
    var radios = document.getElementsByName('temp-type');
    var tempType;
    radios.forEach(function(radio) {
      if (radio.checked) {
        if (radio.value === "fahrenheight") {
          if (temp >= 100) {
            scorching = true;
          } else if (temp <= 0) {
            freezing = true;
          } else {
            scorching = false;
            freezing = false;
          }
          temp = convertToFahrenheight(temp) + "°F";
        } else if (radio.value === "celcius") {
          if (temp >= 212) {
            scorching = true;
          } else if (temp <= 32){
            freezing = true;
          } else {
            scorching = false;
            freezing = false;
          }
          temp = convertToCelcius(temp)+ "°C";
        }
      }
      document.querySelector("div.output").textContent = temp;
      setOutputBackground();
      submitted = true;
    });
  }

  function setOutputBackground() {
    output = document.querySelector("div.output");
    if (freezing) {
      output.setAttribute("id","freezing");
    } else if (scorching) {
      output.setAttribute("id","scorching");
    } else if (!freezing && !scorching) {
      output.removeAttribute("id");
    }
  }

  function resetOutput() {
    document.querySelector("div.output").textContent = "";
    document.querySelector("div.output").removeAttribute("id");
    setOutputBackground();
  }
  resetButton = document.querySelector("input[type='reset']");
  resetButton.addEventListener("click", function() {resetOutput();});
  submitButton= document.querySelector("input[type='button']");
  submitButton.addEventListener("click", function() {submit();});
});
