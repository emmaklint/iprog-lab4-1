var DinnerController3 = function(view, model) {

	$("#searchButton").click(function() {
		model.getAllDishes($("#typeSelect").val(), $("#searchInput").val());
		$("#searchInput").val('');

	})

	$("#typeSelect").change(function() {
		model.getAllDishes($("#typeSelect").val(), $("#searchInput").val());
	})

	$(".right-content-3").click(function(event) {
		var idString = event.target.id;
		var id = idString.slice(0, -1);
		model.getDish(id);
		$("#dinnerView3").hide();
		$("#dinnerView4").show()
		
		
	

	})

};
