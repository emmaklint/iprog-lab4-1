var DinnerView2 = function (container,model) {

	var costInfo = function(dish) {
		if (dish !== undefined) {
			var cost = model.getDishPrice(dish);
			var dishName = ('<td width="30%">' + dish.Title + '</td>')
			var dishCost = ('<td width="30%">' + cost + ' kr</td>')

			$("#dishTable").append('<tr id="dish-nr-' + dish.RecipeID + '">' + dishName + dishCost + '</tr>')
		}
	}

	var printMenu = function() {
		var menu = model.getFullMenu();

		if (menu !== undefined) {
			for (var i = 0; i < menu.length; i++) {
					costInfo(menu[i]);
				}
			return menu;
		}

	}

	this.update = function(obj) {
		this.guestInput = $("#numberOfGuestsInput");
		this.guestInput.val(model.getNumberOfGuests());
		

		$("#dishTable").html('<tr><th>Dishname</th><th>Cost</th></tr>');

		if (obj === undefined) {
			return;
		} 
	
		if (obj !== undefined && obj.description === 'dish') {
			var menu = printMenu()

			this.pending = obj.data;
			var pendingString = '';
			var minusPrice = 0;
			
			for (var i = 0; i < menu.length; i++) {
				if(this.pending.Category == menu[i].Category) {
					$("#dish-nr-" + menu[i].RecipeID).hide()
					var minusPrice = model.getDishPrice(menu[i]);
				}
			}

			var pendingPrice = model.getDishPrice(this.pending);
			pendingString += '<tr><td width="30%">Pending</td><td width="30%">' + pendingPrice + ' kr</td>'
			$("#dishTable").append(pendingString);

			totMenuPrice = model.getTotalMenuPrice();
			totMenuPrice = totMenuPrice + pendingPrice - minusPrice;
			$("#totalPrice").html('<p>Total: ' + totMenuPrice + ' kr</p>');

		} else if (obj !== undefined && obj.description === 'newMenuDish' || 'dishes' || 'removeFromPending') {
			printMenu();
			var totMenuPrice = model.getTotalMenuPrice();
			$("#totalPrice").html('<p>Total: ' + totMenuPrice + ' kr</p>');

		} 
		// else if (obj !== undefined && obj.description === 'removeFromPending') {
		// 	printMenu();
		// }

			
	}

	this.update();
	model.addObserver(this);
}
