
var animals = ["snow monkey", "baboon", "lemur", "orangutan", "gorilla", "chimpanzee", "marmoset", "tamarin", "howler monkey", "spider monkey", "macaque", "langur", "gibbon"];



	// LOAD A BUTTON ON THE SCREEN FOR EACH ANIMAL IN THE ANIMALS ARRAY

function loadButtons () {
	$(".animal").remove();
	for (var i = 0; i < animals.length; i++) {
		var button = $('<button>').addClass("btn btn-primary animal").attr({"data-name": animals[i], "type": "button"}).text(animals[i]);
		$('.buttons').append(button);
	}
}



	// WHEN AN ANIMAL BUTTON IS CLICKED AN AJAX QUERY RETURNS JSON RESULTS AND GIFS ARE DISPLAYED ON SCREEN

$('.buttons').on("click",'.animal',function() {
	// alert("clicked");
	$('.loadGifs').empty();
	var searchTerm = $(this).attr("data-name");
	// console.log(searchTerm);
	var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=9&q=" + searchTerm;
	// console.log(queryURL);
	$.ajax({
	url: queryURL,
	method: "GET"
	}).done(function(response) {
		// console.log(response);
		for (var j = 0; j < response.data.length; j++) {	
			var animatedSource = response.data[j].images.downsized.url;
			var stillSource = response.data[j].images.downsized_still.url;
			var rating = response.data[j].rating;
			// console.log(source);
			var ratingsAdd = $('<h5>Rating: ' + rating + '</h5>');
			$('.loadGifs').append(ratingsAdd);
			var gifsToAdd = $('<img>').attr({"src":stillSource, "data-still":stillSource, "data-animate":animatedSource, "data-state":"still"}).addClass("gifs");
			$('.loadGifs').append(gifsToAdd);
		}
	});
});



   // TOGGLE PLAY/PAUSE OF GIFS WHEN CLICKED ON

$(document).on("click", ".gifs", function() { // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      // alert("clicked");
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });


	
	// A NEW ANIMAL CAN BE SUBMITTED VIA THE FORM INPUT

$('.addAnimal').on("click", function(event) {
	event.preventDefault();
	var addAnimal = $('#animalText').val().trim();
	// console.log(addAnimal);
	animals.push(addAnimal);
	// console.log(animals);
	loadButtons();
});



// ------------------------------Main Process----------------

loadButtons();