
var animals = ["snow monkey", "baboon", "lemur", "orangutan", "gorilla", "chimpanzee", "marmoset", "tamarin", "howler monkey","langur", "spider monkey", "macaque", "gibbon"];



	// LOAD A BUTTON ON THE SCREEN FOR EACH ANIMAL IN THE ANIMALS ARRAY

function loadButtons () {
	$(".animal").remove();
	for (var i = 0; i < animals.length; i++) {
		var button = $('<button>').addClass("btn btn-primary animal").attr({"data-name": animals[i], "type": "button"}).html('<p class=animalText>' + animals[i] + '</p>');
		$('.buttons').append(button);
	}
}



	// WHEN AN ANIMAL BUTTON IS CLICKED AN AJAX QUERY RETURNS JSON RESULTS AND GIFS ARE DISPLAYED ON SCREEN

$(document).on("click",'.animal',function() {
	$('.loadGifs').empty();
	var searchTerm = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=9&q=" + searchTerm;
	$.ajax({
	url: queryURL,
	method: "GET"
	}).done(function(response) {
		for (var j = 0; j < response.data.length; j++) {	
			var animatedSource = response.data[j].images.downsized.url;
			var stillSource = response.data[j].images.downsized_still.url;
			var rating = response.data[j].rating;
			var gifDiv = $('<div class="col-md-4 gifDiv">');
			$('.loadGifs').append(gifDiv);
			var ratingsAdd = $('<h5 class=row >Rating: ' + rating + '</h5>');
			$(gifDiv).append(ratingsAdd);
			var gifsToAdd = $('<img class=row >').attr({"src":stillSource, "data-still":stillSource, "data-animate":animatedSource, "data-state":"still"}).addClass("gifs");
			$(gifDiv).append(gifsToAdd);
		}
	});
});



   // TOGGLE PLAY/PAUSE OF GIFS WHEN CLICKED ON

$(document).on("click", ".gifs", function() { // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
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
	event.preventDefault();							//prevents screen refresh, a default action of submit button
	var addAnimal = $('#animalText').val().trim();
	animals.push(addAnimal);
	$('#animalText').val("");    //clears the text box when submit button is clicked
	loadButtons(); 
});



// ------------------------------Main Process----------------

loadButtons();