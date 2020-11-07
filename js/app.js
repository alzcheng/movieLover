console.log("Sanity Check, JS is connected!")

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

//On clicking on submit button
//Get data from Name input
//Get data from Movie and Year input to generate data set from Omidb
//Take out the data for Actors and call on love calculator on each Actor and compare to name
//Output actor name and percentage



fetch("https://love-calculator.p.rapidapi.com/getPercentage?fname=John&sname=Alice", {
  "method": "GET",
  "headers": {
    "x-rapidapi-key": "72c1a1d3c8msh9e36717d571537fp101167jsn0ba82bbeba67",
    "x-rapidapi-host": "love-calculator.p.rapidapi.com"
  }
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
  })
  .catch(err => {
    console.error(err);
  })

fetch("http://www.omdbapi.com/?t=star+trek&apikey=716bc5f5")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
  })
  .catch(err => {
    console.error(err);
  })

