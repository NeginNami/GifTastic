
var foodArray=["Pizza","Pasta","Sushi","Ramen","Cereal","Fried Rice"];
for (var i = 0; i < foodArray.length; i++) {
	button_generator(foodArray[i]);
}

$("#submit_button").on("click",function (event) {
	event.preventDefault();
	button_generator($("#foodInput").val());
	$("#foodInput").val("");
	
});

$(document).on("click",".food_button",display);

$(document).on("click",".picture",toggle_state);

//**********************************Functions Definition*******************************************************
function button_generator(buttonName) {
	var btn =$("<button>").addClass("food_button btn btn-info").text(buttonName).attr("data-name",buttonName);
	$("#buttons_view").append(btn);
	
}
//******************************************Display function***************************************************
function display() {
	//$(".image_view").empty();
	for (var i = 1; i <5 ; i++) {
		$("#row"+i).empty();
	}
	var foodName= $(this).attr("data-name");
	var queryURL= "https://api.giphy.com/v1/gifs/search?q="+ foodName +"&api_key=dc6zaTOxFJmzC&limit=12";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function (response) {
		  
		console.log(response.data[0].images.fixed_height.height);
		console.log(response);

		for (var i = 0; i < response.data.length; i++) {
			//console.log(response.data[i].url);
			var imgDiv=$("<div>").addClass("imgSection").addClass("col-lg-3 col-md-3");
			var imgRate=$("<p>").addClass("rating").text("Rate: "+response.data[i].rating);
			var food_img= $("<img>").attr("src",response.data[i].images.fixed_height_still.url).addClass("picture").addClass("img-responsive")
			.attr("data-animate",response.data[i].images.fixed_height.url).attr("data-still",response.data[i].images.fixed_height_still.url) ;
			//food_img.prepend($("<p>Rate: ").text(response.data[i].rating))
			imgDiv.append(imgRate).append(food_img);
			console.log(imgDiv);

			if (i<=2) {
				$("#row1").append(imgDiv);
			}
			if (i<=5 && i>2) {
				$("#row2").append(imgDiv);
			}
			if (i<=8 && i>5) {
				$("#row3").append(imgDiv);
			}
			if (i<=11 && i>8) {
				$("#row4").append(imgDiv);
			} 

		} 

	});
}
//*****************************************Toggle State Function*****************************************************************
function toggle_state() {
	
	if (this.getAttribute("src")===this.getAttribute("data-still")) 
		this.setAttribute("src",this.getAttribute("data-animate"));
	else if(this.getAttribute("src")===this.getAttribute("data-animate"))
		this.setAttribute("src",this.getAttribute("data-still"));
	console.log(this.getAttribute("data-still"));
}
