console.log("client-side JS file is loaded");

// load data, parse to JSON, dump to console

// get data from tags
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const message3 = document.querySelector('#message-3');

weatherForm.addEventListener("submit", (e) => {
  // prevent refresh
  e.preventDefault();
  // get value from search field
  const location = search.value;
  // add feedback to user
  message2.textContent = "Loading....";
  message1.textContent = '';
    // use that value as part of query string
  fetch(`/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
            message1.textContent = '';
            message2.textContent = `Error: ${data.error}`;
        } else {
          // output data to screen
          message1.setAttribute('style','white-space: pre;');
          message1.textContent = data.location+ "\r\n"+ data.forecast;
          message2.textContent = "";
        }
      });
    }
  );
});
