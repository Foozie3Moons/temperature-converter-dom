// further functionality: temperatures should not go below 0 kelvin

console.log('Hello, front end');

document.addEventListener("DOMContentLoaded", function() {

  console.log("javascript running");
  console.log("DOM loaded");

  var submitted = false;
  var scorching = false;
  var freezing = false;

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  function convertToFahrenheight(temp) {
    return Math.round(temp * 9/5 + 32) + "°F";
  }

  function convertToCelcius(temp) {
    return Math.round((temp - 32) * 5/9) + "°C";
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
        if (radio.title === "fahrenheight") {
          setOutputBackground(temp, radio.title);
          temp = convertToCelcius(temp);
        } else if (radio.title === "celcius") {
          setOutputBackground(temp, radio.title);
          temp = convertToFahrenheight(temp);
        }
      }
      document.querySelector("div.output").textContent = temp;
      setOutputBackground();
      submitted = true;
    });
  }

  function tempCheck(radio) {
    button = document.querySelector("input[type='button']");
    button.value = "Convert to " + radio.value.capitalize();
  }

  function setOutputBackground(temp, temptype) {
    if (temptype === "celcius") {
      if (temp >= 100) {
        freezing = false;
        scorching = true;
      } else if (temp <= 0) {
        scorching = false;
        freezing = true;
      } else {
        scorching = false;
        freezing = false;
      }
    } else if (temptype === "fahrenheight") {
      if (temp >= 212) {
        freezing = false;
        scorching = true;
      } else if (temp <= 32){
        scorching = false;
        freezing = true;
      } else {
        scorching = false;
        freezing = false;
      }
    }
    output = document.querySelector("div.output");
    output.removeAttribute("id");
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

  function generateEventListeners() {
    radios = document.getElementsByName("temp-type");
    resetButton = document.querySelector("input[type='reset']");
    submitButton= document.querySelector("input[type='button']");

    radios.forEach(function(radio) {
      radio.addEventListener("click", function() {tempCheck(this);});
      console.log("Listening for " + radio.value + " changes.");
    })
    resetButton.addEventListener("click", function() {resetOutput();});
    console.log("Listening for " + resetButton.value + " changes.");
    submitButton.addEventListener("click", function() {submit();});
    console.log("Listening for " + submitButton.value + " changes.");
  }

  generateEventListeners();

});
