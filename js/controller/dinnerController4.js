var DinnerController4 = function(view, model) {

$("#backButton").click(function() {
	model.removeFromPending();
	$("#dinnerView3").show();
	$("#dinnerView4").hide();

})

$("#confirmButton").click(function() {
	// model.removeFromPending();
	model.addDishToMenu(view.dish);
	$("#dinnerView3").show();
	$("#dinnerView4").hide()
	
})


}