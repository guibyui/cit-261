const dateElement = document.getElementById("date");

const options = {weekday:'long', month:'short', day='numeric'};

const today = new date();

dateElement.innerHTML = today.toLocaleDateString("en-us", options);