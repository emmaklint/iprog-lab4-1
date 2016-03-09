//ExampleView Object constructor
var DinnerView4 = function (container, model, id) {

	this.loading = function() {
		$("#theDish").empty();
		$("#theDish").append('<div class="loading"><p>Loading recipe...</p></div>');
	}

	this.ingredientInfo = function(ingredient, model) {
		var ingredientString = '';
		
		// Get the ingredients cost and amount from methods in model
		temp = ingredient.Quantity;
		if (temp = parseFloat(temp)) {
			var cost = ingredient.Quantity * this.guests;
		} else {
			var cost = 0
		}
		
		var amount = ingredient.DisplayQuantity * this.guests;

		if (ingredient.IsHeading == true) {
			ingredientString += '<tr><td><h4>' + ingredient.Name + '</h4></td></tr>'
			return ingredientString;
		} else {

			//Creates a table which contains the ingredients name, amount, unit and cost.
			var ingrAmount = ''
		    if (ingredient.DisplayQuantity !== null) {
		    	ingrAmount += ('<td width="30%">' + amount   + ' ' + ingredient.Unit + '</td>')
		    } else {
		    	ingrAmount += ('<td width="30%"></td>')
		    }
		    var ingrName = ('<td width="60%">' + ingredient.Name + '</td>');
		    var ingrCost = ''
		    if (ingrCost !== null) {
		    	ingrCost += ('<td width="10%">' + parseInt(cost) + ' kr' + '</td>');
		    };

		    ingredientString += '<tr>' + ingrAmount + ingrName + ingrCost + '</tr>';
		    return ingredientString;

		}
	}

	this.dishInfo = function(dish, model) {
		allIngredients = '';

		// Creates a div which contains the objects name and description
		var dishImg = ('<div id="image" class="col-md-8"><img src="' + dish.ImageURL + '"/></div>');
		var dishText = ('<h2>' + dish.Title + '</h2><p>' + dish.Instructions + '</p>');
		$("#theDish").html(dishImg + '<div class="dishText col-md-8" id="' + dish.RecipeID + '"">' + dishText + '</div>')

		// Looks through every ingredient in an object
		// and sends it to the ingredientList-method
		for (var i in dish.Ingredients) {
			allIngredients += this.ingredientInfo(dish.Ingredients[i]);
		 }
	}

	this.update = function(obj) {
		
		this.guests = model.getNumberOfGuests();
		this.loading();

		if (obj == undefined){
		
		} else if (obj !== undefined && obj.description === 'dish') {
			this.dish = obj.data;
			this.dishInfo(this.dish);
			// Sends number of guests and dishprice to HTML
			$("#totalNumberOfGuests").html('<h2>Ingredients for ' + this.guests + ' people</h2>');
			$("#totalDishPrice").html('<h2>Total: ' + model.getDishPrice(this.dish) + ' kr</h2>');
			$("#ingredients").html(allIngredients)	
		} else if (obj !== undefined && obj.description === 'errorMessage'){
			$("#right-column").empty();
			$("#right-column").html("<h2>Please check your internet connection</h2>");
		} else if (obj !== undefined && obj.description === 'newNumberOfGuests' && this.dish !== null){
			this.dishInfo(this.dish)

			$("#totalNumberOfGuests").html('<h2>Ingredients for ' + this.guests + ' people</h2>');
			$("#totalDishPrice").html('<h2>Total: ' + model.getDishPrice(this.dish) + ' kr</h2>');
			$("#ingredients").html(allIngredients)
		}


		else {
			return;
		}

	}

	model.addObserver(this);
	this.loading();
	this.update();
	

}
