angular.module('EStore').factory('ShoppingCartFactory', function(){   
	return {
		cart: [],
		AddToCart: function(product) {
			this.cart.push(product);
		},
		CalculateTotalCost: function() {
			var sum = 0;
			if (this.cart.length > 0) {
				for (var i = 0; i < this.cart.length; i++) {
					sum += this.cart[i].price;
				}
			}

			return sum;
		}
	};
});