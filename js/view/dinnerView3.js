var DinnerView3 = function (container,model) {

	var dishInfo = function(dish, model) {
	var dishImg = ('<img src="' + dish.ImageURL + '" id="' + dish.RecipeID + 'i"/>');
	var dishName = ('<h4 id="' + dish.RecipeID + 'n">' + dish.Title + '</h4>');

	$(".right-content-3").append('<div class="clickDish col-md-4" id="' + dish.RecipeID + 'd">' + dishImg + dishName + '</div>')

	}

	this.loading = function() {
		$(".right-content-3").empty();
		$(".right-content-3").append('<div class="loading"><p>Loading recipes...</p></div>');
	}

	this.update = function(obj) {
		
		if (obj === undefined) {
			
		} else if (obj !== undefined && obj.description === 'errorMessage') {
			$("#right-column").empty();
			$("#right-column").html("<h2>Please check your internet connection</h2>");
		
		} else if (obj !== undefined && obj.description === 'dishes') {
			$(".right-content-3").empty();
			var displayDishes = obj.data.Results;
			
			for (var i=0; i < displayDishes.length; i++) {
				dishInfo(displayDishes[i]) 
			}
 
		} else {
			return;
		}
	}

	model.addObserver(this);
	this.loading();
	this.update();
	

	

}



