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


//OMDB API Code (Bryan)  

var submitButton = document.getElementById("get-movie");

function getMovie() {
  var movieName = document.getElementById("movie-input").value;
  var movieYear = document.getElementById("year-input").value;
  var userName = document.getElementById("name-input").value;

  var baseURL = "http://www.omdbapi.com/?apikey=716bc5f5"
  var testURL = "http://www.omdbapi.com/?t=star+trek&apikey=716bc5f5"

  //Albert added code to test
  switchToResults();

  fetch(testURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      var actors = data.Actors;
      var poster = data.Poster;
      var title = data.Title;
      var plot = data.Plot;

      $("#movie-post").append(`<img src=${poster}>`)
      $("#movie-desc").text(plot)
      $("#actors-list").append(`<li>${actors}</li>`)


      console.log (actors)
      console.log(poster)
      console.log(title)


      console.log(movieName)
      console.log(movieYear)
      console.log(userName)

      console.log(data)
    })
    .catch(err => {
      console.error(err);
    })

}

submitButton.addEventListener("click", getMovie)

// END OMDB API Code (Bryan)

// BEGIN Albert switchToResults Code
function switchToResults() {
  var resultContainerText = '<div class="results-container">\
  <div class="columns">\
    <div class="column is-one-quarter">\
          <div class="content" id="movie-post">\
          </div>\
    </div>\
    <div class="column is-one-half">\
          <div class="content" id="movie-desc">\
          </div>\
    </div>\
    <div class="column">\
        <div class="content" >\
              <ul id="actors-list"></ul>\
        </div>\
    </div>\
</div>\
  <div class="columns">\
    <div class="column">\
          <div class="field is-grouped">\
            <div class="control">\
              <button class="button is-danger" id="love-btn">Get Compatibility</button>\
              <button class="button is-info" id="reset-btn">Reset</button>\
            </div>\
          </div>\
    </div>\
  </div>\
</div>'
  $(".index-container").remove();
  $(document.body).append(resultContainerText);
}