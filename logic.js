// var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
// url += '?' + $.param({
//   'api-key': "780d3256d0a549b28b07aa274275b86d",
//   'q': "trump"
// });
// $.ajax({
//   url: url,
//   method: 'GET',
// }).done(function(result) {
//   console.log(result);
// }).fail(function(err) {
//   throw err;
// });
// VARIABLES
 
var authKey = "780d3256d0a549b28b07aa274275b86d";
var queryTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

// var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=780d3256d0a549b28b07aa274275b86d&q=trump";
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=780d3256d0a549b28b07aa274275b86d";

// Variable to track number of articlesearch
var articleCounter = 0;

// FUNCTIONS

function runQuery(numArticles, queryURL){
	$.ajax({url: queryURL, method: "GET"})
		.done(function(NYTData) {
			// clear the wells from the previous run
			$("#wellSection").empty();
			for(var i = 0; i < NYTData.response.docs.length; i++){
			console.log(NYTData.response.docs[i].headline.main);
			// console.log(NYTData);

			// start dynamically dumping to html
			var wellSection = $('<div>');
			wellSection.addClass("well");
			wellSection.attr('id', 'articleWell-' + i);
			$("#wellSection").append(wellSection);
			// attach content to appropriate well
			$("#articleWell-" + i).append(NYTData.response.docs[i].headline.main)
			$("#articleWell-" + i).append(NYTData.response.docs[i].pub_date);
			$("#articleWell-" + i).append(NYTData.response.docs[i].section_name);
			$("#articleWell-" + i).append(NYTData.response.docs[i].web_url);
			
			


		}
		})
}
 

// MAIN PROCESSES
// 1. retrieve user inputs, convert to VARIABLES
// 2. use variables to run ajax call to nytimes
// 3. break down the nyt object into usable fields
// 4. dynamically generate html
// 5. deal with bugs

$("#searchBtn").on("click",function(){
	 
	queryTerm = $("#search").val().trim();
	console.log(queryTerm);

	// add in the search term

	var newURL = queryURLBase + "&q=" + queryTerm;
	console.log(newURL);
	numResults = $("#numRecords").val();
	// console.log("number of records to get: " + numResults);

	// get start year and end year
	startYear = $("#startYear").val().trim();
	endYear = $("#endYear").val().trim();

	if(parseInt(startYear)){
		// add in month and day
		startYear = startYear + "0101";
		newURL = newURL + "&begin_date=" + startYear;
	}
	if(parseInt(endYear)){
		// add in month and day
		endYear = endYear + "0101";
		newURL = newURL + "&end_date=" + endYear;
	}
	// newURL = newURL + "&begin_date=" + startYear + "&end_date=" + endYear;
	console.log("the current URL is: " + newURL);
	runQuery(10, newURL);

	return false;
});

