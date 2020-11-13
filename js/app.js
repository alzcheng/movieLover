console.log("Sanity Check, JS is connected!")

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

localStorage.setItem("actors", "");
localStorage.setItem("myName", "");
// added for initializing max compatibility
if (localStorage.getItem("maxComp") === null) {
  localStorage.setItem("maxComp", JSON.stringify({ myName: "", actor: "", percentage: "" }));
}

//On clicking on submit button
//Get data from Name input
//Get data from Movie and Year input to generate data set from Omidb
//Take out the data for Actors and call on love calculator on each Actor and compare to name
//Output actor name and percentage

//Given an actor's full name and percentage, if the percentage is greater than or 
//equal to the max compatibility percentage, set the actor to maxCompatibilty 
function checkMaxComp(actorName, percentage) {
  var maxCompability = JSON.parse(localStorage.getItem("maxComp"));
  console.log(parseFloat(maxCompability.percentage));
  console.log(parseFloat(percentage));
  console.log(actorName);

  if (parseFloat(maxCompability.percentage) <= parseFloat(percentage) || maxCompability.percentage == "") {
    maxCompability.actor = actorName;
    maxCompability.percentage = percentage
    localStorage.setItem("maxComp", JSON.stringify(maxCompability));
  }
}

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
      console.log($(".actorsFullName").length);
      for (i = 0; i < $(".actorsFullName").length; i++) {
        var actorName = $(".actorsFullName")[i];
        //If the first name of the actor is equal to the first name of the dataset
        //assign the percentages next to the actors' name
        if (($(actorName).text().split(" ")[0]) === data.fname) {
          //check max compatbility first before modifying the list
          checkMaxComp($(actorName).text(), data.percentage);
          $(actorName).text($(actorName).text() + " - " + data.percentage + "%");
          var progressBar = document.createElement("div");
          progressBar.setAttribute("class", "progress-bar");
          progressBar.innerHTML = '<progress class="progress is-danger" value="' + data.percentage + '" max="100">' + data.percentage + '%</progress>';
          $(actorName).after(progressBar);
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
  //store max compatibilty 
  var maxComp = JSON.parse(localStorage.getItem("maxComp"))

  //need to check maxComp local storage to initialize and reset
  //if a different person's name is entered
  if (maxComp.myName == "") {
    maxComp.myName = userName;
    localStorage.setItem("maxComp", JSON.stringify(maxComp));
  } else if (userName != maxComp.myName) {
    maxComp.myName = userName;
    maxComp.actor = "";
    maxComp.percentage = "";
    localStorage.setItem("maxComp", JSON.stringify(maxComp));
  }

  localStorage.setItem("myName", userName);

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
      localStorage.setItem("actors", actors);
      $("#movie-title").text(`${data.Title}`)
      $("#movie-post").append(`<img src=${data.Poster}>`)
      $("#movie-desc").text(data.Plot)
      console.log(actors);

      for (i = 0; i < actors.length; i++) {
        $("#actors-list").append(`<li class="actorsFullName">${actors[i]}</li>`);
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
        <h3 id="movie-title">Actors</h3>\
              <ul id="actors-list"></ul>\
        </div>\
        <div class="btns">\
        <div class="field is-grouped">\
            <div class="control">\
              <button class="button is-danger" id="love-btn">Get Compatibility</button>\
              <button class="button is-info" id="reset-btn">Reset</button>\
            </div>\
          </div>\
          </div>\
    </div>\
</div>\
  </div>'
  $(".index-container").remove();
  $(document.body).append(resultContainerText);

  $("#love-btn").on("click", function () {
    var actorArray = localStorage.getItem("actors").split(",");
    var myName = localStorage.getItem("myName");

    // loop through the actorArray to go through and get each of the percentages
    // then assign those percentages to the different names
    for (i = 0; i < actorArray.length; i++) {
      getCompatibility(actorArray[i].split(" ")[0], myName);
    }
  })

  $("#reset-btn").on("click", function () {
    window.location.reload();
  })
}
