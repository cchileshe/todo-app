controller = {
	init: function() {
		view.render()
	},
	
	addItem: function(item) {
		list_item = { text: item, completed: false }
		model.items.push(list_item)
		console.log(list_item)
		document.getElementById("add-item").value = ""
		view.render()
	},
	
	completeItem: function(item_index) {
		model.items[item_index].completed = !model.items[item_index].completed
		console.log(model.items[item_index].completed)
		view.render()
	},

	deleteItem: function(item_index) {
		model.items.splice(item_index, 1)
		view.render()
	}
}