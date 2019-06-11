const form = document.querySelector("form");
const address = document.querySelector("input");
const weather1 = document.querySelector("#weather1");
const weather2 = document.querySelector("#weather2");

form.addEventListener("submit", e => {
  weather1.textContent = "Loading....";
  weather2.textContent = "";
  e.preventDefault();
  fetch(`http://localhost:3000/weather?address=${address.value}`).then(
    response => {
      response.json().then(data => {
        if (data.error) {
          weather1.textContent = data.error;
        } else {
          weather1.textContent = data.forecast;
          weather2.textContent = data.location;
        }
      });
    }
  );
});
