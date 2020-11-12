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


// Appends the compatibility percentage to the actors' names
function getCompatibility(fname, sname) {

  fetch("https://love-calculator.p.rapidapi.com/getPercentage?fname=" + fname + "&sname=" + sname, {
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
      //Loop through the list
      for (i = 0; i < $(".actorsFullName").length; i++) {
        var actorName = $(".actorsFullName")[i];
        //If the first name of the actor is equal to the first name of the dataset
        //assign the percentages next to the actors' name
        if (($(actorName).text().split(" ")[0]) === data.fname) {
          $(actorName).text($(actorName).text() + " - " + data.percentage + "%");
        };
      }
    })
    .catch(err => {
      console.error(err);
    })
}

//getCompatibility("Eric", "Alice");


//OMDB API Code (Bryan)  

var submitButton = document.getElementById("get-movie");

function getMovie() {
  var movieName = document.getElementById("movie-input").value;
  var movieYear = document.getElementById("year-input").value;
  var userName = document.getElementById("name-input").value;

  var baseURL = "http://www.omdbapi.com/?apikey=716bc5f5"
  var testURL = "http://www.omdbapi.com/?t=star+trek&apikey=716bc5f5"
  var userURL = 'http://www.omdbapi.com/?t=' + movieName + '&y=' + movieYear + '&apikey=716bc5f5'

  var requestURL = baseURL + "&t=" + movieName + "&y=" + movieYear

  //Albert added code to test
  switchToResults();

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      var actors = data.Actors.split(", ");
      $("#movie-title").text(`${data.Title}`)
      $("#movie-post").append(`<img src=${data.Poster}>`)
      $("#movie-desc").text(data.Plot)
      console.log(actors);

      for (i = 0; i < actors.length; i++) {
        $("#actors-list").append(`<li class="actorsFullName">${actors[i]}</li>`);

        //the fetch in the getCompatibility function runs AFTER the getMovie is completed
        getCompatibility(actors[i].split(" ")[0], userName);
      }

      // console.log(movieName)
      // console.log(movieYear)
      // console.log(userName)
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
          <div class="content">\
          <h1 id="movie-title"></h1>\
          <p id="movie-desc"></p>\
          </div>\
    </div>\
    <div class="column is-one-quarter">\
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
<<<<<<< HEAD

=======
  $("#love-btn").on("click", function () {
    console.log($("#movie-title").text())
  })
>>>>>>> c0868b508c07b9918a3bcac19857ca7c50cc30f4
}
