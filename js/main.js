//initialize function called when the script loads
function initialize(){
	cities();
	debugAjax();
};

//function to create a table with cities and their populations
function cities(){
	//define two arrays for cities and population
	var cityPop = [
		{
			city: 'Madison',
			population: 233209
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244
		}
	];

	//append the table element to the div
	$("#mydiv").append("<table>");

	//append a header row to the table
	$("table").append("<tr>");

	//add the "City" and "Population" columns to the header row
	$("tr").append("<th>City</th><th>Population</th>");

	//loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };
//Call to execute functions: addColumns(cityPop), addEvents()
    addColumns(cityPop);
    addEvents();
};

function addColumns(cityPop){

    $('tr').each(function(i){

    	if (i == 0){
//FIX: append was misspelled
    		$(this).append('<th>City Size</th>');
    	} else {

    		var citySize;

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
//FIX: citysize to citySize
    			citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};
//FIX: needed parentheses around the word "this"
//FIX: needed closing '>' around td
    		$(this).append('<td>' + citySize + '</td>');
		};
    });
};

function addEvents(){
//FIX: changed #table to table
	$('table').mouseover(function(){

		var color = "rgb(";

		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);
//FIX: remove quotes around random
			color += random;

			if (i<2){
				color += ",";

			} else {
				color += ")";
		};

		$(this).css('color', color);
//FIX: added bracket before });
		};
    });


	function clickme(){
//Lets user know that they clicked on a clickable item
		alert('Hey, you clicked me!');
	};

	$('table').on('click', clickme);
};

//call the initialize function when the document has loaded
$(document).ready(initialize);

//function jQueryAjax() is implemented
function jQueryAjax(){
    //varaiable, mydata is declared
    var mydata;

    //basic jQuery ajax method
    $.ajax("data/MegaCities.geojson", {
        dataType: "json",
        success: function(response){
			//mydata is set to the parameter, response, to match the parameter in the function within "success"
            mydata = response;

            //my data is called inside the function, jQueryAjax()
            console.log(mydata);
			
        }
    });

    //my data is called outside the function, jQueryAjax()
    console.log(mydata);
};

//function dubugCallback(response) is implemeted
function debugCallback(response){
	//JSON.stringify(mydata) is changed to JSON.stringify(response) because the parameter response needs to be called and match parameter in debugCallback(response)
	//called in debugAjax() so it can be displayed
	$(mydiv).append('GeoJSON data: ' + JSON.stringify(response));
};

//function dubugAjax() is implemented
function debugAjax(){
	//variable mydata is declared
	var mydata;
	//ajax is retrieving MegaCities.geojson file from the data folder to be displayed
	$.ajax("data/MegaCities.geojson", {
		dataType: "json",
		success: function(response){
			//debugCallback(response) is called within the function debugAjax() because ajax can only be shown from a callback method and therefore needs to be called within the function
			//repsonse parameter needs to be passed in order to match the parameter repsonse set by the function for "success" in the function deubgAjax() 
			debugCallback(response);
		}
	});
	//Commented out because mydata is undefined outside any of the functions and only defined within the functions, debugAjax and jQueryAjax
	//$(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(mydata));
};
//Commented out because mydata is undefined outside any of the functions and only defined within the functions, debugAjax and jQueryAjax
//$(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata));

